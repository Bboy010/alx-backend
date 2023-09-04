#!/usr/bin/env python3

""" Task 7. Infer appropriate time zone"""

import pytz
from flask import Flask, render_template, request, g
from flask_babel import Babel, format_datetime
from typing import Union, Dict


class Config:
    """Available languages configuration class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> Union[Dict, None]:
    """Returns user dictionary or None"""
    id = request.args.get('login_as')
    if id:
        return users.get(int(id))
    return None


@app.before_request
def before_request() -> None:
    """Use get_user to find a user if any"""
    user = get_user()
    g.user = user


@babel.localeselector
def get_locale() -> str:
    """Get locale"""
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    if g.user and g.user.get('locale') in app.config['LANGUAGES']:
        return g.user.get('locale')
    header_locale = request.headers.get('locale')
    if header_locale in app.config['LANGUAGES']:
        return header_locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])

# @babel.timezoneselector
# def get_timezone() -> str:
#     """Get timezone"""
#     timezone = request.args.get('timezone','').strip()
#     if not timezone and g.user:
#         timezone = g.user.get('timezone')
#     try :
#         return pytz.timezone(timezone).zone
#     except pytz.exceptions.UnknownTimeZoneError:
#         return app.config['BABEL_DEFAULT_TIMEZONE']


@app.route('/', strict_slashes=False)
def index():
    """returns a template"""
    g.time = format_datetime()
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
