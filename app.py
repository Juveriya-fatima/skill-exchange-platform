from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("login.html")

@app.route("/signup")
def signup():
    return render_template("signup.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/matches")
def matches():
    return render_template("matches.html")

@app.route("/requests")
def requests():
    return render_template("requests.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")

@app.route("/chat")
def chat():
    return render_template("chat.html")

@app.route("/view-profile")
def view_profile():
    return render_template("view-profile.html")

if __name__ == "__main__":
    app.run(debug=True)