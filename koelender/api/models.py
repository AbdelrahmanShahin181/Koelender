from datetime import datetime
from email.policy import default
from django.db import models
    
    
class Pruefung(models.Model):
    pnr = models.CharField(max_length=200,null=True)
    semester = models.CharField(max_length=200,null=True)
    name = models.CharField(max_length=200,null=True)
    pruefer= models.CharField(max_length=200,null=True)
    datum= models.CharField(max_length=200,null=True)
    startzeit= models.CharField(max_length=200,null=True)
    pruefungsform= models.CharField(max_length=200,null=True)
    dauer= models.CharField(max_length=200,null=True)
    teilnehmerzahl= models.CharField(max_length=200,null=True)
    pruefungsOrdnung= models.CharField(max_length=200,null=True)
    studiengang = models.CharField(max_length=120,null=True)
    #fbChoices= (('EI','Elektrotechnik und Informatik'),('G','Geodäsie'))
    fachbereich = models.CharField(max_length=200,null=True)
    #abschlussoptionen= (('BA','Bachelor'),('MA','Master'))
    abschluss= models.CharField(max_length=200,null=True)

    def __str__(self):
        return str(self.name)





