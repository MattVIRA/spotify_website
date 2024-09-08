from flask import Blueprint, render_template, request, jsonify, current_app

import requests

from .utils import get_access_token, get_artist_top_tracks, get_artists_suggested

# Créer un blueprint
main = Blueprint('main', __name__)

# Route pour la page d'accueil
@main.route('/')
def accueil():
    return render_template('accueil.html')

@main.route('/top_tracks_artist')
def top_tracks_artist():
    return render_template('top_tracks_artist.html')

@main.route('/top_tracks_search')
def top_tracks_search():
    return render_template('top_tracks_search.html')

@main.route('/search')
def search():
    artiste_id = request.args.get('artiste_id')

    client_id = current_app.config.get('SPOTIFY_CLIENT_ID')
    client_secret = current_app.config.get('SPOTIFY_CLIENT_SECRET')

    if not client_id or not client_secret:
        return jsonify({'error': 'Client ID or Secret not configured.'}), 500

    try:
        access_token = get_access_token(client_id, client_secret)

        top_tracks = get_artist_top_tracks(access_token, artiste_id)

        return jsonify({'tracks': top_tracks})

    except Exception as e:
        return jsonify({'error': str(e)})


@main.route('/suggest_artists')
def suggest_artists():
    
    search_name = request.args.get('artiste')
    print('search_name', search_name)
    client_id = current_app.config.get('SPOTIFY_CLIENT_ID')
    client_secret = current_app.config.get('SPOTIFY_CLIENT_SECRET')

    if not client_id or not client_secret:
        return jsonify({'error': 'Client ID or Secret not configured.'}), 500


    try:
        access_token = get_access_token(client_id, client_secret)

        artists_suggested = get_artists_suggested(access_token, search_name)

        if not artists_suggested:
            return jsonify({'error': 'No artists found.'}), 404
        
        artists_suggested = get_artists_suggested(access_token, search_name)

        artists_data = []
        for artist in artists_suggested:
            artist_info = {
                'name': artist['name'],
                'id': artist['id'],
                'image_url': artist['images'][0]['url'] if artist['images'] else ''  # Utiliser la première image si elle existe
            }
            artists_data.append(artist_info)

        return jsonify({'artists_suggested': artists_data})
    

    except Exception as e:
        return jsonify({'error': str(e)}),500
