from ast import Delete, Return
from cgitb import lookup
from email.policy import HTTP
from os import stat
from pickle import TRUE
import re
from urllib import response

#from urllib import request, response
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Pruefung
from .serializers import PruefungSerializer

from rest_framework.decorators import api_view


class PruefungView(generics.ListAPIView):
    queryset= Pruefung.objects.all()
    serializer_class = PruefungSerializer

class PruefungCreateView(generics.CreateAPIView):
        queryset= Pruefung.objects.all()
        serializer_class = PruefungSerializer
        

@api_view(['GET','POST'])
def pruefungListeGET(request):
    if request.method== 'GET':
        queryset= Pruefung.objects.all()
        serializer_class = PruefungSerializer(queryset,many=TRUE)
        return Response(serializer_class.data)
    if request.method== 'POST':
        pruefung= Pruefung()
        serializer_class= PruefungSerializer(pruefung, data=request.data)
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data,status= status.HTTP_201_CREATED)
        return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','Delete'])
def pruefungDetails(request,id):
    pruefung = Pruefung.objects.get(pk=id)
    
    if request.method =='GET':
        serialz=PruefungSerializer(pruefung)
        return Response(serialz.data)
   
    
    elif request.method =='PUT':
        serialz=PruefungSerializer(pruefung,data=request.data)
        if serialz.is_valid():
            serialz.save()
            return Response(serialz.data)
        return Response(serialz.errors)

    elif request.method =='DELETE':
        operation= pruefung.delete();

        if operation:
            return Response({"erfolgreich ": "erfolgreich gelöscht"}, status=status.HTTP_200_OK)
        else:
            return Response({"Fehler ": "Der Eintrag konnte nicht gelöscht werden"}, status=status.HTTP_400_BAD_REQUEST)
        
