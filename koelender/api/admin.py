from django.contrib import admin
from .models import Pruefung,Studiengang

from import_export.admin import ImportExportModelAdmin
from import_export import resources 

#admin.site.register(Pruefung)
#admin.site.register(Studiengang)


class PruefungResource(resources.ModelResource):
    class Meta:
        model = Pruefung
        fields= ('id','name','fachbereich__fachbereich', 'fachbereich__abschulss')
        export_order=('id','name','fachbereich__fachbereich', 'fachbereich__abschulss')

@admin.register(Pruefung)
class PruefungImportExport(ImportExportModelAdmin):
    #list_display=['id']
    pass

@admin.register(Studiengang)
class StudiengangImportExport(ImportExportModelAdmin):
    pass