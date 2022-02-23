function displayModalContact() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModalContact() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const contactForm = document.getElementById("contact-form")
    contactForm.reset(); 
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

// verifie si l'email est rentré correctement 
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

// vérifie si le message a bien deux caracteres 
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


async function IsFormCorrect(){
    // regarde si toutes les conditions sont respectées pour chaque input 
    if( validateName(firstName) & validateName(lastName) & validateEmail(email) & validateMessage(message)){
        console.log("Prenom : "+ firstName.value)
        console.log("Nom : "+ lastName.value)
        console.log("Email : "+ email.value)
        console.log("Message : "+ message.value)
        contact_modal.style.display = "none";
    }
    
}

const btnSend = document.getElementsByClassName('contact_button')[0];

btnSend.addEventListener('click', function(e){
    e.preventDefault();
    IsFormCorrect(this);
})

