from rest_framework.serializers import ModelSerializer

from .models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ('groups', 'user_permissions', 'last_login', 'is_superuser', 'is_active')
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'read_only': True},
            'date_joined': {'read_only': True},
        }

    def create(self, validated_data: dict):
        validated_data['is_active'] = False

        try:
            user = User.objects.get(email=validated_data['email'], is_active=False)
            user.delete()
        except User.DoesNotExist:
            pass

        return User.objects.create_user(
            validated_data.pop('username'),
            validated_data.pop('email'),
            validated_data.pop('password'),
            **validated_data
        )
