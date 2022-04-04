from django.urls import path
from .views import *
from . import views

urlpatterns = [
    
    path('', PruefungView.as_view()),
    path('liste',Listenview.as_view()),
    path('liste/create/', PruefungCreateView.as_view()),
    path('delete:id/', PruefungDeleteView.as_view()),
    path('liste/edit/',PruefungEditView.as_view()),
    path('liste1/', views.pruefungListeGET), 
    path('liste1/<int:id>/', views.pruefungDetails),
    
]
