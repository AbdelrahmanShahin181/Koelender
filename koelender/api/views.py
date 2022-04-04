from ast import Delete
from cgitb import lookup
from os import stat
from pickle import TRUE
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

@api_view(['GET','POST'])
def pruefungListeGET(request):
    

    queryset= Pruefung.objects.all()
    serializer_class = PruefungSerializer(queryset,many=TRUE)
    return JsonResponse({'pruefung':serializer_class.data})

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
        
class Listenview(generics.ListAPIView):
    queryset= Pruefung.objects.all()
    serializer_class = PruefungSerializer

class PruefungCreateView(generics.CreateAPIView):
    
    
        queryset= Pruefung.objects.all()
        serializer_class = PruefungSerializer
       

class PruefungDeleteView(generics.DestroyAPIView):
    queryset= Pruefung.objects.all()
    serializer_class = PruefungSerializer

class PruefungEditView(generics.UpdateAPIView):
    serializer_class = PruefungSerializer

    def patch(self,request,format=None):
        serializer= self.serializer_class(data=request.data)
        if serializer.is_valid():
            name = serializer.data.get('name')
            fachbereich = serializer.data.get('fachbereich')
            semester=serializer.data.get('semester')
            queryset= Pruefung.objects.filter(name=name)
            pruefung= queryset[0]
            pruefung.name = name
            pruefung.fachbereich= fachbereich
            pruefung.semester= semester
            pruefung.save(update_fields=['name','fachbereich','semester'])

            return Response(PruefungSerializer(pruefung).data, status=status.HTTP_200_OK)
    
    lookup_field='id'
