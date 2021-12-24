import React from "react";
import ReactDOM from "react-dom";
import Banner1 from "../components/Banner1";
import Movie from "../components/Movie"
import Slider from "../components/Slider";

ReactDOM.render(
    <>
        <Movie />
    </>
    ,document.querySelector('.movies')
)
ReactDOM.render(
    <>
        <Slider />
    </>
    ,document.querySelector('.glide')
)
ReactDOM.render(
    <>
        <Banner1 />
    </>
    ,document.querySelector('.banner')
)