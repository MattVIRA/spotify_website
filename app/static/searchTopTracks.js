async function searchTopTracks() {
    // Récupération des valeurs des sélecteurs
    const year = document.getElementById('year').value;
    const country = document.getElementById('country').value;
    const genre = document.getElementById('genre').value;
    const artiste = document.getElementById('artiste').value;

    // if (!year || !country || !genre || !artiste) {
    //     alert('Veuillez sélectionner tous les critères.');
    //     return;
    // }

    try {
        const response = await fetch(`/search?year=${year}&country=${country}&genre=${genre}&artiste=${artiste}`);
        const data = await response.json();

        // Traitement des résultats
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (data.tracks && data.tracks.length > 0) {
            const ul = document.createElement('ul');
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

