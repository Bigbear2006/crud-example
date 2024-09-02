import json

from django.core.management.base import BaseCommand
from django.utils.module_loading import import_string


class Command(BaseCommand):
    help = 'load data from local json file'

    def add_arguments(self, parser):
        parser.add_argument('-f', '--file', type=str)

    def handle(self, *args, **options):
        with open(options['file'], 'r', encoding='utf-8') as f:
            data = json.load(f)

        model_class = import_string(data['model'])
        serializer_class = import_string(data['serializer'])
        lookup_field = data['lookup_field']

        for i in data['data']:
            if model_class.objects.filter(**{lookup_field: i[lookup_field]}).exists():
                self.stdout.write(f'{model_class.__name__}({lookup_field}={i[lookup_field]}) already exists')
                continue

            serializer = serializer_class(data=i)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            self.stdout.write(f'{serializer.instance}(id={serializer.instance.id}) created successfully!')
