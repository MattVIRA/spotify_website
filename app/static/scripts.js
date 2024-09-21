let selectedArtist = {
    id: null,
    name: null,
    imageUrl: null
};


// On récupère les éléments
const homeButton = document.querySelector('.home-button');
const homeIcon = document.querySelector('.logo-home');

// Utilisation de getBoundingClientRect pour obtenir la taille de l'élément
const rect = homeIcon.getBoundingClientRect();

homeButton.addEventListener('mouseover', () => {
    homeButton.style.width = '150px'; // Largeur de la div pour montrer le texte, ajustable selon besoin
    // Appliquer l'opacité ou autre style au texte à dérouler si nécessaire
    if (!document.querySelector('.home-text')) {
    // Créer une nouvelle div
    const homeTextDiv = document.createElement('div');
    homeTextDiv.classList.add('home-text');
    homeTextDiv.innerText = 'HOME';
    // Ajoute la div au bouton
    homeButton.appendChild(homeTextDiv);
}
});

// Fonction pour enrouler le texte à la sortie de la souris
homeButton.addEventListener('mouseout', () => {
    const homeTextDiv = document.querySelector('.home-text');
    if (homeTextDiv) {
        homeTextDiv.remove(); // Supprime la div
    }

    // Utiliser la valeur récupérée pour remettre la taille initiale
    homeButton.style.width = `${rect.width}px`; // Rétrécir la div pour cacher le texte
    
});

