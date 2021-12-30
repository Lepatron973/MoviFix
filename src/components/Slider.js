import React, {useState,useEffect} from 'react';
import { ajaxPath, options, imageSizePath } from '../utilities';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
const Slider = (props) => {
   
    const [movies, setmovies] = useState([]);
    options.body = JSON.stringify(10);
    let index = 0;
    const req = new Request(ajaxPath+"getMovies", options)
    useEffect(()=>{

        const result = fetch(req)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setmovies(res);
        })
        console.log("load slider component")
    },[])
    
    return (
        <>
        <h2>{props.title}</h2>
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
                            <img src={`${imageSizePath}/w200/${movie.image}`} alt={movie.title} />
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
            
        </>   
    );
};

export default Slider;