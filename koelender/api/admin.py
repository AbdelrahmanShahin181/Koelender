from django.contrib import admin
from .models import Pruefung
from import_export.admin import ImportExportModelAdmin
from import_export import resources, fields
from import_export.widgets import ManyToManyWidget 

#admin.site.register(Pruefung)
#admin.site.register(Studiengang)


class PruefungResource(resources.ModelResource):
    fachbereich= fields.Field(column_name='Fachbereich', attribute='fachbereich')
    abschluss= fields.Field(column_name='Abschluss', attribute='abschluss')
    studiengang= fields.Field(column_name='Studiengang', attribute='studiengang')
    po= fields.Field(column_name='PO', attribute='pruefungsOrdnung')
    semester= fields.Field(column_name='Semester', attribute='semester')
    pruefung= fields.Field(column_name='Prüfung', attribute='name')
    pruefer= fields.Field(column_name='Prüfer', attribute='pruefer')
    datum= fields.Field(column_name='Datum', attribute='datum')
    pruefungsform= fields.Field(column_name='Prüfungsform', attribute='pruefungsform')
    dauer= fields.Field(column_name='Dauer', attribute='dauer')
    teilnehmerzahl= fields.Field(column_name='TN-Zahlen', attribute='teilnehmerzahl')

    class Meta:
        model = Pruefung
        fields = ('id','pnr')
        #import_id_fields = ['pnr']
        #export_order=('fachbereich','abschluss','studiengang','po','semester','pnr','pruefung','pruefer','datum','pruefungsform')

class PruefungAdmin(ImportExportModelAdmin):
    resource_class= PruefungResource
    list_display=('name', 'pruefer', 'datum')
    list_filter= ('semester', 'studiengang', 'abschluss', 'pruefungsOrdnung')

admin.site.register(Pruefung, PruefungAdmin)



