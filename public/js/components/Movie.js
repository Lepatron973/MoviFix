import MovieCard from './MovieCard.js';
import React from 'react';
import {useState, useEffect} from 'react'
import * as utils from '../utilities.js';
const Movie = () => {
    const limit = 10;
    const req = `${utils.host.api}/${utils.endpoint[0]}?api_key=${utils.API_KEY}&${utils.language}&${utils.nbPage}`;
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
          utils.options.body = JSON.stringify( ids);
          const req = new Request(utils.ajaxReq+"checkIfExist", utils.options)
          utils.addMovieFromApi(req,movies,utils.options);
        })
    },[])

    return(
     <MovieCard movies={movieState} />
    )
};

export default Movie;