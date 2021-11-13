"use-strict";
const startPath = "./?path=ajax&action=";
const options = {
    method:"POST",
    body: ""
  };

/* 
    cette fonction crée une div avec un design prédéfinie par le css
    elle doit être utilisée dans une boucle
*/
function createMovieDiv(element,tmdbUrl,imageSizePath){
    let divMovie = document.createElement("div");
    divMovie.innerHTML = 
    `
    <div class="movie">                 
        <a href="./?path=detail&id=${element.id}">
            <figure>
                <img src="${tmdbUrl}/${imageSizePath[0]}${element.poster_path}" class="home-movie-image">
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
            <p><i class="fas addCart fa-cart-plus" index=${element.id}></i></p>
        </div>
    </div>
        `
    return divMovie;
}
/* 
    fonction qui permet la récupération des films depuis l'api
    l'affichage de ces dernier en passant par la fonction 
    ->createMovieDiv() puis à l'insertion de ces derniers 
    si ils ne sont pas présent dans la DB avec la fonction
    -> addMovieFromApi()
*/
function getMovieFromApiAndAdd(moviesBlock){
    const params = "language=en-US&page=1,init"
    const endpoint = "3/movie/now_playing";
    const limit = 4;
    const apiKey = "69ba83f78c85f28287d57b3ca8f8c45c";
    const tmdbUrl = "https://www.themoviedb.org";
    const imageSizePath = [
      "/t/p/w220_and_h330_face",
      "/t/p/w440_and_h660_face",
      "/t/p/w600_and_h900_bestv2"
    ]
    fetch(" https://api.themoviedb.org/3/movie/now_playing?api_key="+apiKey+"&language=en-US&page=3")
    .then(res=>{
      return res.json();
    })
    .then( res =>{
      let i = 0;
      let index = 0;
      const ids = [];
      const movies = [];
      for (const element of res.results) {
        if(i<limit){
         
          ids.push(element.id);
          let movie = {
            title: element.original_title,
            // duration: length,
            release_date: element.release_date,
            image: element.poster_path,
            // budget: element.budget,
            // revenu: element.revenue,
            description: element.overview,
            id_api_movie: element.id
          }
          movies.push(movie)
          let divMovie = createMovieDiv(element,tmdbUrl,imageSizePath)
          
        
          moviesBlock.appendChild(divMovie);
        }
        i++;
    }
    const btnAddCart = document.querySelectorAll(".addCart");
    for(let btn of btnAddCart){
        
        btn.addEventListener("click", addCart)
    }
      // console.log(movies)
      options.body = JSON.stringify( ids);

      const req = new Request(startPath+"checkIfExist", options)
      addMovieFromApi(req,movies,options);
    })
}

/* 
    cette fonction récupère les films issue de l'api TMDB
    compare les id avec ceux présent dans notre DB
    et injectent les films manquant dans la DB
    la fonction communique avec un contrôleur qui attend
    une requête sur la route "ajax" 
*/
function addMovieFromApi(req,movies,options){
    fetch(req)
    .then(res=>{       
      return res.json();
    })
    .then( res => { 
      if(res.length <= 0){
        console.log(res)
        /* 
          si les films n'existe pas dans la Base de donnée
          ajoute les.
        */
        for( let movie of movies){
          
          
              options.body = JSON.stringify(movie);
              
              let req = new Request(startPath+"addMovie", options);
            fetch(req);
          } 
      }else{
        for(let movie of movies){ 
          /* 
          ajoutes seulement les films qui ne sont pas 
          présent dans la BDD
          */
          if(res.indexOf( String( movie.id_api_movie ) ) < 0 ){
            
            options.body = JSON.stringify(movie);
            console.log(options)
            let req = new Request(startPath+"addMovie", options);
            fetch(req);
          }   
        }
      }
    })
  }

  function addCart(){
    const id = this.getAttribute('index');
    options.body = JSON.stringify(id)
    const req = new Request(startPath+"getMovie",options);
    fetch(req)
    .then(res => {return res.json()})
    .then(res =>{
      let array =[];
      for( let element in res){
       
        array.push(res[element])
      }
      if(!getCookie('panier')){

        setCookie('panier','indexPanier',cookieStringify([array]))
      }
      else{
        panier = getCookie("panier")
        panier.push(array)
        setCookie('panier','indexPanier',cookieStringify(panier))
        panier = getCookie('panier')
        console.log(panier)
        setCart()
      }
    })


  }
  /* 
    fonction permettant de transformer un tableau en string selon un format précis
    (avec pour séparateur des ',')
    pour ensuite l'envoyer dans un cookie
    @param array
    @return string
 */
  function cookieStringify(arrays){
    let  string ="";
    
    for (let array of arrays) {
      for(element of array){

        element = typeof element == "string" ? element.replace(' ','_') : element
        string += String(element) + "#";
      }
      string = string.substring(0,string.length -1)
      string += String(element) + "&";
    }
    string = string.substring(0,string.length -1)

    return string;
  }
   /* 
    fonction permettant de transformer une string issue d'un cookie(format cle=valeur) en tableau
    PS: pour utiliser cette fonction il faudra obligatoirement avoir
    utilisé en amont la fonction cookieStringify() pour créer la string qui a été envoyé dans le cookie;
    @param string
    @return array
*/
  function cookieParse(string){
    
    let arrays = string.substring(string.indexOf('=')+1)
    arrays = arrays.split('&')
    for (let key in arrays) {
      arrays[key] = arrays[key].split('#')
    }
    return arrays;
  }

  /* 
  fonction permettant de créer un cookie 
  @parma string keyIndex: nom de l'élément de référence situé juste avant le cookie que l'on veut ajouter: ex: userNameIndex
  @param string key: nom de la valeur que l'on veut ajouter ex: userName
  @param array|string value: valeur de l'élément à ajouter : ex: emma
  PS: si on veut envoyer plusieurs valeurs avec cette fonction il faut les mettres dans tableau qui lui
  même comporte un tableau de donnée ex: [ [data1,data2,etc]]
  et utiliser la fonction cookieStringify() pour formater la valeur 
*/
function setCookie(keyIndex,key,value){
    document.cookie = `${keyIndex}=tempValue; SameSite=None; Secure`;
    document.cookie = `${keyIndex}=index; SameSite=None; Secure`;
    document.cookie = `${key}="tempValue"; SameSite=None; Secure`;
    document.cookie = `${key}=${value}; SameSite=None; Secure`;
}
/* 
    fonction permettant de récupérer un cookie grâce à l'index
    de référence utilisé dans la fonction setCookie
    @param keyIndex: nom de l'index de référence
    @return array: renvoi un tableau simple contenant les valeur du cookie demandé
 */
function getCookie(keyIndex){
  
    const sanitizedCookie = document.cookie.replaceAll(' ','');
    // const sanitizedCookie = document.cookie
    const cookies = sanitizedCookie.split(';');
    let refIndex = cookies.indexOf(`${keyIndex}=index`);
    if(refIndex === -1){
        // alert("la clé n'est pas présente dans le tableau ou elle dispose d'un espace à la sortie du cookie ce qui la rend donc différent de lélément demandé")
        return false;
    }else
    refIndex +=1;
    
    // console.log(refIndex)
    let arrays = cookieParse(cookies[refIndex])
    let cookieParsed = [];
    for(let array of arrays){
      for(let key in array){

        if(parseInt(array[key]))
          array[key] = parseInt(array[key])
        else if( array[key] == "true" || array[key] == "false" )
          array[key] = new Boolean(array[key]);
        else
          array[key] = array[key].replaceAll('_',' ');
        
        }
        cookieParsed.push(array);

    }
    
    return cookieParsed;
}

function setCart(){
  if(!getCookie('panier')){
    cartAmount.innerHTML = 0,00
    let panier = null;
  }else{
    panier = getCookie('panier')
    console.log(panier)
    let amount = 0;
    for (const movie of panier) {
     amount += parseInt(movie[7]);
    }
    cartAmount.innerHTML = amount
  }
}