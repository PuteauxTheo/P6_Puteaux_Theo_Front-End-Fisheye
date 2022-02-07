const params = (new URL(document.location)).searchParams;
const id = params.get('id');


async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('data/photographers.json')
    const photographers = await response.json() 
    console.log(photographers)
    console.log(photographers['photographers'])
    console.log({ photographers : photographers['photographers'] })
    return ({ photographers : photographers['photographers'] })
  

};

async function getPhotographersMedia() {
    const response = await fetch('data/photographers.json')
    const photographersMedia = await response.json() 
    console.log(photographersMedia)
    console.log(photographersMedia['media'])
    console.log({ photographersMedia : photographersMedia['media'] })
    return photographersMedia['media'] ;
};


async function displayDataInfo(photographers) {
    const photographHeader = document.querySelector(".photograph-header");
    console.log(photographers);
    photographers.forEach((photographer) => {
        if(photographer.id == id){
        console.log(photographer)
        console.log(photographer.id)
        const photographerModel = photographerFactory(photographer);
        const userPresentationCardDOM = photographerModel.getUserPresentationCardDOM();
        photographHeader.appendChild(userPresentationCardDOM);
        }
    });
};

async function displayMedia(medias) {
      const photographersMedia = document.querySelector(".photograph-media");
      console.log(medias);
        medias.forEach((media) => {
          if(media.photographerId == id){
              console.log(media);
              console.log(media.photographerId);
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
