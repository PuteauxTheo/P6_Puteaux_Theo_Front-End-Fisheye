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
        const article = document.createElement('article');
        const info = document.createElement('div');
        info.textContent = name+' '+price;
        const contact_me = document.createElement('div');
        const image = document.createElement('div');
        article.appendChild(info);
        article.appendChild(contact_me);
        article.appendChild(image);
        return (article);

    }
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM, getUserPresentationCardDOM}
}