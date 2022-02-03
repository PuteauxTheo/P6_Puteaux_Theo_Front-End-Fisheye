async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('data/photographers.json')
    const photographers = await response.json() 
    console.log(photographers)
    console.log(photographers['photographers'])
    return ({ photographers : photographers['photographers'] })

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
    console.log('init index est appele ? ')
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
