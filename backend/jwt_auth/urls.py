from django.urls import path
from rest_framework_simplejwt.views import token_obtain_pair, token_refresh
from . import views

urlpatterns = [
    path('user/register/', views.RegisterUserAPIView.as_view()),
    path('user/login/', token_obtain_pair),
    path('user/refresh-token/', token_refresh),
    path('user/verify-email/', views.VerifyEmailAPIView.as_view()),
    path('user/login/google/', views.GoogleLoginAPIView.as_view()),
    path('user/info/', views.UserInfoAPIView.as_view()),
    path('user/check-username/', views.CheckUsernameAPIView.as_view()),
    path('user/check-email/', views.CheckEmailAPIView.as_view()),
]
