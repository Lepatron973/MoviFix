import React, {useState,useEffect} from 'react';
import {API_KEY,getMovieEndpoint,host, imageSizePath ,language} from '../utilities';

   

const Banner1 = () => {
    let movieEndPoint = getMovieEndpoint('topRated')
    const [movie, setmovie] = useState([]);
    const [img, setImg] = useState(<img src="https://picsum.photos/200/300" alt="image aléatoire" />);
    const req = `${host.api}/${movieEndPoint}?api_key=${API_KEY}&${language}}`;
    useEffect(()=>{
    
        const result = fetch(req)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            res = res.results[0];
            console.log(res)
            setmovie(res);
            if(res.poster_path != null)
                setImg(<img src={`${imageSizePath}/w300/${res.poster_path}`} alt={res.title} />)
        })
    
        
    },[])
    return (
        <>       
            <h3>Le Mieux Noté ce mois-ci</h3>
            <div className="banner-image" key="1">
               {img}
            </div>      
            <div>
                <h3> {movie.title} </h3>
                <p>
                    {movie.overview}
                </p>
                <p>Note: {movie.vote_average} / 10</p>
                <p>Nombre de Votes: {movie.vote_count} </p>
            </div> 
        </>
    );
};

export default Banner1;