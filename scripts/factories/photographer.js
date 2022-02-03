function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.setAttribute('href','photographer.html?id='+id);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
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

    function getUserPresentationCardDOM() {
        console.log('je suis rentre dans presentation Card DOM')

        const div = document.createElement('div');
        div.className = "photograph-header-info";

        const contact_me = document.createElement('button');
        contact_me.className = "contact_button"
        contact_me.onclick = displayModal;
        contact_me.textContent = "Contactez-moi"

        const info = document.createElement('div');
        
        const textname = document.createElement('h1');
        textname.textContent = name;
        const textcity = document.createElement('p');
        textcity.textContent = city+', '+country;
        const texttagline = document.createElement('p');
        texttagline.textContent = tagline;
        info.appendChild(textname);                
        info.appendChild(textcity);                
        info.appendChild(texttagline);

        
        const portrait = document.createElement('div');
        const img = document.createElement( 'img' );
        img.className = "photograph-header-img";
        img.setAttribute("src", picture);
        portrait.appendChild(img);


        div.appendChild(info);        
        div.appendChild(contact_me);
        div.appendChild(portrait);

        return (div);

    }
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM, getUserPresentationCardDOM}
}