// photographerFactory permet de factoriser les elements necessaire pour chaque photographe avec differente fonction 
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    // getUserCardDOM permet la creation de la carte du photographe
    // apparait sur la page acceuil
    // getUserCardDOM renvoie un article avec la presentation du photographe 
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.setAttribute('href','photographer.html?id='+id);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt","Photo de profil de "+name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const info = document.createElement('div'); 
        const origin = document.createElement('p');
        origin.className = 'origin';
        origin.textContent = city+', '+country;
        const tag = document.createElement('p');
        tag.className = 'tag';
        tag.textContent = tagline;
        const tariff = document.createElement('p');
        tariff.className = 'tariff'
        tariff.textContent = price+'€/jour';
        info.appendChild(origin)
        info.appendChild(tag)
        info.appendChild(tariff)
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(info);
        return (article);
    }

    // getUserPresentationCardDOM permet de creer la carte infomartion du photographe avec un button pour le contacter 
    // apparait sur la page d'un photographe selectionne 
    // getUserPresentationCardDOM renvoie une div avec les informations du photographe
    function getUserPresentationCardDOM() {

        const div = document.createElement('div');
        div.className = "photograph-header-info";

        const contact_me = document.createElement('button');
        contact_me.className = "contact_button"
        // eslint-disable-next-line no-undef
        contact_me.onclick = displayModalContact;
        contact_me.textContent = "Contactez-moi"
        contact_me.setAttribute("tabindex",2);
        contact_me.setAttribute("aria-label", "Contactez-moi "+name);

        const info = document.createElement('div');
        
        const textname = document.createElement('h1');
        textname.textContent = name;
        const textcity = document.createElement('p');
        textcity.className = "city";
        textcity.textContent = city+', '+country;
        const texttagline = document.createElement('p');
        texttagline.className = "tagline";
        texttagline.textContent = tagline;
        info.appendChild(textname);                
        info.appendChild(textcity);                
        info.appendChild(texttagline);

        
        const portrait = document.createElement('div');
        const img = document.createElement( 'img' );
        img.className = "photograph-header-img";
        img.setAttribute("src", picture);
        img.setAttribute("alt","Photo de profil de "+name);
        portrait.appendChild(img);


        div.appendChild(info);        
        div.appendChild(contact_me);
        div.appendChild(portrait);

        return (div);

    }

    // getPhotographerStat permet d'afficher le nombre de like pour  total de chaque photographe une fois sur sa page
    // apparait sur la page d'un photographe selectionne
    // getPhotographerStat renvoie une div qui affiche le nombre total de like et le tarif
    function getPhotographerStat() {
        const div = document.createElement('div')
        div.className = 'stat-likes'
        const divTotalLikes = document.createElement('div');
        divTotalLikes.className = " stat-totalLikes"
        div.appendChild(divTotalLikes);
        const pTotalLikes = document.createElement('p');
        pTotalLikes.setAttribute('id','totalLikes')
        divTotalLikes.appendChild(pTotalLikes)
        const logoTotalLikes = document.createElement('span');
        logoTotalLikes.innerHTML = `<i class="heart-totalLike fas fa-heart "></i>`
        divTotalLikes.appendChild(logoTotalLikes);
        const divPrice = document.createElement('p');
        divPrice.setAttribute('id','pricePerDay')
        divPrice.textContent = price +"€ /jour";
        div.appendChild(divPrice)

        return (div);
    }
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM, getUserPresentationCardDOM, getPhotographerStat}
}