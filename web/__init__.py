from flask import Flask
from web.routes.api import api_bp
from web.routes.pages import pages_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(api_bp, url_prefix="/api")
    app.register_blueprint(pages_bp)
    return app

def main():
    create_app().run(debug=True)
    
if __name__ == "__main__":
    main();

