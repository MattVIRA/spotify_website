from flask import Blueprint, render_template, request, jsonify, current_app

import requests

from .utils import get_access_token, get_artist_top_tracks

# Créer un blueprint
main = Blueprint('main', __name__)

# Route pour la page d'accueil
@main.route('/')
def index():
    return render_template('index.html')

@main.route('/accueil')
def accueil():
    return render_template('accueil.html')

@main.route('/search')
def search():
    year = request.args.get('year')
    country = request.args.get('country')
    genre = request.args.get('genre')
    artiste_name = request.args.get('artiste')

    client_id = current_app.config.get('SPOTIFY_CLIENT_ID')
    client_secret = current_app.config.get('SPOTIFY_CLIENT_SECRET')

    if not client_id or not client_secret:
        return jsonify({'error': 'Client ID or Secret not configured.'}), 500

    print(f"Year: {year}, Country: {country}, Genre: {genre}")
    print(f"artist: {artiste_name}")

    try:
        access_token = get_access_token(client_id, client_secret)
        print(access_token)

        top_tracks = get_artist_top_tracks(access_token, artiste_name)

        return jsonify({'tracks': top_tracks})

    except Exception as e:
        return jsonify({'error': str(e)})

