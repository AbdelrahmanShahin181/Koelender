from dataclasses import field
from rest_framework import serializers
from .models import Pruefung

class PruefungSerializer(serializers.ModelSerializer):
    class Meta:
        model= Pruefung
        fields= ('id','name', 'fachbereich', 'semester')