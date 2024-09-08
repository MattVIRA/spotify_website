async function searchTopTracks() {
    // Récupération des valeurs des sélecteurs
    // const year = document.getElementById('year').value;
    // const country = document.getElementById('country').value;
    // const genre = document.getElementById('genre').value;
    // if (!year || !country || !genre || !artiste) {
    //     alert('Veuillez sélectionner tous les critères.');
    //     return;
    // }

    if (!selectedArtist.id) {
        console.error('Aucun artiste sélectionné');
        return;
    }

    console.log(`Recherche des Top Tracks pour l'artiste : ${selectedArtist.name} (ID: ${selectedArtist.id})`);
    // /search?year=${year}&country=${country}&genre=${genre}&

    try {
        const response = await fetch(`/search?artiste_id=${selectedArtist.id}&artiste_name=${selectedArtist.name}`);

        const data = await response.json();
        // Traitement des résultats
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        resultsDiv.style.display = 'block';
        if (data.tracks && data.tracks.length > 0) {
            const ul = document.createElement('ul');
            console.log(selectedArtist.imageUrl);
            const img = document.createElement('img');
                img.src = selectedArtist.imageUrl;
                img.alt = selectedArtist.name;
                img.className = 'artist-image-results';

            
            const artistName = document.createElement('h2');
            artistName.textContent = selectedArtist.name; // Ajouter le nom de l'artiste
            artistName.style.color = 'white'; // Couleur du texte
            artistName.style.marginBottom = '10px'; // Ajouter un peu d'espace sous le nom

            // Ajouter le nom et l'image avant la liste des pistes
            resultsDiv.appendChild(artistName);
            resultsDiv.appendChild(img);

            data.tracks.forEach(track => {
                const li = document.createElement('li');
                li.textContent = `${track.name} - ${track.artist}`;
                ul.appendChild(li);
            });
            resultsDiv.appendChild(ul);
        } else {
            resultsDiv.textContent = 'Aucun résultat trouvé.';
        }
    } catch (error) {
        console.error('Erreur lors de la recherche des pistes:', error);
    }
}

