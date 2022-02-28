async function getPhotographersInfo(info) {
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('data/photographers.json')
    const photographersInfo = await response.json()

    if( info == 'photographers'){
        return ({ photographers : photographersInfo['photographers'] })
    }

}



async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographersInfo('photographers');
    displayData(photographers);
};

init();
