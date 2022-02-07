const params = (new URL(document.location)).searchParams;
const id = params.get('id');


async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('data/photographers.json')
    const photographers = await response.json()
    return ({ photographers : photographers['photographers'] })
  

};

async function getPhotographersMedia() {
    const response = await fetch('data/photographers.json')
    const photographersMedia = await response.json()
    return photographersMedia['media'] ;
};


async function displayDataInfo(photographers) {
    const photographHeader = document.querySelector(".photograph-header");
    photographers.forEach((photographer) => {
        if(photographer.id == id){
        const photographerModel = photographerFactory(photographer);
        const userPresentationCardDOM = photographerModel.getUserPresentationCardDOM();
        photographHeader.appendChild(userPresentationCardDOM);
        }
    });
};

async function displayMedia(medias) {
      const photographersMedia = document.querySelector(".photograph-media");
        medias.forEach((media) => {
          if(media.photographerId == id){
              const mediaModel = mediaFactory(media);
              const mediaCardDOM = mediaModel.getMediaCardDOM();
              photographersMedia.appendChild(mediaCardDOM);
          }
      });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const medias = await getPhotographersMedia();
    displayDataInfo(photographers);
    displayMedia(medias);
};

init();
