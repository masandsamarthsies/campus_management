from django.urls import path
from .views import create_class

urlpatterns = [
    path('class/create/', create_class),
]
