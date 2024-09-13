async function informations() {
    try {
        const response = await fetch(`/api/user_info`);
        const data = await response.json();
        console.log('Données utilisateur:', data);

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';  // Réinitialiser le contenu

        resultsDiv.style.display = 'block';

        // Initialiser l'indice
        let index = 1;

        data.forEach(track => {
            const trackDiv = document.createElement('div');
            trackDiv.className = 'track-item';

            // Créer une div pour l'indice
            const indexDiv = document.createElement('div');
            indexDiv.className = 'track-index';
            indexDiv.textContent = index;
            index++;

            // Créer l'image
            const img = document.createElement('img');
            img.src = track.album.images[1].url;
            img.alt = track.name;
            img.className = 'track-image';

            // Créer le texte
            let textContent = track.name;

            const name = document.createElement('p');
            name.className = 'track-name';

            // Ajouter les noms des artistes
            const artistNames = track.artists.map(artist => artist.name).join(', ');
            textContent += ` (${artistNames})`;
            name.textContent = textContent;

            // Ajouter les éléments au trackDiv
            trackDiv.appendChild(indexDiv);  // Ajouter l'indice avant l'image
            trackDiv.appendChild(img);
            trackDiv.appendChild(name);

            // Ajouter le trackDiv au resultsDiv
            resultsDiv.appendChild(trackDiv);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

