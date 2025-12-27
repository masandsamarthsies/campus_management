from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from .models import *
from .serializers import *

@api_view(['POST'])
def create_class(request):
    serializer = ClassSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Class created"})
    return Response(serializer.errors, status=400)

# Create your views here.
