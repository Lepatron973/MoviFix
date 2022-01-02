import React,{useState,useEffect} from 'react';
import {host, imageSizePath,language,API_KEY,getMovieEndpoint} from "../utilities";
import Iframe from './Iframe';

const DetailCard = (props) => {
    //récupération des paramètre de l'url pour obtenir l'id du film
    const urlParam = location.pathname.split("/")
    //   formatage permettant d'obtenir l'id du film
   let movieEndPoint = getMovieEndpoint("detail", urlParam[2]);
    const [display, setDisplay] = useState(false);
    const page = 1;
    const [ movie,  setMovie] = useState([]);
    useEffect(()=>{

        fetch(`${host.api}/${movieEndPoint}?api_key=${API_KEY}&${language}&${page}`)
        .then(res=>{
            return res.json();
        })
        .then(res => {  
            let movieEndPoint = getMovieEndpoint("video", urlParam[2])
            fetch(`${host.api}/${movieEndPoint}?api_key=${API_KEY}&${language}&${page}`)
            .then(video => video.json())
            .then(video => {
                let key = video.results[0].key;
                res.video = key;
                setMovie(res)
            })
        })
    },[]);
        let length = movie.runtime / 60;
        length = length.toString();
        length = length.slice(0,4);
        length = length.replace("."," h ");

    return (
        <>
            <div className="content image-content">
                <img src={`${imageSizePath}/w500/${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="content text-content">
                <h2 className="title"><span> {movie.title} </span> <i className="far fa-play-circle" onClick={()=> setDisplay(!display)}></i></h2>
                <div className="sub-content">
                    <p className="description">{movie.overview}</p>
                    <div className="sub-content-child length-release">
                        <p>durée: {length} </p>
                        <p>---</p>
                        <p>date de sortie:{movie.release_date} </p>
                    </div>
                    <div className="sub-content-child budget-revenu">
                        <p>budget : {movie.budget} $</p>
                        <p>---</p>
                        <p>revenu : {movie.revenue} $</p>
                    </div>
                </div>
                <a href={`/?path=addCart&id=${movie.id}`} className="add-cart-content">
                    <i className="fas addCart fa-cart-plus" index={movie.id}></i>
                </a>
            </div>
            <Iframe display={display} video={movie.video} setDisplay={setDisplay}/>
        </>
    )
};

export default DetailCard;

