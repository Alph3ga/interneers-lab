# src/tests/unit_tests/test_product_category_service.py

"""
Unit tests for ProductCategoryService class in src.services.product_category_service.
Covers create, read, update, delete operations and product-category relationships.
Database operations are mocked using pytest and unittest.mock.
"""

import pytest
from unittest.mock import patch, MagicMock
from src.services.product_category_service import ProductCategoryService
from src.models.product_category import ProductCategory
from src.models.product import Product


@pytest.fixture
def sample_category():
    return {"title": "Electronics", "description": "Devices and gadgets."}


@patch("src.services.product_category_service.ProductCategory")
def test_create_category_success(mock_category_class, sample_category):
    mock_instance = MagicMock()
    mock_category_class.return_value = mock_instance

    result = ProductCategoryService.create_category(**sample_category)

    mock_category_class.assert_called_once_with(**sample_category)
    mock_instance.save.assert_called_once()
    assert result == mock_instance


@patch("src.services.product_category_service.ProductCategory.objects")
def test_get_category_by_id(mock_objects):
    mock_category = MagicMock()
    mock_objects.get.return_value = mock_category

    result = ProductCategoryService.get_category_by_id("cat123")

    mock_objects.get.assert_called_once_with(id="cat123")
    assert result == mock_category


@patch("src.services.product_category_service.ProductCategory.objects")
def test_get_category_by_title(mock_objects):
    mock_category = MagicMock()
    mock_objects.get.return_value = mock_category

    result = ProductCategoryService.get_category_by_title("Electronics")

    mock_objects.get.assert_called_once_with(title="Electronics")
    assert result == mock_category


@patch("src.services.product_category_service.ProductCategory.objects")
def test_update_category_success(mock_objects):
    mock_category = MagicMock()
    mock_objects.get.return_value = mock_category

    result = ProductCategoryService.update_category(
        category_title="Electronics", title="Updated Electronics", description="Updated desc"
    )

    assert mock_category.title == "Updated Electronics"
    assert mock_category.description == "Updated desc"
    mock_category.save.assert_called_once()
    assert result == mock_category


@patch("src.services.product_category_service.ProductCategory.objects")
def test_delete_category_success(mock_objects):
    mock_category = MagicMock()
    mock_objects.get.return_value = mock_category

    ProductCategoryService.delete_category("cat123")
    mock_category.delete.assert_called_once()


@patch("src.services.product_category_service.Product.objects")
def test_list_products_in_category(mock_objects):
    mock_objects.return_value = [MagicMock(), MagicMock()]
    result = ProductCategoryService.list_products_in_category("cat123")

    mock_objects.assert_called_once_with(category="cat123")
    assert len(result) == 2


@patch("src.services.product_category_service.Product.objects")
@patch("src.services.product_category_service.ProductCategory.objects")
def test_add_product_to_category(mock_category_objects, mock_product_objects):
    mock_product = MagicMock()
    mock_category = MagicMock()
    mock_product_objects.get.return_value = mock_product
    mock_category_objects.get.return_value = mock_category

    result = ProductCategoryService.add_product_to_category("prod123", "cat123")

    assert mock_product.category == mock_category
    mock_product.save.assert_called_once()
    assert result == mock_product


@patch("src.services.product_category_service.Product.objects")
def test_remove_product_from_category(mock_product_objects):
    mock_product = MagicMock()
    mock_product_objects.get.return_value = mock_product

    result = ProductCategoryService.remove_product_from_category("prod123")

    assert mock_product.category is None
    mock_product.save.assert_called_once()
    assert result == mock_product
