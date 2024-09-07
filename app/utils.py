import base64
import requests

def get_access_token(client_id, client_secret):
    auth_string = f"{client_id}:{client_secret}"
    b64_auth_string = base64.b64encode(auth_string.encode()).decode()

    headers = {
        'Authorization': f'Basic {b64_auth_string}',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    data = {
        'grant_type': 'client_credentials'
    }

    response = requests.post('https://accounts.spotify.com/api/token', headers=headers, data=data)
    response_data = response.json()
    return response_data['access_token']

def search_artist(access_token, artist_name):
    search_url = f'https://api.spotify.com/v1/search'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    params = {
        'q': artist_name,
        'type': 'artist',
        'limit': 1
    }
    
    response = requests.get(search_url, headers=headers, params=params)
    search_results = response.json()
    # Extraire l'ID de l'artiste
    artists = search_results.get('artists', {}).get('items', [])

    if artists:
        return artists[0]['id']
    return None


def get_artist_top_tracks(access_token, artist_name, country_code='US'):
    artist_id = search_artist(access_token, artist_name)
    top_tracks_url = f'https://api.spotify.com/v1/artists/{artist_id}/top-tracks'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    params = {
        'market': country_code
    }
    
    response = requests.get(top_tracks_url, headers=headers, params=params)
    tracks = response.json()
    
    top_tracks = []
    for track in tracks.get('tracks', []):
        top_tracks.append({
            'name': track['name'],
            'artist': track['artists'][0]['name'],
            'url': track['external_urls']['spotify']
        })
    
    return top_tracks

def get_artists_suggested(access_token, search_name):
    search_url = f'https://api.spotify.com/v1/search'
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }

    params = {
        'q': search_name,
        'type': 'artist',
        'limit': 3
    }

    response = requests.get(search_url, headers=headers, params=params)

    request_results = response.json()

    artists = request_results.get('artists', {}).get('items', [])

    return artists

