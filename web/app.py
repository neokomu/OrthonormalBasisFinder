from flask import Flask
from routes.api import api_bp
from routes.pages import pages_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(api_bp, url_prefix="/api")
    app.register_blueprint(pages_bp)
    return app

if __name__ == "__main__":
    create_app().run(debug=True)