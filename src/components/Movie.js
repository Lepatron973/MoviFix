import MovieCard from './MovieCard.js';
import React from 'react';
import {useState, useEffect} from 'react'
import {host,getMovieEndpoint,language, API_KEY, options, AjaxRequest,addOneArticleToCart} from '../utilities.js';
const Movie = () => {
    let pageNumber = "page=2"
    let movieEndPoint = getMovieEndpoint("popular");
    const limit = 10;
    const req = `${host.api}/${movieEndPoint}?api_key=${API_KEY}&${language}&${pageNumber}`;
    const movies = [];
    const ids = [];
    const [movieState, setMovies] = useState([]);
    useEffect(()=>{
      fetch(req)
      .then((res)=>{
          return res.json();
      })
      .then( res =>{
          let i = 0;
          let index = 0;
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
            }
            i++;
          }
          setMovies(movies)
          options.body = JSON.stringify( ids);
          const req = AjaxRequest("checkIfExist");
          // addMovieFromApi(req,movies,options);
          
        })
    },[])

    return(
      <div className="movies">
        <MovieCard movies={movieState} addOne={addOneArticleToCart}/>
      </div>
    )
};

export default Movie;