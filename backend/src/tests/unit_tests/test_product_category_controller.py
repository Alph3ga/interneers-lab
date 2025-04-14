"""
Unit tests for category-product related endpoint controllers in src.controllers.product_category_controller.
Tests GET, POST, DELETE routes and validation logic by mocking service layer and simulating requests using Django's RequestFactory.
"""

import json
import pytest
from unittest.mock import patch, MagicMock
from django.test import RequestFactory
from django.http import JsonResponse
from src.controllers.product_category_controller import (
    category_product_endpoint,
    get_products_in_category,
    add_product_to_category,
    remove_product_from_category,
)
from mongoengine.errors import DoesNotExist, ValidationError


@pytest.fixture
def factory():
    """Provides a Django RequestFactory instance."""
    return RequestFactory()


def test_get_products_in_category_success(factory):
    """Test GET request returns list of products in category."""
    mock_category = MagicMock(id="cat123")
    mock_products = MagicMock()
    mock_products.to_json.return_value = json.dumps([{"name": "Chair"}])

    with patch("src.services.product_category_service.ProductCategoryService.get_category_by_title", return_value=mock_category), \
         patch("src.services.product_category_service.ProductCategoryService.list_products_in_category", return_value=mock_products):

        request = factory.get("/category/Furniture")
        response = get_products_in_category(request, "Furniture")
        assert response.status_code == 200
        assert json.loads(response.content) == [{"name": "Chair"}]


def test_get_products_in_category_not_found(factory):
    """Test GET request for non-existent category returns 404."""
    with patch("src.services.product_category_service.ProductCategoryService.get_category_by_title", side_effect=DoesNotExist):
        request = factory.get("/category/Nonexistent")
        response = get_products_in_category(request, "Nonexistent")
        assert response.status_code == 404


def test_add_product_to_category_success(factory):
    """Test POST request to add a product to a category."""
    mock_category = MagicMock(id="cat123")
    mock_product = MagicMock()
    mock_product.to_json.return_value = json.dumps({"name": "Product A"})

    with patch("src.services.product_category_service.ProductCategoryService.get_category_by_title", return_value=mock_category), \
         patch("src.services.product_category_service.ProductCategoryService.add_product_to_category", return_value=mock_product):

        request_data = {
            "product_id": "product123",
            "name": "Product A",
            "price": 100,
            "quantity": 10,
            "description": "desc"
        }
        request = factory.post(
            "/category/Furniture",
            data=json.dumps(request_data),
            content_type="application/json"
        )
        response = add_product_to_category(request, "Furniture")
        assert response.status_code == 200
        assert json.loads(response.content)["name"] == "Product A"


def test_add_product_to_category_missing_id(factory):
    """Test POST with missing product_id returns 400."""
    data = {"name": "Product A", "price": 10, "quantity": 1}
    request = factory.post(
        "/category/Furniture",
        data=json.dumps(data),
        content_type="application/json"
    )
    response = add_product_to_category(request, "Furniture")
    assert response.status_code == 400


def test_add_product_to_category_validation_error(factory):
    """Test POST with invalid data triggers validation error."""
    with patch("src.services.product_category_service.ProductCategoryService.get_category_by_title", return_value=MagicMock()), \
         patch("src.services.product_category_service.ProductCategoryService.add_product_to_category", side_effect=ValidationError("Invalid")):

        data = {"product_id": "bad-id", "name": "A", "price": 10, "quantity": 1}
        request = factory.post(
            "/category/Furniture",
            data=json.dumps(data),
            content_type="application/json"
        )
        response = add_product_to_category(request, "Furniture")
        assert response.status_code == 400


def test_remove_product_from_category_success(factory):
    """Test DELETE request to remove product from category."""
    mock_product = MagicMock()
    mock_product.to_json.return_value = json.dumps({"name": "Removed Product"})

    with patch("src.services.product_category_service.ProductCategoryService.remove_product_from_category", return_value=mock_product):
        request = factory.delete(
            "/category/Furniture",
            data=json.dumps({"product_id": "product123"}),
            content_type="application/json"
        )
        response = remove_product_from_category(request, "Furniture")
        assert response.status_code == 200
        assert json.loads(response.content)["name"] == "Removed Product"


def test_remove_product_from_category_missing_id(factory):
    """Test DELETE with missing product_id returns 400."""
    request = factory.delete(
        "/category/Furniture",
        data=json.dumps({}),
        content_type="application/json"
    )
    response = remove_product_from_category(request, "Furniture")
    assert response.status_code == 400


def test_remove_product_from_category_does_not_exist(factory):
    """Test DELETE when product does not exist returns 404."""
    with patch("src.services.product_category_service.ProductCategoryService.remove_product_from_category", side_effect=DoesNotExist):
        request = factory.delete(
            "/category/Furniture",
            data=json.dumps({"product_id": "bad-id"}),
            content_type="application/json"
        )
        response = remove_product_from_category(request, "Furniture")
        assert response.status_code == 404