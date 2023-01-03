import React, {useState,useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
const MovieCard = (props) => {
    
   return(
       
       <BrowserRouter>
       {props.movies.map(movie => (
        <div className="movie"  key={movie.id_api_movie}>

            <a href={`/detail/${movie.id_api_movie}`}>
                <figure>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.image}`} alt={movie.title} className="home-movie-image"/>
                </figure>
            </a>
            <div className="movie-info movie-info-top">
                <p className="movie-title">{movie.original_title}</p>
                <p className="movie-date">{movie.release_date}</p>
            </div>
            <div className="movie-info movie-info-center">
                <p>info</p>
                {/* <div>
                    <span>lorem</span>
                    <span>lorem</span>
                </div> */}
            </div>
        </div>

        ))}
      </BrowserRouter>
    )
};

export default MovieCard;