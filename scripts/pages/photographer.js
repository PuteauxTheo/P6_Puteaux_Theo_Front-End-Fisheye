// permet de recuperer l'url de la page 
const params = (new URL(document.location)).searchParams;
// permet de recuperer l'id notifier dans params
const id = params.get('id');

let totalLikes = 0;

//------- Get data from json files ---------//

// getPhotographerInfo renvoie un tableau d'objet avec les informations du fichier json dedans 

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

// displayDataInfo permet d'afficher la div contenant toutes les informations de presentation du photographe
async function displayDataInfo() {
    const { photographers } = await getPhotographersInfo('photographers');
    const photographHeader = document.querySelector(".photograph-header");
    photographers.forEach((photographer) => {
        if(photographer.id == id){
        // eslint-disable-next-line no-undef
        const photographerModel = photographerFactory(photographer);
        const photographerStat = document.querySelector(".photograph-stat");
        // eslint-disable-next-line no-undef
        const mediaStat = photographerFactory(photographer).getPhotographerStat();
        photographerStat.appendChild(mediaStat);
        const userPresentationCardDOM = photographerModel.getUserPresentationCardDOM();
        photographHeader.appendChild(userPresentationCardDOM);
        }
    });
}

//------- Display Media With Sort ---------//

const listbox = document.querySelector('.listbox');

//  lorsque on change est prit en compte, on appel ses deux fonctions pour afficher une nouvelle fois
// les informations avec la selection de la listbox
listbox.onchange = async function() { displayMedia(); displayLightBox()} ;

// displayMedia affiche toutes le contenu du photographe suivant le trie demande 
async function displayMedia() {
    photographMedia.innerHTML = "";
    const { medias } = await getPhotographersInfo('media');          
    let elSelect = listbox.value   
    // suivant l'element selectionne de la listbox, un cas est effectué pour trier medias                      
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
            // eslint-disable-next-line no-undef
            const mediaModel = mediaFactory(media);
            const mediaCardDOM = mediaModel.getMediaCardDOM();
            photographersMedia.appendChild(mediaCardDOM);
              
          }
      });
    
    var mediaArticle = document.querySelector(".photograph-media");
    
    
    for(let i = 0;i < mediaArticle.childNodes.length;i++){
        // cette partie de la boucle permet d'appliquer un appel de fonction a chaque click sur le contenu du photographe
        mediaArticle.childNodes[i].childNodes[0].addEventListener('click', function(){
            // eslint-disable-next-line no-undef
            currentSlide(i+1);            
            // eslint-disable-next-line no-undef
            openModalLightbox();
        });
        // cette partie de la boucle permet d'appliquer un appel de fonction a chaque enter sur le contenu du photographe focus
        mediaArticle.childNodes[i].childNodes[0].addEventListener('keypress', function(e){
            if(e.key ==='Enter'){
                // eslint-disable-next-line no-undef
                currentSlide(i+1);            
                // eslint-disable-next-line no-undef
                openModalLightbox();
            }
        });
        
    }
    
      // display of total for the first loading page 
    const idTotalLikes = document.getElementById('totalLikes')
    idTotalLikes.innerHTML = totalLikes;

      manageLikes();
}
//------- manage likes ---------//

// manageLikes permet de prendre en compte au click le like et le dislike
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

// displayLightBox permet d'ajouer tous le contenu dans la lightBox
async function displayLightBox() {
    const { medias } = await getPhotographersInfo('media');
    const slidesContent = document.querySelector(".slides-content");
    slidesContent.innerHTML = "";
    let elSelect = listbox.value
    // trier medias pour que la lightBox l'affiche dans l'ordre de l'affichage des medias 
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
        // eslint-disable-next-line no-undef
        const lightBoxModel = lightBox(media);
        const lightBoxDOM = lightBoxModel.getLightBoxDOM();
        lightBoxModalContent.appendChild(lightBoxDOM)
        }
    })
}

// init permet d'afficher les informations du photographe et d'afficher ses medias
async function init() {

    displayDataInfo();
    displayMedia();
    manageLikes();
    displayLightBox();
    
}

// appel la function init
init();
