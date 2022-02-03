async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('data/photographers.json')
    const photographers = await response.json() 
    console.log(photographers)
    console.log(photographers['photographers'])
    return ({ photographers : photographers['photographers'] })
  

}



async function displayDataInfo(photographers) {
    const photographersHeader = document.querySelector(".photograph-header");
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id');
    console.log(id);
    photographers.forEach((photographer) => {
        if(photographer.id == id){
        console.log(photographer)
        console.log(photographer.id)
        const photographerModel = photographerFactory(photographer);
        const userPresentationCardDOM = photographerModel.getUserPresentationCardDOM();
        photographersHeader.appendChild(userPresentationCardDOM);
        }
    });
};

async function init() {
    // Récupère les datas des photographes
    console.log('init est appele ? ');
    const { photographers } = await getPhotographers();
    displayDataInfo(photographers);
};

init();
