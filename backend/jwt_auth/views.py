from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, RetrieveAPIView, CreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests

from . import models, serializers, utils


class GoogleLoginAPIView(GenericAPIView):
    serializer_class = serializers.UserSerializer

    def post(self, request: Request):
        token = request.data.get('token')
        if token is None:
            raise ValueError('invalid token')
        info = id_token.verify_oauth2_token(
            token, requests.Request(), settings.GOOGLE_CLIENT_ID, 1
        )
        try:
            user = models.User.objects.get(email=info['email'])
        except models.User.DoesNotExist:
            user = models.User.objects.create_user(
                username=utils.generate_username(info['email']),
                email=info['email'],
                password=utils.generate_password()
            )
        refresh = RefreshToken.for_user(user)
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})


class RegisterUserAPIView(CreateAPIView):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()


class UserInfoAPIView(RetrieveAPIView):
    serializer_class = serializers.UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class VerifyEmailAPIView(APIView):
    def get(self, request: Request):
        user_id = request.query_params.get('user_id', None)
        token = request.query_params.get('token', None)

        try:
            user = models.User.objects.get(id=user_id)
        except (IntegrityError, models.User.DoesNotExist):
            return Response({'error': 'invalid user id'}, 400)

        if token is None or not default_token_generator.check_token(user, token):
            return Response({'error': 'invalid token'}, 400)

        user.is_active = True
        user.save()
        return Response(status=204)


class CheckEmailAPIView(APIView):
    def get(self, request: Request):
        email = request.query_params.get('email')
        if email is None:
            return Response({'available': False}, 400)
        try:
            models.User.objects.get(email=email)
            return Response({'available': False}, 400)
        except models.User.DoesNotExist:
            return Response({'available': True}, 200)


class CheckUsernameAPIView(APIView):
    def get(self, request: Request):
        username = request.query_params.get('username')
        if username is None:
            return Response({'available': False}, 400)
        try:
            models.User.objects.get(username=username)
            return Response({'available': False}, 400)
        except models.User.DoesNotExist:
            return Response({'available': True}, 200)
