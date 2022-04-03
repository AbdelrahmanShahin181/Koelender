from dataclasses import field
from rest_framework import serializers
from .models import Pruefung

class PruefungSerializer(serializers.ModelSerializer):
    class Meta:
        model= Pruefung
        fields= ('name', 'fachbereich', 'semester')