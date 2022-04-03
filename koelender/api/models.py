from django.db import models

class Pruefung(models.Model):
    name = models.CharField(max_length=200, unique= True, null=False)
    fachbereich = models.CharField(max_length=20, null=False)
    semester = models.IntegerField(null=False)
