const params = (new URL(document.location)).searchParams;
const id = params.get('id');
let totalLikes = 0;

//------- Get data from json files ---------//

async function getPhotographersInfo(info){
    const response = await fetch('data/photographers.json')
    const photographersInfo = await response.json()

    if( info == 'photographers'){
        return ({ photographers : photographersInfo['photographers'] })
    }

    if( info == 'media'){
        return ({ medias : photographersInfo['media'] });
    }
}

//------- Display Info Photograph ---------//

const photographMedia = document.querySelector(".photograph-media")

async function displayDataInfo() {
    const { photographers } = await getPhotographersInfo('photographers');
    const photographHeader = document.querySelector(".photograph-header");
    photographers.forEach((photographer) => {
        if(photographer.id == id){
        const photographerModel = photographerFactory(photographer);
        const photographerStat = document.querySelector(".photograph-stat");
        const mediaStat = photographerFactory(photographer).getPhotographerStat();
        photographerStat.appendChild(mediaStat);
        const userPresentationCardDOM = photographerModel.getUserPresentationCardDOM();
        photographHeader.appendChild(userPresentationCardDOM);
        }
    });
};

//------- Display Media With Sort ---------//

const listbox = document.querySelector('.listbox');
listbox.onchange = async function() { displayMedia(); displayLightBox()} ;

async function displayMedia() {
    photographMedia.innerHTML = "";
    const { medias } = await getPhotographersInfo('media');
    let elSelect = listbox.value
    switch(elSelect){
        case "Popularité":
            // trier par popularite
            medias.sort(function(a,b){
                return b.likes - a.likes;
            });
            break;
        case "Date":
            // trier par date
            medias.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            break;
        case "Titre":
            //trier par titre
            medias.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            medias.sort(function(a,b){
                return b.likes - a.likes;
            });
            break;

    }
      const photographersMedia = document.querySelector(".photograph-media");
      

        medias.forEach((media) => {
          if(media.photographerId == id){
            
            totalLikes += media.likes
            const mediaModel = mediaFactory(media);
            const mediaCardDOM = mediaModel.getMediaCardDOM();
            photographersMedia.appendChild(mediaCardDOM);
              
          }
      });
        var mediaArticle = document.querySelector(".photograph-media");
      
        for(let i = 0;i < mediaArticle.childNodes.length;i++){
            mediaArticle.childNodes[i].childNodes[0].addEventListener('click', function(){
                currentSlide(i+1);            
                openModalLightbox();
        });
    };
      
      // display of total for the first loading page 
    const idTotalLikes = document.getElementById('totalLikes')
    idTotalLikes.innerHTML = totalLikes;

      manageLikes();
};
//------- manage likes ---------//

async function manageLikes(){
    const heartFull =  document.querySelectorAll(".heart-full")
    const heartEmpty = document.querySelectorAll(".heart-empty")
    const idTotalLikes = document.getElementById('totalLikes')
    
    heartEmpty.forEach(e => {
        e.addEventListener('click', function(){
            
            let nbLikes = e.parentElement.parentElement.childNodes[0].textContent
            nbLikes ++;
            totalLikes ++;
            idTotalLikes.textContent = totalLikes
            e.parentElement.parentElement.childNodes[0].textContent = nbLikes; 
            e.style.display = 'none'
            e.parentElement.childNodes[1].style.display = 'block'
            
        })
    })

    heartFull.forEach(e => {
        e.addEventListener('click', function(){
            let nbLikes = e.parentElement.parentElement.childNodes[0].textContent
            nbLikes --;
            totalLikes --;
            idTotalLikes.textContent = totalLikes
            e.parentElement.parentElement.childNodes[0].textContent = nbLikes; 
            e.style.display = 'none'
            e.parentElement.childNodes[3].style.display = 'block'
        })
    })
    
}
// ------------- display light box ------------//

async function displayLightBox() {
    const { medias } = await getPhotographersInfo('media');
    const slidesContent = document.querySelector(".slides-content");
    slidesContent.innerHTML = "";
    let elSelect = listbox.value
    switch(elSelect){
        case "Popularité":
            // trier par popularite
            medias.sort(function(a,b){
                return b.likes - a.likes;
            });
            break;
        case "Date":
            // trier par date
            console.log("rentrer dans date")
            medias.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            break;
        case "Titre":
            //trier par titre
            console.log("rentrer dans titre")
            // medias.sort(function(a,b){
            //     return a.title - b.title;
            // })
            medias.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            medias.sort(function(a,b){
                return b.likes - a.likes;
            });
            break;

    }
    const lightBoxModalContent = document.querySelector(".slides-content")
    medias.forEach(media => {
        if(media.photographerId == id){
        const lightBoxModel = lightBox(media);
        const lightBoxDOM = lightBoxModel.getLightBoxDOM();
        lightBoxModalContent.appendChild(lightBoxDOM)
        }
    })
}

async function init() {
    // Récupère les datas des photographes
    
    displayDataInfo();
    displayMedia();
    manageLikes();
    displayLightBox();
    
};

init();
