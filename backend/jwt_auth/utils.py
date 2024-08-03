import string
from random import sample

from django.contrib.auth.tokens import default_token_generator
from django.conf import settings

from .models import User


def generate_username(email: str):
    return f'{email.split("@")[0]}-{"".join(sample(string.ascii_letters + string.digits, 6))}'


def generate_password():
    return ''.join(sample(string.ascii_letters + string.digits + string.punctuation, 12))


def send_mail(user: User):
    token = default_token_generator.make_token(user)
    url = f'{settings.VERIFY_EMAIL_URL}?user_id={user.pk}&token={token}'
    msg = f'Чтобы завершить регистрацию на сайте, перейдите по ссылке: <a href="{url}">{url}</a>'
    user.email_user('Активация аккаунта', '', html_message=msg)
