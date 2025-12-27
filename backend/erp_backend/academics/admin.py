from django.contrib import admin
from .models import *

admin.site.register(Course)
admin.site.register(Semester)
admin.site.register(Subject)
admin.site.register(Class)
admin.site.register(Enrollment)
admin.site.register(TeachingAssignment)


# Register your models here.
