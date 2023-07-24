import logging
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
import datetime
import string
import random
from .models import *


logger = logging.getLogger(__name__)


def ref_generator(size=4, chars=string.ascii_uppercase + string.digits):
    return "".join(random.choice(chars) for _ in range(size))


# Create your views here.
def index(request):
    return render(request, "bookings/index.html")


def book(request):
    if request.method == "POST":
        data = json.loads(request.body)
        service_id = data.get("service_id", "")
        date = data.get("date", "")
        slot = data.get("slot", "")
        email = data.get("email", "")
        logger.error(email)
        logger.error(date)

        service = Service.objects.get(id=service_id)
        logger.error(service)

        ref = ref_generator()
        # check if this reference exists
        while Reservation.objects.filter(reference=ref).exists():
            ref = ref_generator()

        reservation = Reservation(service=service, reference=ref, email=email)
        reservation.save()

        day = Day.objects.get(date=date)
        setattr(day, slot, reservation)
        logger.error(day)
        logger.error(slot)
        logger.error(reservation)
        day.save()

        return JsonResponse(ref, safe=False)
    else:
        return render(request, "bookings/book.html")


def cancel(request):
    if request.method == "POST":
        data = json.loads(request.body)
        ref = data.get("reference", "")

        logger.error(ref)

        try:
            reservation = Reservation.objects.get(reference=ref)
            response = {
                "service": reservation.service.name,
            }
            response = json.dumps(response)

        except:
            response = "Not found"

        return JsonResponse(response, safe=False)

    elif request.method == "PUT":
        data = json.loads(request.body)
        ref = data.get("reference", "")

        # delete reservation
        reservation = Reservation.objects.get(reference=ref)
        reservation.delete()

        logger.error("Day slot emptied")

        return HttpResponse("OK")
    else:
        return render(request, "bookings/cancel.html")


def services(request):
    services = Service.objects.all()
    return JsonResponse([service.serialize() for service in services], safe=False)


def dates(request):
    # generate rows for next 30 days
    # get today date
    today = datetime.date.today()
    enddate = today + datetime.timedelta(days=29)

    # loop 30 times and check if row exists in db
    # TODO filter to show only future
    for x in range(30):
        date = today + datetime.timedelta(days=x)

        # if not create empty row with correct date
        if not Day.objects.filter(date=date).exists():
            day = Day(date=date)
            day.save()

    # output all future and today objects
    days = Day.objects.filter(date__range=[today, enddate]).order_by("date")

    # prepare JSON response

    return JsonResponse([day.serialize() for day in days], safe=False)


def salon(request):
    return render(request, "bookings/salon.html")


def login_view(request):
    if request.method == "POST":
        logger.error("LOGIN")
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("salon"))
        else:
            return render(
                request,
                "bookings/login.html",
                {"message": "Invalid username and/or password."},
            )
    else:
        return render(request, "bookings/login.html")


def logout_view(request):
    logger.error("LOGOUT")
    logout(request)
    return HttpResponseRedirect(reverse("index"))
