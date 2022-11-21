from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('delete/', views.delete),
    path('<str:username>/', views.user_detail),
    path('update/<str:username>/', views.user_update),
    path('like/<int:user_pk>/', views.following)
]
