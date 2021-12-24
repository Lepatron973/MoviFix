import React, {useState,useEffect} from 'react';
import { ajaxReq, options, imageSizePath } from '../utilities';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
const Slider = () => {
   
    const [movies, setmovies] = useState([]);
    options.body = JSON.stringify(10);
    let index = 0;
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
         <Splide
            options={ {
                rewind: true,
                gap   : '.1rem',
                autoplay: true,
                perPage: 4,
            } }
            >
                {movies.map(movie=>(
                    <SplideSlide key={index++}>
                        <div className="glide__slide slide" >
                            <img src={`https://www.themoviedb.org/${imageSizePath[0]}/${movie.image}`} alt={movie.title} />
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
            
        </>   
    );
};

export default Slider;