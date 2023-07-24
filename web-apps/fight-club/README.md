# Fight Club

Fight Club is web application to log life events. It is created for people who want to break up with bad habits or addictions.
The technique to achieve it, is to acknowledge your mistakes, be conscious of them, see them, recognize patterns and celebrate streak. But remember, every day is the first day.
Every advice and input would be valuable to improve psychological techniques used. Please excuse me if some of this description will be long and not necessary but this is requirement to pass the check.

## Tech Stack

1. Based on the Flask framework
2. Python for backend
3. HTML+CSS+JS frontend styled with Bootstrap
4. Running on Gunicorn server
5. Chart JS for customized charts
6. SQLite database

## Lessons learned:

1. Understanding of HTTP routes
2. Introduction to the template system
3. Decorators in Flask
4. SQL queries
5. Implementing external functionality like Chart JS
6. Deploying into production with Gunicorn and Digital Ocean

## Screenshots

![App Screenshot](https://i.imgur.com/pFfawwA.png)
![App Screenshot](https://i.imgur.com/qCLSopE.png)
![App Screenshot](https://i.imgur.com/aUq2rCo.png)
![App Screenshot](https://i.imgur.com/2Wf2miE.png)
![App Screenshot](https://i.imgur.com/Ve7idYY.png)

## Installation

Run flask to start flask application

```bash
flask run
```

## Files & folders

### application.py
Main executable file made with Flask. There are modules for each function of the application this is:
1. Homepage - different view for logged / not logged user, quote with motivation and rules of fight club adapted and listed
2. Login - login screen, with username and password input.
Cookies are done on the server side.

3. Registration - registration form, user password is added to database in safe hashed form using werkzeug module
4. Fights - screen showing all the "fights" user did
5. Add Fight - here you can log a new fight, adding the Opponent Symbol, strength of urge, comments and timestamp
6. Stats - fights visualized on line chart made with Chart.js
7. Achievments - streak of the user counted from the last day when user had a fight with strength of more then 5 (what is literally lose of the fight in our model)
8. Setup - screen to display and setup opponents
9. Edit Account - change password screen
9. Log Out - screen allowing user to log out

### helpers.py
Contains helper functions:
1. Error generator
2. Login required decorator

### static folder
Contains CSS file, logo and favicon

### templates folder
Contains all HTML templates needed for Flask application

### fightclub.db
Database of the flie prepared in sqlite3
Contains three tables:
1. Users
2. Fights
3. Opponents

## Design

There are charts implemented with chart.js
https://www.chartjs.org/

Styling done with Bootstrap
https://getbootstrap.com/