from flask import Flask

import secrets
def create_app():
    
    app = Flask(__name__)

    # Charger la configuration
    app.config.from_pyfile('../config.py')
    
    app.secret_key = secrets.token_hex(16)
    
    from .routes import main
    app.register_blueprint(main)

    return app