import React, {useState,useEffect} from 'react';
import {API_KEY,movieEndpoint,host, imageSizePath ,language} from '../utilities';

   

const Banner1 = () => {
    const [movie, setmovies] = useState([]);
    const [img, setImg] = useState(<img src="https://picsum.photos/200/300" alt="image aléatoire" />);
    const req = `${host.api}/${movieEndpoint.latest}?api_key=${API_KEY}&${language}}`;
    useEffect(()=>{
    
        const result = fetch(req)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setmovies(res);
            if(res.poster_path != null)
                setImg(<img src={`${imageSizePath}/w300/${res.poster_path}`} alt={res.title} />)
        })
    
        console.log("load banner component")
    },[])
    return (
        <>       
            <div className="banner-image" key="1">
               {img}
            </div>      
            <div>
                <h3>Derniere sortie</h3>
                <p>
                    Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do eiusmod tempor.
                    Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do eiusmod tempor.
                    Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do eiusmod tempor.
                </p>
                <p>Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do eiusmod tempor.</p>
                <p>Lorem ipsum dolor sit amet, consecetur adipiscing elit, sed do eiusmod tempor.</p>
            </div> 
        </>
    );
};

export default Banner1;