from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Pruefung
from .serializers import PruefungSerializer


class PruefungView(generics.ListAPIView):
    queryset= Pruefung.objects.all()
    serializer_class = PruefungSerializer