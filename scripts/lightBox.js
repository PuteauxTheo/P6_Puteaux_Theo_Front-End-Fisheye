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
            img.setAttribute("style","width=100%")
            div.appendChild(img);
        }
        
        if(typeof video !== "undefined"){
            const v = document.createElement('video')
            v.setAttribute('src',videomp4)
            div.appendChild(v);
        }
        
        
        return (div);
    }

    return { id, title, image, video, getLightBoxDOM}
}

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    // var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    // }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
}