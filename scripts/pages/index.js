// getPhotographerInfo renvoie un tableau d'objet avec les informations du fichier json dedans 
async function getPhotographersInfo(info) {
    
    const response = await fetch('data/photographers.json')
    const photographersInfo = await response.json()

    if( info == 'photographers'){
        return ({ photographers : photographersInfo['photographers'] })
    }

}


// displayData permet d'afficher l'article lie a chaque photographe qui a ete cree par photographerFactory
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// init permet de recuperer les informations des photographes et de les affichers avec displayData
async function init() {
    const { photographers } = await getPhotographersInfo('photographers');
    displayData(photographers);
}

// appel la function init 
init();
