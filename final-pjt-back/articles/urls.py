from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('articles/', views.article_list),
    path('articles/<int:pk>/', views.article_detail),
]
