from src.models.product import Product  # Assuming the Product model is in models/product.py

#pylint: disable=no-member

class ProductService:
    """
    Service layer for managing products in the database.
    """

    @staticmethod
    def create_product(data: dict) -> Product:
        """
        Creates a new product and saves it to the database.

        Args:
            data: Dictionary containing product details. Required keys: "name", "price", "quantity".
                  Optional keys: "brand", "description".
        
        Returns:
            Created Product instance.
        """
        product = Product(
            name=data["name"],
            price=data["price"],
            quantity=data["quantity"],
            brand=data.get("brand", ""),  # Default to empty string
            description=data.get("description", "")
        )
        product.save()
        return product

    @staticmethod
    def get_product_by_id(product_id: str) -> Product:
        """
        Fetches a product by its ID.

        Args:
            product_id: The ID of the product to fetch.

        Returns:
            Product instance if found.
        
        Raises:
            DoesNotExist: If the product does not exist.
        """
        return Product.objects.get(id=product_id)

    @staticmethod
    def update_product(product_id: str, data: dict) -> Product:
        """
        Updates specified fields of a product.

        Args:
            product_id: The ID of the product to update.
            data: Dictionary containing fields to update.

        Returns:
            Updated Product instance.
        
        Raises:
            DoesNotExist: If the product does not exist.
            KeyError: If an invalid field is provided.
        """
        product = Product.objects.get(id=product_id)
        product.modify_fields(data)
        return product

    @staticmethod
    def delete_product(product_id: str) -> None:
        """
        Deletes a product from the database.

        Args:
            product_id: The ID of the product to delete.
        
        Raises:
            DoesNotExist: If the product does not exist.
        """
        product = Product.objects.get(id=product_id)
        product.delete()

    @staticmethod
    def modify_stock(product_id: str, amount: int) -> int:
        """
        Modifies the stock of a product.

        Args:
            product_id: The ID of the product.
            amount: The amount to adjust the stock by (positive or negative).

        Returns:
            Updated stock quantity.
        
        Raises:
            DoesNotExist: If the product does not exist.
            ValueError: If stock would go negative.
        """
        product = Product.objects.get(id=product_id)
        return product.modify_stock(amount)

    @staticmethod
    def set_stock(product_id: str, amount: int) -> int:
        """
        Sets the stock of a product.

        Args:
            product_id: The ID of the product.
            amount: The new stock amount.

        Returns:
            Updated stock quantity.
        
        Raises:
            DoesNotExist: If the product does not exist.
            ValueError: If stock amount is negative.
        """
        product = Product.objects.get(id=product_id)
        return product.set_stock(amount)

    @staticmethod
    def set_price(product_id: str, amount: int) -> int:
        """
        Updates the price of a product.

        Args:
            product_id: The ID of the product.
            amount: The new price amount.

        Returns:
            Updated price.
        
        Raises:
            DoesNotExist: If the product does not exist.
            ValueError: If price amount is negative.
        """
        product = Product.objects.get(id=product_id)
        return product.set_price(amount)

    @staticmethod
    def get_product_filtered(name: str, category: str, brand: str, price_less_than_e: int, \
        price_greater_than_e: int, quantity_less_than_e: int, quantity_greater_than_e: int):
        """
        Retrieves products from the database filtered by name, category, brand, price, and quantity.

        Args:
            name (str): Name of the product to filter by. Use an empty string to ignore.
            category (str): Category of the product to filter by. Use an empty string to ignore.
            brand (str): Brand of the product to filter by. Use an empty string to ignore.
            price_less_than_e (int): Upper bound for product price (inclusive). Use -1 to ignore.
            price_greater_than_e (int): Lower bound for product price (inclusive). Use -1 to ignore.
            quantity_less_than_e (int): Upper bound for product quantity (inclusive). Use -1 to ignore.
            quantity_greater_than_e (int): Lower bound for product quantity (inclusive). Use -1 to ignore.

        Returns:
            QuerySet: A queryset of Product objects that match the specified filters.
        """

        data= Product.objects

        if not name == "":
            data= data.filter(name= name)
        if not brand == "":
            data= data.filter(brand= brand)
        if not category == "":
            data= data.filter(category= category)
        
        if price_less_than_e > -1:
            data= data.filter(price__lte= price_less_than_e)
        if price_greater_than_e > -1:
            data= data.filter(price__gte= price_greater_than_e)
        
        if quantity_less_than_e > -1:
            data= data.filter(quantity__lte= quantity_less_than_e)
        if quantity_greater_than_e > -1:
            data= data.filter(quantity__gte= quantity_greater_than_e)
        

        return data
        
