from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User
from .utils import send_mail


@receiver(signal=post_save, sender=User)
def send_mail_after_create_user(instance: User, created, **kwargs):
    if created and not instance.is_active:
        send_mail(instance)
        print(f'mail sent to {instance}')
