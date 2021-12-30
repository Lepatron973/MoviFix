import {host, imageSizePath,language,API_KEY} from "../utilities";
import React,{useState,useEffect} from 'react';

const DetailCard = (props) => {
    //récupération des paramètre de l'url pour obtenir l'id du film
    const urlParam = location.pathname.split("/")
    //   formatage permettant d'obtenir l'id du film
    const id = urlParam[2];
    const page = 1;
    const [ movie,  setMovie] = useState([]);
    useEffect(()=>{

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&${language}&${page}`)
        .then(res=>{
            return res.json();
        })
        .then(res => {  
             
            setMovie(res)
        })
    },[]);
        let length = movie.runtime / 60;
        length = length.toString();
        length = length.slice(0,4);
        length = length.replace("."," h ");
        console.log(movie)

    return (
        <>
            <div className="content image-content">
                <img src={`${imageSizePath}/w500/${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="content text-content">
                <h2 className="title">{movie.title}</h2>
                <p className="description">{movie.overview}</p>
                <div className="sub-content length-release">
                    <p>durée: {length} </p>
                    <p>---</p>
                    <p>date de sortie:{movie.release_date} </p>
                </div>
                <div className="sub-content budget-revenu">
                    <p>budget : {movie.budget} $</p>
                    <p>---</p>
                    <p>revenu : {movie.revenue} $</p>
                </div>
                <a href={`/?path=addCart&id=${movie.id}`} className="add-cart-content">
                    <i className="fas addCart fa-cart-plus" index={movie.id}></i>
                </a>
            </div>
        </>
    )
};

export default DetailCard;

