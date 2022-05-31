from dataclasses import field, fields
from rest_framework import serializers
from .models import Pruefung

class PruefungSerializer(serializers.ModelSerializer):
    class Meta:
        model= Pruefung
        fields= ('id', 
        'pnr', 
        'name', 
        'datum', 
        'dauer', 
        'startzeit', 
        'pruefungsform', 
        'pruefer', 
        'fachbereich', 
        'studiengang', 
        'semester', 
        'abschluss', 
        'pruefungsOrdnung', 
        'teilnehmerzahl')
