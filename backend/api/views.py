from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from . import models, serializers, paginators


class ItemViewSet(ModelViewSet):
    queryset = models.Item.objects.all()
    serializer_class = serializers.ItemSerializer
    pagination_class = paginators.DefaultPagination

    @action(['GET'], False, 'search')
    def search(self, request):
        title = request.GET.get('title')
        categories = request.GET.get('categories')

        data = models.Item.objects.filter(title__icontains=title) if title else models.Item.objects.all()
        if categories:
            data = data.filter(categories__in=categories.split(','))

        paginator = self.pagination_class()
        data = self.serializer_class(paginator.paginate_queryset(data, request), many=True, context={'request': request}).data
        return paginator.get_paginated_response(data)


class CategoryViewSet(ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer


class ItemCategoryViewSet(ModelViewSet):
    queryset = models.ItemCategory.objects.all()
    serializer_class = serializers.ItemCategorySerializer

