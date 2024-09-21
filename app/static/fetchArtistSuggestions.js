async function fetchArtistSuggestions() {

    const artiste_search = document.getElementById('artiste_search_input').value;

    try {
        const response = await fetch(`/suggest_artists?artiste=${encodeURIComponent(artiste_search)}`);
        const data = await response.json();
        console.log('Response data:', data);

        const suggestionsDiv = document.getElementById('artist-suggestions');
        suggestionsDiv.innerHTML = '';

        if (data.artists_suggested && data.artists_suggested.length > 0) {
            data.artists_suggested.forEach(artist => {
                const artistDiv = document.createElement('div');
                artistDiv.className = 'artist-item';

                const img = document.createElement('img');
                img.src = artist.image_url;
                img.alt = artist.name;
                img.className = 'artist-image';
                img.setAttribute('data-artist-id', artist.id);


                const name = document.createElement('p');
                name.textContent = artist.name;
                name.className = 'artist-name';

                artistDiv.appendChild(img);
                artistDiv.appendChild(name);
                artistDiv.onclick = () => selectArtist(artist.id, artist.name);

                suggestionsDiv.appendChild(artistDiv);
            });
        } else {
            suggestionsDiv.innerHTML = 'Aucun artiste trouvé.';
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des suggestions d\'artistes:', error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const artisteInput = document.getElementById('artiste_search_input');
    
    artisteInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            fetchArtistSuggestions();
        }
    });
});


function selectArtist(artistId, artistName) {
    // Supprimer la classe 'selected-artist' de tous les autres artistes
    const allArtists = document.querySelectorAll('.artist-item .artist-image');
    allArtists.forEach(img => img.classList.remove('selected-artist'));

    // Trouver l'image correspondant à l'artiste sélectionné par son ID et ajouter la classe 'selected-artist'
    const selectedArtistImg = document.querySelector(`img[data-artist-id="${artistId}"]`);
    if (selectedArtistImg) {
        selectedArtistImg.classList.add('selected-artist');
    }
    selectedArtist = {
        id: artistId,
        name: artistName,
        imageUrl: selectedArtistImg.src
    };

    console.log(`Artiste sélectionné : ${artistName} (ID: ${artistId})`);

}
