from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .models import Teacher
from .serializers import TeacherSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Teacher
from .serializers import TeacherSerializer


@api_view(["GET"])
def list_teachers(request):
    teachers = Teacher.objects.all()
    serializer = TeacherSerializer(teachers, many=True)
    return Response(serializer.data)


@csrf_exempt
@api_view(['POST'])
def add_teacher(request):
    serializer = TeacherSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Teacher registered successfully. Default password: sies@123"},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
@csrf_exempt
@api_view(['POST'])
def login_teacher(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        teacher = Teacher.objects.get(email=email, password=password)

        return Response({
            "message": "Login successful",
            "teacher_id": teacher.id,
            "name": teacher.name,
            "department": teacher.department
        }, status=status.HTTP_200_OK)

    except Teacher.DoesNotExist:
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )
