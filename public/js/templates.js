function createElement(elementTag,parentElement,template,classElement = null){
    const element = document.createElement(elementName);
    if(classElement != null)
        element.classList(classElement);
    template
    elementName.innerHTML = template;
    parentElement.appendChild(element);

}


export default function createMovieDiv(element,host,imageSizePath){
    let domElement = document.createElement("div");
    domElement.innerHTML = 
    `
    <div class="movie">                 
        <a href="/detail/${element.id}">
            <figure>
                <img src="${host}/${imageSizePath[0]}${element.poster_path}" class="home-movie-image">
                <figcaption>
                    10 €
                </figcaption>
            </figure>
        </a>
        <div class="movie-info movie-info-top">
            <p class="movie-title">${element.original_title}</p>
            <p class="movie-date">${element.release_date}</p>
        </div>
        <div class="movie-info movie-info-center">
            <p>info</p>
            <div>
                <span>lorem</span>
                <span>lorem</span>
            </div>
        </div>
        <div class="movie-info movie-info-bottom">
            <a href="./?path=addCart&id=${element.id}"><i class="fas addCart fa-cart-plus" index=${element.id}></i></a>
        </div>
    </div>
        `
    return domElement;
}


function createSlide(element,host,imageSizePath){
    // let domElement = document.createElement("li");
    // domElement.innerHTML = 
    // `
    //     <img src="${host}/${imageSizePath[0]}${element.poster_path}" alt="${element.original_title}">
    // `;
    // domElement.classList("glide__slide");
    // return domElement;
}

