from flask import Flask

def create_app():
    app = Flask(__name__)

    # Charger la configuration
    app.config.from_pyfile('../config.py')

    # Importer les routes
    from .routes import main
    app.register_blueprint(main)

    return app
