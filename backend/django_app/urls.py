from django.contrib import admin
from django.urls import path
from django.http import HttpResponse

from .controllers.productController import productEndpoint

def hello_world(request):
    return HttpResponse("Hello, world! This is our interneers-lab Django server.")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', hello_world),
    path('products', productEndpoint),
    path('products/<int:request_id>', productEndpoint),
]
