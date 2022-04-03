from django.urls import path
from .views import PruefungView

urlpatterns = [
    path('', PruefungView.as_view()),
]
