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
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');
const contact_modal = document.getElementById('contact_modal');


async function IsFormCorrect(){
    console.log("je suis dans isformcorrect")
    const nameRegex = new RegExp('^[a-zA-Z][^0-9]+$');
    firstName.addEventListener('change', function(){
        let test = nameRegex.test(this.value);
        if(!testFirst || (this.value == "")){
            console.log("veuillez rentrer un prenom correct")
            return false;
        }   
        return true;
    })

    lastName.addEventListener('change', function(){
        let testLast = nameRegex.test(this.value);
        if(!testLast || (this.value == "")){
            console.log("veuillez rentrer un nom correct")
            return false;
        }   
        return true;
    })
    const emailRegex = new RegExp( '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    email.addEventListener('change', function(){
        let testLast = nameRegex.test(this.value);
        if(!testLast || (this.value == "")){
            console.log("veuillez rentrer un nom correct")
            return false;
        }   
        return true;
    })


}
async function sendContactInfo() {
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
    }
}

