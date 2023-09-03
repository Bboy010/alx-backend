#!/usr/bin/env python3
"""Flask app"""

from flask import Flask, render_template
from flask_babel import Babel  # Import Babel

app = Flask(__name__)
babel = Babel(app)  # Instantiate Babel and associate it with the app


class Config(object):
    """Config class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'  # Set default locale to 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'  # Set default timezone to 'UTC'


app.config.from_object(Config)  # Use the Config class as config for the app


@app.route('/', strict_slashes=False)
def index():
    """index method"""
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(debug=True)
