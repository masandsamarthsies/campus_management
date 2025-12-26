from django.urls import path
from .views import add_teacher,login_teacher

urlpatterns = [
    path('register/', add_teacher),
    path('login/', login_teacher),
]
