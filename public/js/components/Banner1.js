import React, {useState,useEffect} from 'react';
import { ajaxReq, options, imageSizePath } from '../utilities';

   

const Banner1 = () => {
    const [movies, setmovies] = useState([]);
    options.body = JSON.stringify(1);
    const req = new Request(ajaxReq+"getMovies", options)
    useEffect(()=>{
    
        const result = fetch(req)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setmovies(res);
        })
    
    },[])

    return (
        <>
            {movies.map(movie=>(       
                <div className="banner-image" key="1">
                    <img src={`https://www.themoviedb.org/${imageSizePath[0]}/${movie.image}`} alt={movie.title} />
                </div>      
            ))}
            <div>
                <h3>Download Your Shows Watch Offline.</h3>
                <p>
                    Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod tempor.There are many variations of passages of lorem Ipsum available, 
                    but the majority have suffered alteration in some injected humour.
                </p>
                <p>Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do eiusmod tempor.</p>
                <p>Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do eiusmod tempor.</p>
            </div> 
        </>
    );
};

export default Banner1;