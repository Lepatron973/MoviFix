import MovieCard from './MovieCard.js';
import React from 'react';
import {useState, useEffect} from 'react'
import {host, getMovieEndpoint,language, API_KEY, options, AjaxRequest,addOneArticleToCart} from '../utilities.js';
const Movie = (props) => {
    let pageNumber = "page=2"
    // let movieEndPoint = getMovieEndpoint(props.endpoint);
    // const req = props.request;
    
    
    const movies = [];
    const ids = [];
    
    const [movieState, setMovies] = useState([]);
    const req = `${host.api}/${getMovieEndpoint(props.endpoint)}?api_key=${API_KEY}&${language}&page=${props.pageNumber}`
    useEffect(()=>{
      console.log("hello")
      
      fetch(req)
      .then((res)=>{
          return res.json();
      })
      .then( res =>{
        // console.log(res.results.length)
          props.setMaxPages(res.total_pages);
          props.setMaxResult(res.results.length)
          let i = 0;
          let index = 0;
          for (const element of res.results) {
            if(i<props.limit){
             
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
    },[props.endpoint,props.limit,props.pageNumber])

    return(
      <div className="movies">
        <MovieCard movies={movieState} addOne={addOneArticleToCart}/>
      </div>
    )
};

export default Movie;