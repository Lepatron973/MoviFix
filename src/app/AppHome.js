import React from 'react';
import Banner1 from '../components/Banner1';
import Block from '../components/Block';
import Movie from '../components/Movie';
import Slider from '../components/Slider';

const AppHome = () => {
    return (
        <>
            
            <Block blockNumber="1" customClass="" children={[<ElementB1 />]}/>
            <Block blockNumber="2" customClass="" children={
                [
                    <ElementB2 title="Les plus populaires" />,
                    <Movie />
                ]}
            />
            <Block blockNumber="3" customClass="" children={[<Slider title="Vous aimeriez aussi"/>]}/>
            <Block blockNumber="4" customClass="banner" children={[<Banner1 />]}/>        
            
        </>
    );
};
const ElementB1 = () => {
    return (
        <>
          <h1> Movies at will</h1>
            <div><a href="http://" className="button"> watch now</a>
          </div>  
        </>
    );
};
const ElementB2 = (props) => {
    return (
        <div className="element-b2">
            <h2>
                {props.title}
            </h2>
            <select name="trie" id="">
                <option value="">trier</option>
                <option value="">catégorie 1</option>
                <option value="">catégorie 2</option>
            </select>
        </div>
    );
};

export default AppHome;