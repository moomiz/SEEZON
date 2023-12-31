from django.urls import path
from . import views

app_name = 'movies'

urlpatterns = [
    path('movies/', views.movie_list),
    path('movies/filter/<int:genre_pk>/', views.genre_filter),
    path('genres/', views.genre_list),
    path('movies/recommend/', views.recommend_movie_list),
    path('movies/recommend/today/', views.today_recommend_movie_list),
    path('movies/recommend/nobody/', views.nobody_recommend_movie_list),
    path('movies/recommend/user/', views.user_recommend_movie_list),
    path('movies/<int:pk>/', views.movie_detail),
    path('movies/<int:pk>/like/', views.movie_like),
    path('movies/<int:movie_pk>/review/<int:review_pk>/', views.movie_review),
    path('movies/<int:movie_pk>/reviewlist/', views.movie_review_list),
    path('movies/<int:movie_pk>/review/create/', views.review_create),
    path('movies/review/<int:pk>/like/', views.review_like),
]