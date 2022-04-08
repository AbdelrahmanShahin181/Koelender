from datetime import datetime
from django.db import models

class Pruefung(models.Model):
    pnr = models.IntegerField(unique=True, null=False,)
    semester = models.IntegerField(null=False)
    name = models.CharField(max_length=200, unique= True, null=False)
    pruefer= models.CharField(max_length=200,null=False)
    datum= models.DateField(null=False )
    pruefungsform= models.CharField(max_length=200)
    dauer= models.IntegerField()
    teilnehmerzahl= models.IntegerField()
    createTime= models.DateTimeField(auto_created=True)
    updateTime= models.DateTimeField(auto_created=True)


class Studiengang(models.Model):
    fbChoices= (('EI','Elektrotechnik und Informatik'),('G','Geodäsie'))
    fachbereich = models.CharField(max_length=200,null=False, choices=fbChoices)
    abschlussoptionen= (('BA','Bachelor'),('MA','Master'))
    abschulss= models.CharField(max_length=20,null=False, choices=abschlussoptionen)
    pruefungsOrdnung= models.IntegerField()

class Pruefung_Studiengang(models.Model):
    pnr= models.ForeignKey(Pruefung,to_field= 'pnr', on_delete=models.CASCADE)
    studiengangid= models.ForeignKey(Studiengang, on_delete=models.CASCADE)
