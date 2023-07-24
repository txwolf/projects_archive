## Preface

This is my second bigger project - beauty salon booking application - was finished in Django.

Sepcification:
1. Build on Django framework
2. SQLite database
3. HTML+CSS+JavaScript on the frontend
4. Single page view in the whole booking and cancellation process
5. Mobile responsive

Lessons learned:
1. Construction of more comlicated single page views with pure JS is quickly starting to get messy - after this project I have jumped straight into learning frontend JS frameworks
2. Booking and scheduling systems are very challanging to construct - for the future its better to use external API solutions
3. Deployment of Django app to production

# Icon Beauty Booking System

Beauty Salon Booking App allows the customers choosing the service needed, viewing availible dates, review their booking details and finally book an real appointment.

After the booking, customer have an option to retrive his booking and cancel it.

Beauty Salon can also highly benefit from this software - salon owner can view their calendar, add a new booking for customer manually or cancel a booking as well.

## Screenshots

![App Screenshot](https://i.imgur.com/pNoEfpK.png)
![App Screenshot](https://i.imgur.com/cCS3xxg.png)
![App Screenshot](https://i.imgur.com/I1Fftea.png)
![App Screenshot](https://i.imgur.com/vW28Z6k.png)
![App Screenshot](https://i.imgur.com/AGxVOlZ.png)

## Deployment

Create a virtual environment to install dependencies in and activate it:

```bash
$ virtualenv2 --no-site-packages env
$ source env/bin/activate
```

Then install the dependencies:

```bash
(env)$ pip install -r requirements.txt
```

Note the (env) in front of the prompt. This indicates that this terminal session operates in a virtual environment set up by virtualenv2.

Once pip has finished downloading the dependencies:

```bash
(env)$ cd project
(env)$ python manage.py runserver
```

And navigate to http://127.0.0.1:8000/.

## Lessons Learned

- Frontend / Backend communication
- JavaScript
- Django Models and relationships
- Scheduling logic - very challanging part
- Bootstrap

## Distinctiveness and Complexity:

### Complexity
I believe my Booking App project is complex enough because of:
1. The many options customer and user have - book, view the calendar, cancel
2. Everyone who did scheduling applications, knows how complex and troublesome are scheduling solutions, I am very proud to achieve simple and easy solution for customers of the application.
3. Complexity of scheduling app
4. JavaScript frontend solutions to give customer feeling of application, not the website

### Distinctiveness
Booking app has nothing in common with the apps done previously in the course like Network, Mail or Commerce. Its inspired by some of the elements, but it was invented from scratch.


## Folder structure & important files

### File tree

```http
.
├── bookings                   # Main module of the application
    ├── migrations             # Migartion files of Django Models
    ├── static                 # Static JS and CSS files
    ├── templates              # HTML Templates
    ├── admin.py               # Admin Settings
    ├── apps.py                # Applications Settings
    ├── models.py              # Models Setup
    ├── test.py                # Tests
    ├── urls.py                # Routing of URLs
    └── views.py               # Controller of views
├── capstone  
    ├── settings.py            # Main Settings Area
    ├── urls.py                # Main URLs setup
    └── ...                
├── env                     
├── .gitignore                    
├── db.sqlite3                 # Database File
├── requirements.txt
└── README.md
```

### views.py

#### Reference number generator

Function to create reference number as needed, example: B5TR

```py
def ref_generator(size=4, chars=string.ascii_uppercase + string.digits):
    return "".join(random.choice(chars) for _ in range(size))
```

#### Book view

Function to create a booking based on data received by POST request from JS.
In the process of booking on Django side, the reference number is generated and send back to front end.

Booking is done in two steps:
1. Booking creating
2. Assigning this booking to chosen slot on chosen day.

#### Cancel view

Function that is called by JS fetch, is removing the reservation based on the reference number from database. Booking slot is being automatically cleared out based on the model setup.

#### Services function

Helper to load available services and send back JSON response to caller.

#### Dates view

Helper to load array of objects, containing schedule for next 30 days in form:

```py
day = {
  date: 1/1/2022
  one: empty        # default for empty slot
  two: BN76         # booking reference for reservation
  [...eight slots in total..]
}
```








