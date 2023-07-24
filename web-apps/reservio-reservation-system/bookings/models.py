from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


# Create your models here.
class User(AbstractUser):
    pass


class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=1000)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.name}"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
        }


class Reservation(models.Model):
    service = models.ForeignKey(
        "Service", on_delete=models.CASCADE, db_constraint=False
    )
    reference = models.CharField(max_length=4, unique=True)
    email = models.EmailField()

    def __str__(self):
        return f"{self.email} for {self.service.name}"


DEFAULT_ID = 0000


class Day(models.Model):
    date = models.DateField()
    one = models.ForeignKey(
        "Reservation",
        on_delete=models.SET_NULL,
        blank=True,
        related_name="one",
        null=True,
        default=DEFAULT_ID,
        to_field="reference",
        db_constraint=False,
    )
    two = models.ForeignKey(
        "Reservation",
        on_delete=models.SET_NULL,
        blank=True,
        related_name="two",
        null=True,
        default=DEFAULT_ID,
        to_field="reference",
        db_constraint=False,
    )
    three = models.ForeignKey(
        "Reservation",
        on_delete=models.SET_NULL,
        blank=True,
        related_name="three",
        null=True,
        default=DEFAULT_ID,
        to_field="reference",
        db_constraint=False,
    )
    four = models.ForeignKey(
        "Reservation",
        on_delete=models.SET_NULL,
        blank=True,
        related_name="four",
        null=True,
        default=DEFAULT_ID,
        to_field="reference",
        db_constraint=False,
    )
    five = models.ForeignKey(
        "Reservation",
        on_delete=models.SET_NULL,
        blank=True,
        related_name="five",
        null=True,
        default=DEFAULT_ID,
        to_field="reference",
        db_constraint=False,
    )
    six = models.ForeignKey(
        "Reservation",
        on_delete=models.SET_NULL,
        blank=True,
        related_name="six",
        null=True,
        default=DEFAULT_ID,
        to_field="reference",
        db_constraint=False,
    )
    seven = models.ForeignKey(
        "Reservation",
        on_delete=models.SET_NULL,
        blank=True,
        related_name="seven",
        null=True,
        default=DEFAULT_ID,
        to_field="reference",
        db_constraint=False,
    )
    eight = models.ForeignKey(
        "Reservation",
        on_delete=models.SET_NULL,
        blank=True,
        related_name="eight",
        null=True,
        default=DEFAULT_ID,
        to_field="reference",
        db_constraint=False,
    )

    def __str__(self):
        return f"Day {self.date}"

    class Meta:
        ordering = ["-date"]  # Sort in desc order
        # constraints = [
        #     models.UniqueConstraint(
        #         fields=["one", "two", "three", "four", "five", "six", "seven", "eight"],
        #         name="unique-in-module",
        #     )
        # ]

    def serialize(self):
        try:
            one = self.one.reference
        except:
            one = "empty"
        try:
            two = self.two.reference
        except:
            two = "empty"
        try:
            three = self.three.reference
        except:
            three = "empty"
        try:
            four = self.four.reference
        except:
            four = "empty"
        try:
            five = self.five.reference
        except:
            five = "empty"
        try:
            six = self.six.reference
        except:
            six = "empty"
        try:
            seven = self.seven.reference
        except:
            seven = "empty"
        try:
            eight = self.eight.reference
        except:
            eight = "empty"

        return {
            "date": self.date,
            "one": one,
            "two": two,
            "three": three,
            "four": four,
            "five": five,
            "six": six,
            "seven": seven,
            "eight": eight,
        }
