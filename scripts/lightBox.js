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
            div.appendChild(img);
        }
        
        if(typeof video !== "undefined"){
            const v = document.createElement('video')
            v.setAttribute("controls","controls");
            const srcv = document.createElement('source');
            srcv.setAttribute('src',videomp4)
            v.appendChild(srcv);
            div.appendChild(v);
        }
        
        
        return (div);
    }

    return { id, title, image, video, getLightBoxDOM}
}

async function openModalLightbox() {
    document.getElementById("idmodal-lightbox").style.display = "block";
}

async function closeModalLightbox() {
    document.getElementById("idmodal-lightbox").style.display = "none";
}

//var mediaArticle = document.querySelectorAll(".media-article");
// var children = mediaArticle.childNodes
// var array = Array.from(mediaArticle)
//     console.log(array)
//     console.log(mediaArticle.childNodes)
    //mediaArticle.children.textContent = " test "
    // for ( i = 0; i <= mediaArticle.length; i++){
    //     console.log(mediaArticle)
    //     console.log(mediaArticle[i])
    //     mediaArticle[i].childNodes[1].onclick = currentSlide(i+1);
    // }

var slideIndex = 1;
showSlides(slideIndex);

async function plusSlides(n) {
    showSlides(slideIndex += n);
}

async function currentSlide(n) {
    showSlides(slideIndex = n);
}

async function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    
    // var dots = document.getElementsByClassName("demo");
    // var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    // }
    slides[slideIndex-1].style.display = "block";
    //dots[slideIndex-1].className += " active";
    //captionText.innerHTML = dots[slideIndex-1].alt;
}