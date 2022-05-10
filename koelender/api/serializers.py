from dataclasses import field, fields
from rest_framework import serializers
from .models import Pruefung

class PruefungSerializer(serializers.ModelSerializer):
    class Meta:
        model= Pruefung
        fields= ('id','pnr','semester','name','pruefer','datum','pruefungsform', 'dauer', 'teilnehmerzahl', 'pruefungsOrdnung', 'fachbereich', 'studiengang','startzeit')
