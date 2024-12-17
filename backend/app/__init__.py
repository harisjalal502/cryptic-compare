from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register Blueprints
    from .routes import bp as routes_bp
    app.register_blueprint(routes_bp, url_prefix='/api')

    # Handle Errors
    from .errors import register_error_handlers
    register_error_handlers(app)

    return app
