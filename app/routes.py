from flask import Blueprint, render_template, request, jsonify, current_app, redirect, url_for,session

import requests

import random
import string
import base64
from .utils import get_access_token, get_artist_top_tracks, get_artists_suggested, get_information_user

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

@main.route('/info_page')
def info_page():
    return render_template('info_page.html')

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
        return jsonify({'error': str(e)}), 500

def generate_random_string(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def get_spotify_auth_url(state):
    return (f"{current_app.config.get('SPOTIFY_AUTH_URL')}?response_type=code&"
            f"client_id={current_app.config.get('SPOTIFY_CLIENT_ID')}&"
            f"redirect_uri={current_app.config.get('SPOTIFY_REDIRECT_URI')}&"
            f"scope={current_app.config.get('SPOTIFY_SCOPES')}&"
            f"state={state}")

@main.route('/login')
def login():

    state = generate_random_string(16)
    session['state'] = state

    print(f"État stocké : {state}")

    return redirect(get_spotify_auth_url(state))

@main.route('/callback')
def callback():
    code = request.args.get('code')
    state = request.args.get('state')

    stored_state = session.get('state')

    print(f"État stocké : {stored_state}")
    print(f"État renvoyé : {state}")

    # if state != session.get('state'):
    #     return "Erreur : état non valide", 400

    auth_header = base64.b64encode(f"{current_app.config.get('SPOTIFY_CLIENT_ID')}:{current_app.config.get('SPOTIFY_CLIENT_SECRET')}".encode()).decode('ascii')
    token_data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': current_app.config.get('SPOTIFY_REDIRECT_URI')
    }

    token_headers = {
        'Authorization': f"Basic {auth_header}",
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    r = requests.post(current_app.config.get('SPOTIFY_TOKEN_URL'), data=token_data, headers=token_headers)
    token_response_data = r.json()

    if r.status_code == 200:
        access_token = token_response_data.get('access_token')
        session['access_token'] = access_token

        return redirect(url_for('main.info_page'))

    else:
        return f"Erreur lors de l'obtention du token : {token_response_data.get('error_description', 'Unknown error')}"
    

@main.route('/api/user_info', methods=['GET'])
def api_user_info():
    access_token = session.get('access_token')
    if not access_token:
        return "Utilisateur non authentifié", 401

    headers = {'Authorization': f"Bearer {access_token}"}
    params = {
        'limit': 10,
        'time_range':"short_term",
    }
    r = requests.get(current_app.config.get('SPOTIFY_USER_PROFILE_URL'), headers=headers, params=params)
    user_data = r.json()

    return user_data["items"]
