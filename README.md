# Spotistat Web Application

## Description
This project is a web application built using the Flask framework. 
It collect the data through the Spotify API (cf [documentation](https://developer.spotify.com/documentation/web-api) here).

It's my first project with flask.
Flask is a lightweight WSGI web application framework in Python that is easy to set up and extend.

## Features
- Get the TOP tracks of an artist
- Get you TOP tracks (1 or 4 weeks)

## Planned Features
- User authentication (login and registration)
- Dynamic content rendering using Jinja2 templates
- Integration with a database (SQLite/MySQL/PostgreSQL)
- API endpoints for data interaction
- Modular and scalable structure

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- (Optional) A virtual environment tool like `venv` or `virtualenv`

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate

2. Create the virutal environement 
    Use the .requirement.txt : 
    pip install -r requirements.txt

3. Set environment variables:
    Create a config.py and initiate your API credientials
    SPOTIFY_CLIENT_ID
    SPOTIFY_CLIENT_SECRET

4. Launch the  main.py