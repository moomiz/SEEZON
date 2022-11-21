from django.urls import path
from . import views

app_name = 'articles'

urlpatterns = [
    path('articles/', views.article_list),
    path('articles/<int:pk>/', views.article_detail),
    path('articles/create/', views.create),
    path('articles/<int:article_pk>/comment/<int:comment_pk>/', views.comment_detail),
    path('articles/<int:pk>/comment/create/', views.comment_create),
    path('articles/<int:article_pk>/like/', views.article_like),
    path('articles/comment/like/<int:comment_pk>/', views.comment_like),
    
]
