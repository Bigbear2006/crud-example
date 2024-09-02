from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField

from . import models


class ItemSerializer(ModelSerializer):
    categories = PrimaryKeyRelatedField(many=True, queryset=models.Category.objects.all(), required=False)

    class Meta:
        model = models.Item
        fields = ('id', 'title', 'description', 'image', 'categories')
        depth = 1

    def to_representation(self, instance):
        data = super(ItemSerializer, self).to_representation(instance)
        data['categories'] = CategorySerializer(models.Category.objects.filter(id__in=data['categories']), many=True).data
        if instance.image:
            data['image'] = self.context["request"].build_absolute_uri(instance.image.url)
        else:
            data['image'] = self.context["request"].build_absolute_uri('/media/items/default.png')
        return data

    def update(self, instance: models.Item, validated_data: dict):
        # was - 1, 2, 3; now - 1, 2, 4; 3 - delete; 4 - create
        categories = validated_data.pop('categories', None)
        if categories:
            removed = set(instance.categories.all()) - set(categories)
            models.ItemCategory.objects.filter(item=instance, category__in=removed).delete()

            created = set(categories) - set(instance.categories.all())
            [
                models.ItemCategory.objects.create(item=instance, category=category_id)
                for category_id in created
            ]
        return super(ItemSerializer, self).update(instance, validated_data)


class CategorySerializer(ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


class ItemCategorySerializer(ModelSerializer):
    class Meta:
        model = models.ItemCategory
        fields = '__all__'
