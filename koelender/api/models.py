from datetime import datetime
from email.policy import default
from django.db import models

class Studiengang(models.Model):
    fbChoices= (('EI','Elektrotechnik und Informatik'),('G','Geodäsie'))
    fachbereich = models.CharField(max_length=200,null=False, choices=fbChoices)
    abschlussoptionen= (('BA','Bachelor'),('MA','Master'))
    abschulss= models.CharField(max_length=20,null=False, choices=abschlussoptionen)

    def __str__(self):
        return self.fachbereich + ' '+ self.abschulss
    
    

class Pruefung(models.Model):
    pnr = models.IntegerField(unique=True, null=False,)
    semester = models.IntegerField(null=False)
    name = models.CharField(max_length=200, unique= True, null=False)
    pruefer= models.CharField(max_length=200,null=False)
    datum= models.DateField(null=False )
    pruefungsform= models.CharField(max_length=200)
    dauer= models.IntegerField()
    teilnehmerzahl= models.IntegerField()
    pruefungsOrdnung= models.IntegerField()
    #createTime= models.DateTimeField(auto_created=True, default= datetime.now)
    #updateTime= models.DateTimeField(auto_created=True, default= datetime.now)
    fachbereich = models.ManyToManyField(Studiengang)

    def __str__(self):
        return self.name





