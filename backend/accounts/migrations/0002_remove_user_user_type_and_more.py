# Generated by Django 5.2.1 on 2025-05-28 07:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='user_type',
        ),
        migrations.AlterUniqueTogether(
            name='bulkbuyerprofile',
            unique_together={('user',)},
        ),
        migrations.AlterUniqueTogether(
            name='regularbuyerprofile',
            unique_together={('user',)},
        ),
        migrations.AlterUniqueTogether(
            name='regularsellerprofile',
            unique_together={('user',)},
        ),
        migrations.AlterUniqueTogether(
            name='wholesellerprofile',
            unique_together={('user',)},
        ),
    ]
