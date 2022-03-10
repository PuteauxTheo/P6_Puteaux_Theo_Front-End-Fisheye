// lightBox renvoie une div qui correspond a chaque slide de la lightBox 

// eslint-disable-next-line no-unused-vars
function lightBox(data) {
    const { id , photographerId, title, image, video } = data

    const picture = `assets/media/${photographerId}/${image}`;
    const videomp4 = `assets/media/${photographerId}/${video}`;

    function getLightBoxDOM() {

        const div = document.createElement('div')
        div.className = "mySlides";
        if(typeof image !== "undefined"){
            const img = document.createElement('img')
            img.setAttribute('src',picture)
            const titleImg = document.createElement('div');
            titleImg.className = "title-slide-img";
            titleImg.textContent = title;
            div.appendChild(img);
            div.appendChild(titleImg);
            
        }
        
        if(typeof video !== "undefined"){
            const v = document.createElement('video')
            v.setAttribute("controls","controls");
            const srcv = document.createElement('source');
            srcv.setAttribute('src',videomp4)
            v.appendChild(srcv);
            const titleV = document.createElement('div');
            titleV.className = "title-slide-v"
            titleV.textContent = title;
            div.appendChild(v);
            div.appendChild(titleV);
        }
        
        
        return (div);
    }

    return { id, title, image, video, getLightBoxDOM}
}

// openModalLightBox permet d'ouvrir la modal lightBox  

// eslint-disable-next-line no-unused-vars
async function openModalLightbox() {
    document.getElementById("idmodal-lightbox").style.display = "block";
}

// openModalLightBox permet de fermer la modal lightBox  

// eslint-disable-next-line no-unused-vars
async function closeModalLightbox() {
    document.getElementById("idmodal-lightbox").style.display = "none";
}

var slideIndex = 1;

// plusSlides permet de naviguer entre les slides 
async function plusSlides(n) {
    showSlides(slideIndex += n);
}

// currentSlide permet de se situer losrqu'on navigue 

// eslint-disable-next-line no-unused-vars
async function currentSlide(n) {
    showSlides(slideIndex = n);
}


// showSlides permet de montrer une slides, lors du changement de slides permet de la faire disparaitre 
async function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

document.onkeydown = keyLightBox;
// checkKey permet de naviguer au clavier sur la lightBox
function keyLightBox(e) {


    // checkKey permet de naviguer au clavier sur la lightBox
    if (e.keyCode == '37') {
        plusSlides(-1);
       //left arrow
    }
    else if (e.keyCode == '39') {
        plusSlides(1);
       //right arrow
    }

    // permet de fermer la lightbox avec le button echap 
    if(e.code == "Escape"){
        document.getElementById("idmodal-lightbox").style.display = "none";
    }
}

