"use-strict";
export const ajaxPath = "/?path=ajax&action=";
export const options = { method:"POST", body: ""};
export const endpoint = ["movie/now_playing"];
export let refId; //id issue de l'api, nécéssaire pour trouver un film en particulier ou autre (sera modifié via le front)
export const limit = 10;
export const API_KEY = "69ba83f78c85f28287d57b3ca8f8c45c";
export const videoPath = "https://www.youtube.com/embed/" //il faunt compléter avec la clé de lecture: Ldxda5cqQh4
export const host = {"api": "https://api.themoviedb.org/3","site": "https://www.themoviedb.org"};
export const nbPage = "page=2"; 
export const imageSizePath = "https://image.tmdb.org/t/p/"; //il faut compléter avec la taille de l'image: w220_and_h330 || w300
export const language = "language=fr-FR";
/* 
    fonction qui permet la récupération des films depuis l'api
    l'affichage de ces dernier en passant par la fonction 
    ->createMovieDiv() puis à l'insertion de ces derniers 
    si ils ne sont pas présent dans la DB avec la fonction
    -> addMovieFromApi()
*/


/* 
    cette fonction récupère les films issue de l'api TMDB
    compare les id avec ceux présent dans notre DB
    et injectent les films manquant dans la DB
    la fonction communique avec un contrôleur qui attend
    une requête sur la route "ajax" 
*/
export function addMovieFromApi(req,movies,options){
    fetch(req)
    .then(res=>{       
      return res.json();
    })
    .then( res => { 
      if(res.length <= 0){
       
        /* 
          si les films n'existe pas dans la Base de donnée
          ajoute les.
        */
        for( let movie of movies){
          
          
              options.body = JSON.stringify(movie);
              
              let req = new Request(ajaxPath+"addMovies", options);
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
            let req = new Request(ajaxPath+"addMovies", options);
            fetch(req);
          }   
        }
      }
    })
  }
  export function AjaxRequest(endpoint,param=""){
    options.body = param;
    const req = new Request(ajaxPath+endpoint, options);
    return req;
  }
  export function removeOneArticleFromCart(e){
    e.preventDefault();
    options.body = JSON.stringify(e.target.getAttribute("index"));
    let req = AjaxRequest("removeOneArticleFromCart");
    fetch(req)
    .then((res)=>{ location.reload()})
  }
  export function getProfile(){
   
    options.body = JSON.stringify("1");
    let req = AjaxRequest("getProfile");
    const data = fetch(req)
    .then((res)=>{ return res.json()})
    .then((res)=>{return res})
    return data;
  }
  export function addOneArticleToCart(e){
      e.preventDefault();
      console.log(e.target)
      options.body = JSON.stringify(e.target.getAttribute("index"));
      let req = AjaxRequest("addCart");
      fetch(req)
      .then((res)=>{ location.reload()})
  }
  export function checkValidPassword(pass1){
    const regex = /(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*#?&ù+=£])[a-zA-Z0-9@$!%*#?&ù+£=]{8,}/
    const match = pass1.match(regex)
    return match != null ? true : false;
  }
  export function checkEqualPass1Pass2(pass1,pass2){
    return pass1 == pass2 ? true : false;
  }
  export function checkRegistrationPasswordIsOk(pass1,pass2){
    let passwordIsOk = false;
    if(checkValidPassword(pass1)){
      if(pass1.length > 0 && pass2.length > 0)
        if(checkEqualPass1Pass2(pass1,pass2))
          passwordIsOk =  true;
    }
    return passwordIsOk;
  }
  export function checkValidEmail(mail){
    const regex = /(@[a-z]{3,}\.[a-z]{2,})$/
    const match = mail.match(regex)
    return match != null ? true : false;
  }
  export function capitalize(string){
    string = string.toLowerCase();
    const firstLetterUpper = string.charAt(0).toUpperCase();
    string = string.replace(string.charAt(0),firstLetterUpper);
    return string;
  }
  export function alertMessage(domElement, message){
    let i = 0;
    console.log(domElement)
    console.log(Array.isArray(domElement))

    for(let element of domElement){
      element.style.display = "block";
      element.innerHTML = message
      setTimeout(()=> {
        element.style.display = "none";
        element.innerHTML = message
      },4000)
    }
    
   


  }
  export function getMovieEndpoint(endpoint,id = null){
    let movieEndpoint = {
      detail: `movie/${id}`,
      credits: `movie/${id}/credits`,
      similar: `movie/${id}/similar`,
      video: `movie/${id}/videos`,
      latest: 'movie/latest',
      nowPlaying: 'movie/now_playing',
      popular: 'movie/popular',
      topRated: 'movie/top_rated',
      upcoming: 'movie/upcoming'
    }
    return movieEndpoint[endpoint];
  }
  export function getPersonEndpoint(endpoint,id = null){
    let personEndpoint = {
      detail: `person/${id}`,
      movieCredits: `person/${id}/movie_credits`,
      tvCredits: `person/${id}/tv_credits`,
      latest: 'person/latest',
      popular: 'person/popular',
    }
    return personEndpoint[endpoint];
  }
 export * from "./utilities.js" ;
  