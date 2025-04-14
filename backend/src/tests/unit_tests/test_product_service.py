# src/tests/unit_tests/test_product_service.py

"""
Unit tests for ProductService class in src.services.product_service.
Tests various operations like create, retrieve, update, delete, and modifying product attributes
by mocking database interactions using pytest and unittest.mock.
"""

import pytest
from unittest.mock import patch, MagicMock
from src.services.product_service import ProductService
from src.models.product import Product


@pytest.fixture
def sample_data():
    """Provides sample product data for use in tests."""
    return {
        "name": "Test Product",
        "price": 99,
        "quantity": 50,
        "brand": "Test Brand",
        "description": "Short description"
    }


@patch("src.services.product_service.Product")
def test_create_product_success(mock_product_class, sample_data):
    """Test successful creation of a product and saving it to the database."""
    mock_product_instance = MagicMock()
    mock_product_class.return_value = mock_product_instance

    result = ProductService.create_product(sample_data)

    mock_product_class.assert_called_once_with(
        name="Test Product",
        price=99,
        quantity=50,
        brand="Test Brand",
        description="Short description"
    )
    mock_product_instance.save.assert_called_once()
    assert result == mock_product_instance


@patch("src.services.product_service.Product.objects")
def test_get_product_by_id_success(mock_objects):
    """Test fetching a product by its ID."""
    mock_product = MagicMock()
    mock_objects.get.return_value = mock_product

    result = ProductService.get_product_by_id("abc123")
    mock_objects.get.assert_called_once_with(id="abc123")
    assert result == mock_product


@patch("src.services.product_service.Product.objects")
def test_update_product_calls_modify_fields(mock_objects):
    """Test that update_product calls modify_fields on the fetched product."""
    mock_product = MagicMock()
    mock_objects.get.return_value = mock_product

    update_data = {"price": 120}
    result = ProductService.update_product("abc123", update_data)

    mock_product.modify_fields.assert_called_once_with(update_data)
    assert result == mock_product


@patch("src.services.product_service.Product.objects")
def test_delete_product_calls_delete(mock_objects):
    """Test that delete_product calls delete on the fetched product."""
    mock_product = MagicMock()
    mock_objects.get.return_value = mock_product

    ProductService.delete_product("abc123")
    mock_product.delete.assert_called_once()


@patch("src.services.product_service.Product.objects")
def test_modify_stock_success(mock_objects):
    """Test modifying stock of a product returns updated quantity."""
    mock_product = MagicMock()
    mock_product.modify_stock.return_value = 75
    mock_objects.get.return_value = mock_product

    result = ProductService.modify_stock("abc123", 5)
    mock_product.modify_stock.assert_called_once_with(5)
    assert result == 75


@patch("src.services.product_service.Product.objects")
def test_set_stock_success(mock_objects):
    """Test setting stock of a product returns new quantity."""
    mock_product = MagicMock()
    mock_product.set_stock.return_value = 30
    mock_objects.get.return_value = mock_product

    result = ProductService.set_stock("abc123", 30)
    mock_product.set_stock.assert_called_once_with(30)
    assert result == 30


@patch("src.services.product_service.Product.objects")
def test_set_price_success(mock_objects):
    """Test setting price of a product returns updated price."""
    mock_product = MagicMock()
    mock_product.set_price.return_value = 149
    mock_objects.get.return_value = mock_product

    result = ProductService.set_price("abc123", 149)
    mock_product.set_price.assert_called_once_with(149)
    assert result == 149
