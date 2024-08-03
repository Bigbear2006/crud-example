from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('items', views.ItemViewSet, 'items')
router.register('categories', views.CategoryViewSet, 'categories')
router.register('items-categories', views.ItemCategoryViewSet, 'items-categories')

urlpatterns = [
    path('', include(router.urls))
]
