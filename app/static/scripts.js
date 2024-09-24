let selectedArtist = {
    id: null,
    name: null,
    imageUrl: null
};

document.addEventListener('DOMContentLoaded', function() {
    const logoSpotistat = document.querySelector('.logo-spotistat');
    
    // Ajouter un listener pour le clic
    if (logoSpotistat) {
        logoSpotistat.addEventListener('click', function() {
            // Récupérer l'URL depuis l'attribut data-url
            const urlAccueil = logoSpotistat.getAttribute('data-url');
            // Redirection vers la page d'accueil
            window.location.href = urlAccueil;
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const about = document.querySelector('.about');
    
    // Ajouter un listener pour le clic
    if (about) {
        about.addEventListener('click', function() {
            // Récupérer l'URL depuis l'attribut data-url
            const urlPortfolio = about.getAttribute('data-url');
            // Redirection vers la page d'accueil
            window.location.href = urlPortfolio;
        });
    }
});



document.addEventListener('DOMContentLoaded', (event) => {
    const functionalityInput = document.getElementById('search_bar');
    
    functionalityInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log(document.getElementById('search_bar').value);
        }
    });
});

