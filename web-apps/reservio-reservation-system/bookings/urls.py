from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("book", views.book, name="book"),
    path("cancel", views.cancel, name="cancel"),
    path("services", views.services, name="services"),
    path("dates", views.dates, name="dates"),
    path("salon", views.salon, name="salon"),
    path("login_view", views.login_view, name="login_view"),
    path("logout_view", views.logout_view, name="logout_view"),
]
