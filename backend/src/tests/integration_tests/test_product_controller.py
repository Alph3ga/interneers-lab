"""
Integration tests for the /product endpoints in the product controller.
Seeds the test database using TEST_DATA.json before running tests.
"""

import json
import pytest
from django.test import Client
from src.models.product import Product
from src.db.db_init import init_db

#pylint: disable=no-member

@pytest.fixture(scope="module", autouse=True)
def seed_test_database():
    """Seed the in-memory test database with initial products from TEST_DATA.json."""
    init_db()
    file_path= "TEST_DATA.json"
    with open(file_path, "r") as f:
        test_data = json.load(f)

    for product in test_data:
        Product(**product).save()

    yield  # Run the tests

    # Teardown: clean up after tests
    Product.objects.delete()


@pytest.fixture
def client():
    """Django test client for making HTTP requests."""
    return Client()


def test_get_all_products(client):
    """Test GET /products returns all products."""
    response = client.get("/products")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data["data"], list)

def test_get_paginated_products(client):
    """Test GET /products with pagination."""
    # Set the pagination parameters
    limit= 10
    start= 0  # Start from the first product

    # Send the GET request with pagination parameters
    response= client.get(f"/products?start={start}&limit={limit}")
    assert response.status_code== 206
    
    data= response.json()
    
    # Check if the data is a list and contains the correct number of products (based on limit)
    assert isinstance(data["data"], list)
    assert len(data["data"])== limit

    # Check if navigation information is present
    assert "navigation" in data
    navigation= data["navigation"]
    
    # Ensure navigation links are correct
    assert navigation["self"]== f"/products?start={start}&limit={limit}"
    assert navigation["next"] is not None  # Since we expect more products beyond the first page
    assert navigation["prev"] is None  # No previous page for the first page
    
    # Check the current page
    assert navigation["current"]== 1
    
    # Dynamically use the "next" link to get the next page of products
    next_page_uri = navigation["next"]
    response = client.get(next_page_uri)
    assert response.status_code== 206
    data= response.json()
    
    # Check if the data for the next page contains the correct number of products
    assert len(data["data"]) == limit  # Ensure the next page has the same number of products
    
    # Confirm that the navigation reflects the next page correctly
    assert data["navigation"]["self"]== next_page_uri
    assert data["navigation"]["prev"] is not None  # There should be a previous page now
    assert data["navigation"]["next"] is not None 
    assert data["navigation"]["current"]== 2  # We're now on the second page


def test_create_product(client):
    """Test POST /products creates a new product."""
    payload = {
        "name": "Table",
        "price": 120,
        "quantity": 5,
        "brand": "WoodWorks",
        "description": "Solid oak table."
    }
    response = client.post("/products", json.dumps(payload), content_type="application/json")
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Table"
    assert data["price"] == 120

    # Confirm in DB
    db_product = Product.objects(name="Table").first()
    assert db_product is not None
    assert db_product.price == 120


def test_update_product(client):
    """Test PUT /products/<id> updates a product."""
    product = Product.objects(name="Pedigree Puppy Food").first()
    product_id= product.id
    update_data = {"price": 75}
    response = client.patch(f"/products/{product_id}", json.dumps(update_data), content_type="application/json")
    assert response.status_code == 204

    # Confirm in DB
    refreshed = Product.objects(id=product_id).first()
    assert refreshed.price == 75


def test_delete_product(client):
    """Test DELETE /products/<id> removes a product."""
    product = Product.objects(name="Bosch Tool Kit 12pcs").first()
    product_id= product.id
    response = client.delete(f"/products/{product_id}")
    assert response.status_code == 204

    # Confirm deletion in DB
    assert not Product.objects(id=product_id)
