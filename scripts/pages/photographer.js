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
    return ({ medias : photographersMedia['media'] });
};



async function displayDataInfo(photographers) {
    console.log(photographers);
    const photographHeader = document.querySelector(".photograph-header");
    photographers.forEach((photographer) => {
        if(photographer.id == id){
        const photographerModel = photographerFactory(photographer);
        const userPresentationCardDOM = photographerModel.getUserPresentationCardDOM();
        photographHeader.appendChild(userPresentationCardDOM);
        }
    });
};

const listbox = document.getElementsByClassName('listbox')[0];
/*const onchange = listbox.addEventListener('change',function(){
    console.log("la valeur est => "+this.value)
})*/
listbox.onchange = displayMedia 

async function displayMedia(medias) {
    console.log(medias);
    let elSelect = listbox.value
    console.log("valeur de listbox "+elSelect);
    switch(elSelect){
        case "Popularité":
            // trier par popularite
            medias.sort(function(a,b){
                return b.likes - a.likes;
            });
            
        case "Date":
            // trier par date
            /*medias.sort(function(a,b){

            })*/
        case "Titre":
            //trier par titre
            console.log("rentrer dans titre")
            medias.sort(function(a,b){
                return a.title - b.title;
            })
    }
      const photographersMedia = document.querySelector(".photograph-media");
        medias.forEach((media) => {
          if(media.photographerId == id){
              const mediaModel = mediaFactory(media);
              const mediaCardDOM = mediaModel.getMediaCardDOM();
              photographersMedia.appendChild(mediaCardDOM);
          }
      });
};

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
    const { photographers } = await getPhotographers();
    const { medias } = await getPhotographersMedia();
    console.log('tableau media '+medias);
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
    displayDataInfo(photographers);
    displayMedia(medias);
};

init();
