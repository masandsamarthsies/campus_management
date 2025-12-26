from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .serializers import StudentSerializer
from .models import Student

@csrf_exempt
@api_view(['POST'])
def register_student(request):
    serializer = StudentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Student registered successfully. Default password: sies@123"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def login_student(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        student = Student.objects.get(email=email, password=password)

        return Response({
            "message": "Login successful",
            "student_id": student.id,
            "name": student.name,
            "semester": student.semester
        }, status=status.HTTP_200_OK)

    except Student.DoesNotExist:
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )
