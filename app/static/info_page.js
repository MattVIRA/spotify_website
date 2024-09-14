// Variable globale pour stocker l'élément sélectionné
let selectedUserItem = {
    value: 'tracks' // La valeur sera soit 'tracks' soit 'artists'
};

// Fonction qui détermine si l'utilisateur a sélectionné Tracks ou Artists
function selectItemType(itemType) {
    selectedUserItem.value = itemType;

    const trackChoice = document.querySelector('.choice-container .choice-box:nth-child(1)'); // Le premier bouton (Tracks)
    const artistChoice = document.querySelector('.choice-container .choice-box:nth-child(2)'); // Le deuxième bouton (Artists)
    
    trackChoice.classList.remove('selected');
    artistChoice.classList.remove('selected');
    // Appeler la fonction appropriée selon le choix de l'utilisateur
    if (itemType === 'tracks') {
        
        track_informations(); // Charger les informations des tracks
        trackChoice.classList.add('selected');
    } else if (itemType === 'artists') {
        artists_informations(); // Charger les informations des artistes
        artistChoice.classList.add('selected');
    }
}

// Ajouter les listeners sur les boutons "Tracks" et "Artists"
document.addEventListener('DOMContentLoaded', function() {
    const trackChoice = document.querySelector('.choice-container .choice-box:nth-child(1)'); // Le premier bouton (Tracks)
    const artistChoice = document.querySelector('.choice-container .choice-box:nth-child(2)'); // Le deuxième bouton (Artists)
    
    // Event listener pour le bouton "Tracks"
    trackChoice.addEventListener('click', function() {
        selectItemType('tracks'); // Définir la sélection à "tracks"
    });
    
    // Event listener pour le bouton "Artists"
    artistChoice.addEventListener('click', function() {
        selectItemType('artists'); // Définir la sélection à "artists"
    });
});

// Fonction pour charger les informations des tracks (déjà existante)
async function track_informations() {
    try {
        const response = await fetch(`/api/user_info_tracks`);
        const data = await response.json();

        const leftColumn = document.getElementById('left-column');
        const rightColumn = document.getElementById('right-column');

        leftColumn.innerHTML = '';
        rightColumn.innerHTML = '';

        document.getElementById('results').style.display = 'flex';

        const firstFive = data.slice(0, 5);
        const lastFive = data.slice(-5);

        let index = 1;

        firstFive.forEach((track, i) => {
            const trackElement = createTrackElement(track, i + 1);
            leftColumn.appendChild(trackElement);
        });

        lastFive.forEach((track, i) => {
            const trackElement = createTrackElement(track, data.length - 4 + i);
            rightColumn.appendChild(trackElement);
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Fonction pour charger les informations des artistes
async function artists_informations() {
    try {
        const response = await fetch(`/api/user_info_artists`);
        const data = await response.json();

        const leftColumn = document.getElementById('left-column');
        const rightColumn = document.getElementById('right-column');

        leftColumn.innerHTML = '';
        rightColumn.innerHTML = '';

        document.getElementById('results').style.display = 'flex';

        const firstFive = data.slice(0, 5);
        const lastFive = data.slice(-5);

        let index = 1;

        firstFive.forEach((artist, i) => {
            const artistElement = createArtistElement(artist, i + 1);
            leftColumn.appendChild(artistElement);
        });

        lastFive.forEach((artist, i) => {
            const artistElement = createArtistElement(artist, data.length - 4 + i);
            rightColumn.appendChild(artistElement);
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Fonction utilitaire pour créer un élément d'affichage de track (existant)
function createTrackElement(track, index) {
    const trackDiv = document.createElement('div');
    trackDiv.className = 'track-item';

    const indexDiv = document.createElement('div');
    indexDiv.className = 'track-index';
    indexDiv.textContent = index + ')';

    const img = document.createElement('img');
    img.src = track.album.images[1].url;
    img.alt = track.name;
    img.className = 'track-image';

    const name = document.createElement('p');
    name.className = 'track-name';
    const artistNames = track.artists.map(artist => artist.name).join(' - ');
    name.textContent = `${track.name} (${artistNames})`;

    trackDiv.appendChild(indexDiv);
    trackDiv.appendChild(img);
    trackDiv.appendChild(name);

    trackDiv.onclick = () => redirectToItem(track);

    return trackDiv;
}

// Fonction utilitaire pour créer un élément d'affichage d'artiste (similaire à track)
function createArtistElement(artist, index) {
    const artistDiv = document.createElement('div');
    artistDiv.className = 'track-item';

    const indexDiv = document.createElement('div');
    indexDiv.className = 'track-index';
    indexDiv.textContent = index + ')';

    const img = document.createElement('img');
    img.src = artist.images[1].url;
    img.alt = artist.name;
    img.className = 'track-image';

    const name = document.createElement('p');
    name.className = 'track-name';
    name.textContent = artist.name;

    artistDiv.appendChild(indexDiv);
    artistDiv.appendChild(img);
    artistDiv.appendChild(name);

    artistDiv.onclick = () => redirectToItem(artist);

    return artistDiv;
}

// Fonction de redirection vers un artiste
function redirectToItem(item) {
    window.open(item.external_urls.spotify, '_blank');
}
