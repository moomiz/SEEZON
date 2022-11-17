from django.db import models
from django.conf import settings
from movies.models import Movie

# Create your models here.
class Article(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.PROTECT, null=True, blank=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_articles', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# class Image(models.Model):
#     article = models.ForeignKey(Article, on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='diary', blank=True, null=True)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField(max_length=500)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_comments', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)