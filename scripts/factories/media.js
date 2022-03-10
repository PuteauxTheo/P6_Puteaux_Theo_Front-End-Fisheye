// mediaFactory permet de factoriser les elements necessaire pour chaque media avec differente fonction
// eslint-disable-next-line no-unused-vars
function mediaFactory(data){
    const { id, photographerId, title, image, video, likes, date, price } = data;

    const picture = `assets/media/${photographerId}/${image}`;
    const videomp4 = `assets/media/${photographerId}/${video}`;

    // getMediaCardDOM permet de creer pour chaque photo ou video l'element complet avec toutes les informations
    // getMediaCardDOM renvoie un article pour chaque contenu 
    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        article.className = "media-article";
        
        if(typeof image !== "undefined"){
            const img = document.createElement('img');
            img.className = "media-img";
            img.setAttribute("src",picture);
            img.setAttribute("alt","Photo "+title);
            img.setAttribute("tabindex",4);
            article.appendChild(img);
        }

        if(typeof video !== "undefined"){
            const v = document.createElement('video');
            v.setAttribute("tabindex",4);
            v.setAttribute("alt","Video "+title);
            const srcv = document.createElement('source');            
            v.className = "media-img";
            srcv.setAttribute("src",videomp4);
            v.appendChild(srcv);
            article.appendChild(v);
        }
        const divinfo = document.createElement('div');
        divinfo.className = "info-img";
        const titleimg = document.createElement('p');
        titleimg.textContent = title;
        divinfo.appendChild(titleimg);
        const divlikes = document.createElement('div');
        divlikes.className = "info-likes"
        divinfo.appendChild(divlikes);
        const like = document.createElement('p');
        like.textContent = likes;
        divlikes.appendChild(like);
        const logoLikes = document.createElement('span');
        logoLikes.className = "double-heart";
        logoLikes.innerHTML =   `   <button class="heart-full" tabindex="4">
                                        <i class="heart fas fa-heart "></i>
                                    </button>
                                    <button class="heart-empty" tabindex="4">
                                        <i class="heart far fa-heart "></i>
                                    </button>`
        divlikes.appendChild(logoLikes);
        article.appendChild(divinfo);

        return (article);
    }

    

    return { id, photographerId, title, image, video, likes, date, price, getMediaCardDOM}
}