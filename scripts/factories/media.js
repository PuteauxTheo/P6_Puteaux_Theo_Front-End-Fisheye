function mediaFactory(data){
    const { id, photographerId, title, image, video, likes, date, price } = data;

    // faire le lien avec l'id et le nom de la perssone
    // pour le chemin de l'image 
    const picture = `assets/media/${photographerId}/${image}`;
    const videomp4 = `assets/media/${photographerId}/${video}`;

    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        console.log(image);
        console.log(video);
        if(typeof image !== "undefined"){
            const img = document.createElement('img');
            img.className = "media-img";
            img.setAttribute("src",picture);
            article.appendChild(img);
        }

        if(typeof video !== "undefined"){
            const v = document.createElement('video');
            v.setAttribute("controls","controls");
            const srcv = document.createElement('source');            
            v.className = "media-img";
            srcv.setAttribute("src",videomp4);
            v.appendChild(srcv);
            article.appendChild(v);
        }


        
        
        
        return (article);
        

    }

    return { id, photographerId, title, image, video, likes, date, price, getMediaCardDOM}

}