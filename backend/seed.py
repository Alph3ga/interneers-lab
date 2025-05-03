#!/usr/bin/env python

import json

from src.db.db_init import init_db
from src.models.product import Product

init_db()
file_path= "TEST_DATA.json"
with open(file_path, "r") as f:
    test_data = json.load(f)

for product in test_data:
    Product(**product).save()