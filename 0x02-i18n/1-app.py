#!/usr/bin/env python3

from flask import Flask, render_template
from flask_babel import Babel  # Import Babel

app = Flask(__name__)
babel = Babel(app)  # Instantiate Babel and associate it with the app

class Config:
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'  # Set default locale to 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'  # Set default timezone to 'UTC'

app.config.from_object(Config)  # Use the Config class as config for the app

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
