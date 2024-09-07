// URL de l'API REST Countries
const apiURL = 'https://restcountries.com/v3.1/all';

// Récupérer l'élément <select> dans le DOM
const countrySelect = document.getElementById('country');

// Fonction pour récupérer la liste des pays
function fetchCountries() {
    fetch(apiURL)
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(data => {
            // Trier les pays par nom
            const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

            // Ajouter chaque pays comme option dans le menu déroulant
            sortedCountries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common; // Valeur de l'option
                option.textContent = country.name.common; // Texte affiché dans le menu
                countrySelect.appendChild(option); // Ajouter l'option au menu déroulant
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des pays :', error);
        });
}

// Appeler la fonction pour peupler la liste des pays
fetchCountries();
