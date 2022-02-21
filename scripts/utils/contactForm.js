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

async function validateName(inputName) {
    const nameRegex = new RegExp('^[a-zA-Z][^0-9]+$');
    console.log("inputName value : "+inputName.value)
    let testName = nameRegex.test(inputName.value);
    console.log(" regex value "+ testName)
        if(!testName || (inputName.value == "")){
            console.log("veuillez rentrer un prenom ou nom correct")
            return false;
        }else{
            return true;
        }
}

const email = document.getElementById('email');

email.addEventListener('change',function() {
    validateEmail(this);
})

async function validateEmail(inputEmail){
    const emailRegex = new RegExp( '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let testEmail = emailRegex.test(inputEmail.value);
        if(!testEmail || (inputEmail.value == "")){
            console.log("veuillez rentrer un email correct")
            return false;
        }else{
            console.log(" email valide ")
            return true;
        }
}
const message = document.getElementById('message');

message.addEventListener('change', function() {
    valideMessage(this);
})

async function valideMessage(inputMessage){
    const messageRegex = new RegExp('^[a-zA-Z][^0-9]+$')
    console.log(" inputmessage value : "+ inputMessage.value)
    let testMessage = messageRegex.test(inputMessage.value);
    console.log(" regex value message"+ testMessage)
        if(!testMessage || (inputMessage.value == "" )){
            console.log("veuillez rentrer un message")
            return false;
        }else{
            return true;
        }
}
const contact_modal = document.getElementById('contact_modal');


async function IsFormCorrect(){
    console.log(" je suis dans isFormCorrect ")
    if( validateName(firstName) & validateName(lastName) & validateEmail(email) & valideMessage(message)){
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

// async function sendContactInfo() {
//         let btnSend = document.getElementsByClassName('contact_button')[0];
//         btnSend.addEventListener('click', function(e){
//             e.preventDefault();
//             console.log("Prenom : "+ firstName.value)
//             console.log("Nom : "+ lastName.value)
//             console.log("Email : "+ email.value)
//             console.log("Message : "+ message.value)
//             contact_modal.style.display = "none";
//         })
// }
