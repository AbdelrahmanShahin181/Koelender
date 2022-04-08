from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('liste/', views.pruefungListeGET), 
    path('liste/<int:id>/', views.pruefungDetails),
    path('liste/create/', PruefungCreateView.as_view()),
    
]
