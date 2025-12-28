from django.urls import path
from .views import add_teacher,login_teacher
from . import views

urlpatterns = [
    path('register/', add_teacher),
    path('login/', login_teacher),
    path("", views.list_teachers),

]
