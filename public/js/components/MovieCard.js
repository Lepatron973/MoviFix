import React, {useState,useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
const MovieCard = (props) => {
    
   return(
       
       <BrowserRouter>
       {props.movies.map(movie => (
        <div className="movie"  key={movie.id_api_movie}>

            <a href={`/detail/${movie.id_api_movie}`}>
                <figure>
                    <img src={`https://www.themoviedb.org//t/p/w220_and_h330_face${movie.image}`} alt={movie.title} className="home-movie-image"/>
                    <figcaption>
                        10€
                    </figcaption>
                </figure>
            </a>
            <div className="movie-info movie-info-top">
                <p className="movie-title">{movie.original_title}</p>
                <p className="movie-date">{movie.release_date}</p>
            </div>
            <div className="movie-info movie-info-center">
                <p>info</p>
                <div>
                    <span>lorem</span>
                    <span>lorem</span>
                </div>
            </div>
            <div className="movie-info movie-info-bottom">
                <a href={`./?path=addCart&id=${movie.id_api_movie}`}><i className="fas addCart fa-cart-plus" index={movie.id_api_movie}></i></a>
            </div>
        </div>

        ))}
      </BrowserRouter>
    )
};

export default MovieCard;