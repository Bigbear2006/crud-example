from django.db import models


class Item(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='items', null=True, default='items/default.png')
    categories = models.ManyToManyField('Category', 'items', through='ItemCategory')
    created_at = models.DateTimeField(auto_now_add=True)
    objects: models.Manager

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['id']


class Category(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    objects: models.Manager

    def __str__(self):
        return self.title


class ItemCategory(models.Model):
    item = models.ForeignKey(Item, models.CASCADE)
    category = models.ForeignKey(Category, models.CASCADE)
