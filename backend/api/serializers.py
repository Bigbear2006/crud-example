from rest_framework.serializers import ModelSerializer

from . import models


class ItemSerializer(ModelSerializer):
    class Meta:
        model = models.Item
        fields = '__all__'
        depth = 1

    def to_representation(self, instance):
        data = super(ItemSerializer, self).to_representation(instance)
        if instance.image:
            data['image'] = self.context["request"].build_absolute_uri(instance.image.url)
        else:
            data['image'] = self.context["request"].build_absolute_uri('/media/items/default.png')
        return data


class CategorySerializer(ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


class ItemCategorySerializer(ModelSerializer):
    class Meta:
        model = models.ItemCategory
        fields = '__all__'
