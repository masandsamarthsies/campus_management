from django.contrib import admin
from .models import Class
from .models import Room, TimeSlot, Timetable, RoomBookingRequest

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ("room_code", "room_type", "floor", "capacity", "is_active")
    list_filter = ("room_type", "is_active")
    search_fields = ("room_code",)

admin.site.register(TimeSlot)
admin.site.register(Timetable)
admin.site.register(RoomBookingRequest)
admin.site.register(Class)