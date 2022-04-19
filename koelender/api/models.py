from datetime import datetime
from email.policy import default
from django.db import models
    
    
class Pruefung(models.Model):
<<<<<<< HEAD
    pnr = models.IntegerField(unique=True, null=False,)
    semester = models.IntegerField(null=False)
    name = models.CharField(max_length=200, unique= True, null=False)
    pruefer= models.CharField(max_length=200,null=False)
    datum= models.DateField(null=False )
    pruefungsform= models.CharField(max_length=200)
    dauer= models.IntegerField()
    teilnehmerzahl= models.IntegerField()
    pruefungsOrdnung= models.IntegerField()
    createTime= models.DateTimeField(auto_created=True, default= datetime.now)
    updateTime= models.DateTimeField(auto_created=True, default= datetime.now)
    fachbereich = models.ManyToManyField(Studiengang)
=======
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
>>>>>>> 53538ffa26e726afe9a98ffc3494ce406c6e4d41

    def __str__(self):
        return self.name





