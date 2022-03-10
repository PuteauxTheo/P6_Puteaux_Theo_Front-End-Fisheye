const contactForm = document.getElementById("contact-form")

// displayuModalContact permet d'afficher la modal de contact 

// eslint-disable-next-line no-unused-vars
function displayModalContact() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

// displayuModalContact permet de fermer la modal de contact

// eslint-disable-next-line no-unused-vars
function closeModalContact() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    contactForm.reset(); 
}

document.onkeyup = keyContactForm

// permet de naviguer au clavier sur la modal de contact 
function keyContactForm(e) {

    // permet de ferme la modal de contact lorsqu'on appuit sur echap 
    if( e.code == "Escape"){
        closeModalContact();
    }
}

//------- Form Verification ---------//

const firstName = document.getElementById('first');

firstName.addEventListener('change',function() {
    validateName(this);
})

const lastName = document.getElementById('last');

lastName.addEventListener('change',function(){
    validateName(this);
})

// validateName permet de regarde si le champ saisie correspond bien au condition d'un nom ou prenom
function validateName(inputName) {
    const nameRegex = new RegExp('^[a-zA-Z][^0-9]+$');
    let testName = nameRegex.test(inputName.value);
        if(!testName || (inputName.value == "")){
            inputName.setAttribute("data-error","true")
            console.log("veuillez rentrer un prenom ou nom correct")
            return false;
        }else{
            inputName.setAttribute("data-error","false")
            return true;
        }
}

const email = document.getElementById('email');

email.addEventListener('change',function() {
    validateEmail(this);
})

// validateEmail verifie si l'email saisie correspond bien au exigences d'une adresse mail 
function validateEmail(inputEmail){
    const emailRegex = new RegExp( '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let testEmail = emailRegex.test(inputEmail.value);
        if(!testEmail || (inputEmail.value == "")){
            inputEmail.setAttribute("data-error","true");
            console.log("veuillez rentrer un email correct")
            return false;
        }else{
            inputEmail.setAttribute("data-error","false")
            return true;
        }
}
const message = document.getElementById('message');

message.addEventListener('change', function() {
    validateMessage(this);
})

// validateMessage vérifie si le message a bien deux caracteres 
function validateMessage(inputMessage){
    const messageRegex = new RegExp('^[a-zA-Z][^0-9]+$')
    let testMessage = messageRegex.test(inputMessage.value);
        if(!testMessage || (inputMessage.value == "" )){
            inputMessage.setAttribute("data-error","true")
            console.log("veuillez rentrer un message")
            return false;
        }else{
            inputMessage.setAttribute("data-error","false")
            return true;
        }
}
const contact_modal = document.getElementById('contact_modal');

// IsFormCorrect verifie si chaque saisie est correct puis envoie les informations si oui
async function IsFormCorrect(){
    // regarde si toutes les conditions sont respectées pour chaque input 
    if( validateName(firstName) & validateName(lastName) & validateEmail(email) & validateMessage(message)){
        console.log("Prenom : "+ firstName.value)
        console.log("Nom : "+ lastName.value)
        console.log("Email : "+ email.value)
        console.log("Message : "+ message.value)
        contact_modal.style.display = "none";
        contactForm.reset();
    }
    
}

const btnSend = document.getElementsByClassName('contact_button')[0];

btnSend.addEventListener('click', function(e){
    e.preventDefault();
    IsFormCorrect(this);
})

