#!/usr/bin/env python

from src.models.product import Product
import schedule
import time

LIMIT= 1000
page= 0
done= False

def job():
    global page, done
    to_be_migrated= Product.objects(category__exists= False)[page*LIMIT:(page+1)*LIMIT]
    print(to_be_migrated)
    page+= 1

    if len(to_be_migrated)<LIMIT:
        done= True

    for product in to_be_migrated:
        product.category= ""
        product.save()
        print(f"Product {product.id}")

def main():
    schedule.every(30).minutes.do(job)

    while not done:
        schedule.run_pending()
        time.sleep(1)
