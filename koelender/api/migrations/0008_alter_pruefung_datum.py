# Generated by Django 4.0.3 on 2022-04-16 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_pruefung_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pruefung',
            name='datum',
            field=models.DateField(null=True),
        ),
    ]
