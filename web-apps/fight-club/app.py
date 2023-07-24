import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime, timedelta

from helpers import error, login_required

# startup flask app
app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"]

# ensure no cashing
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# configure session to use filesystem
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# plug in database to CS50 library
db = SQL("sqlite:///fightclub.db")


@app.route("/")
def default():

    # user visits homepage
    return render_template("index.html")


@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        username = request.form.get("username")
        password = request.form.get("password")

        # check if username is in database
        if (
            len(db.execute("SELECT username FROM users WHERE username = ?", username))
            != 1
        ):
            return error("Wrong username", 403)

        # check if hash matches
        row = db.execute("SELECT * FROM users WHERE username = ?", username)

        if not check_password_hash(row[0]["hash"], password):
            return error("Wrong password", 403)

        session["user_id"] = row[0]["id"]

        return redirect("/fights")

    else:
        return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        # check if username is blank
        if not username:
            return error("Must provide username", 400)

        # check if username already exists
        if db.execute("SELECT * FROM users WHERE username = ?", username):
            return error("Username is not availible", 400)

        # check if password is blank
        if not password:
            return error("Must provide password", 400)

        # check if passwords match
        if password != request.form.get("confirmation"):
            return error("Passwords does not match", 400)

        # generate hash
        passhash = generate_password_hash(
            password, method="pbkdf2:sha256", salt_length=2
        )

        # insert user into database
        db.execute(
            "INSERT INTO users (username, hash) VALUES (?, ?)", username, passhash
        )

        row = db.execute("SELECT * FROM users WHERE username = ?", username)

        # log in the user
        session["user_id"] = row[0]["id"]

        return redirect("/setup")

    # if reached via GET
    else:
        return render_template("register.html")


@app.route("/logout", methods=["GET", "POST"])
def logout():

    # forget user_id
    session.clear()

    return redirect("/")


@app.route("/fights")
@login_required
def fights():
    rows = db.execute(
        "SELECT * FROM fights WHERE user_id = ? ORDER BY timestamp", session["user_id"]
    )
    for row in rows:
        formatted = datetime.strptime(row["timestamp"], "%Y-%m-%dT%H:%M")
        formatted = formatted.strftime("%d %b - %H:%M")
        row["timestamp"] = formatted

    # add unique index to display in website
    counter = 1
    for row in rows:
        row["index"] = counter
        counter += 1

    return render_template("fights.html", rows=rows)


@app.route("/addfight", methods=["GET", "POST"])
@login_required
def addfight():
    if request.method == "POST":

        # get all the data from forms
        row = {}
        row["opponent"] = request.form.get("opponent")
        row["strength"] = request.form.get("strength")
        row["comments"] = request.form.get("comments")
        row["timestamp"] = request.form.get("timestamp")

        # insert into db
        db.execute(
            "INSERT INTO fights (user_id, timestamp, strength, opponent, comments) VALUES (?, ?, ?, ?, ?)",
            session["user_id"],
            row["timestamp"],
            row["strength"],
            row["opponent"],
            row["comments"],
        )

        return redirect("/fights")

    else:

        # get current opponents
        opponents = db.execute(
            "SELECT opponent FROM opponents WHERE user_id = ?", session["user_id"]
        )

        return render_template("addfight.html", opponents=opponents)


@app.route("/stats")
@login_required
def stats():
    rows = db.execute(
        "SELECT timestamp, strength FROM fights WHERE user_id = ? ORDER BY timestamp DESC",
        session["user_id"],
    )

    return render_template("stats.html", rows=rows)


@app.route("/achievments")
@login_required
def achievments():
    lost = db.execute(
        "SELECT timestamp FROM fights WHERE user_id = ? AND strength > 4 ORDER BY timestamp DESC LIMIT 1",
        session["user_id"],
    )
    first = db.execute(
        "SELECT timestamp FROM fights WHERE user_id = ? ORDER BY timestamp ASC LIMIT 1",
        session["user_id"],
    )
    if lost:
        row = lost[0]["timestamp"]
    else:
        row = first[0]["timestamp"]

    timestamp = datetime.strptime(row, "%Y-%m-%dT%H:%M").date()
    now = datetime.utcnow().date()
    delta = now - timestamp
    delta = str(delta).split()
    delta = int(delta[0])

    dataset = []

    for x in range(delta + 1):
        datarow = {}
        strdate = timestamp.strftime("%Y-%m-%d")
        datarow["timestamp"] = strdate
        datarow["streak"] = x
        dataset.append(datarow)
        timestamp = timestamp + timedelta(1)

    return render_template("achievments.html", rows=dataset, delta=delta)


@app.route("/setup", methods=["GET", "POST"])
@login_required
def setup():

    if request.method == "POST":
        newopponent = request.form.get("opponent")
        newdesc = request.form.get("desc")
        newbreakpoint = request.form.get("breakpoint")

        db.execute(
            "INSERT INTO opponents (user_id, opponent, description) VALUES (?, ?, ?)",
            session["user_id"],
            newopponent,
            newdesc,
        )

        return redirect("/setup")

    else:
        opponents = db.execute(
            "SELECT opponent, description FROM opponents WHERE user_id = ?",
            session["user_id"],
        )
        return render_template("setup.html", opponents=opponents)


@app.route("/editaccount", methods=["GET", "POST"])
@login_required
def editaccount():
    if request.method == "POST":
        # get pass
        password = request.form.get("password")

        # hash pass
        password = generate_password_hash(
            password, method="pbkdf2:sha256", salt_length=2
        )

        # add to users db
        db.execute(
            "UPDATE users SET hash = ? WHERE id = ?", password, session["user_id"]
        )

        return redirect("/fights")

    else:

        return render_template("editaccount.html")


@app.route("/delopponent", methods=["POST"])
@login_required
def delopponent():
    delopponent = request.form.get("delopponent")

    db.execute(
        "DELETE FROM opponents WHERE user_id = ? AND opponent = ?",
        session["user_id"],
        delopponent,
    )

    return redirect("/setup")


@app.route("/delfight", methods=["POST"])
@login_required
def delfight():
    fightid = request.form.get("delfight")

    db.execute("DELETE FROM fights WHERE id = ?", fightid)

    return redirect("/fights")


# added 4.2
if __name__ == "__main__":
    app.run(host="0.0.0.0")
