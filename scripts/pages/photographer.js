const params = (new URL(document.location)).searchParams;
const id = params.get('id');
let totalLikes = 0;

//------- Get data from json files ---------//

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('data/photographers.json')
    const photographers = await response.json()
    return ({ photographers : photographers['photographers'] })
  

};

async function getPhotographersMedia() {
    const response = await fetch('data/photographers.json')
    const photographersMedia = await response.json()
    return ({ medias : photographersMedia['media'] });
};

//------- Display Info Photograph ---------//

const photographMedia = document.querySelector(".photograph-media")


async function displayDataInfo() {
    const { photographers } = await getPhotographers();
    console.log(photographers);
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
listbox.onchange = async function() { displayMedia() } ;

async function displayMedia() {
    photographMedia.innerHTML = "";
    const { medias } = await getPhotographersMedia();
    console.log(medias);
    let elSelect = listbox.value
    console.log("valeur de listbox "+elSelect);
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
      const photographersMedia = document.querySelector(".photograph-media");
      
      
        medias.forEach((media) => {
          if(media.photographerId == id){
            
            totalLikes += media.likes
            const mediaModel = mediaFactory(media);
            const mediaCardDOM = mediaModel.getMediaCardDOM();
            photographersMedia.appendChild(mediaCardDOM);
              
          }
      });
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
    const { medias } = await getPhotographersMedia();

    const lightBoxModalContent = document.querySelector(".modal-content")
    medias.forEach(media => {
        if(media.photographerId == id){
        const lightBoxModel = lightBox(media);
        const lightBoxDOM = lightBoxModel.getLightBoxDOM();
        lightBoxModalContent.appendChild(lightBoxDOM)
        }
    })

}

//------- Form Verification ---------//

const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');
const contact_modal = document.getElementById('contact_modal');


async function IsFormCorrect(){
    console.log("je suis dans isformcorrect")
    firstName.addEventListener('change', function(){
    let firstRegex = new RegExp('^[a-zA-Z][^0-9]+$');

    let testFirst = firstRegex.test(this.value);

    if(!testFirst || (inputFirst.value == "")){
        console.log("veuillez rentrer un prenom correct")
        return false;
    }   
        
    return true;
})



}

async function init() {
    // Récupère les datas des photographes
    // const { photographers } = await getPhotographers();
    // const { medias } = await getPhotographersMedia();
    // console.log('tableau media '+medias);
    if(IsFormCorrect()){
        let btnSend = document.getElementsByClassName('contact_button')[0];
        btnSend.addEventListener('click', function(e){
            e.preventDefault();
            console.log("j'ecoute btnSend")
            console.log("Prenom : "+ firstName.value)
            console.log("Nom : "+ lastName.value)
            console.log("Email : "+ email.value)
            console.log("Message : "+ message.value)
            contact_modal.style.display = "none";
            
        })
    }else{
        //renvoyer des erreurs
    }
    displayDataInfo();
    displayMedia();
    manageLikes();
    displayLightBox();
    
};

init();
