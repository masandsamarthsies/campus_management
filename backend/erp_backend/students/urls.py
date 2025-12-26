from django.urls import path
from .views import register_student,login_student

urlpatterns = [
    path('register/', register_student),
    path('login/', login_student),
]
