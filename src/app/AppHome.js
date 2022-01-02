import React, {useState, useEffect} from 'react';
import Banner1 from '../components/Banner1';
import Block from '../components/Block';
import Movie from '../components/Movie';
import Slider from '../components/Slider';
import { host,getMovieEndpoint,language,API_KEY } from '../utilities';

const AppHome = () => {
    const sort = (e) => {
        setsorted(e.target.value)
        
    }
    let index = 0;
    const [sorted, setsorted] = useState("popular")
    const [pageNumber, setPageNumber] = useState(1)
    const [maxPages, setMaxPages] = useState(0);
    const [maxResult, setMaxResult] = useState(0);
    const [limit,setLimit] = useState(10);
    let pages;
    return (
        <>
            
            <Block blockNumber="1" customClass="" children={[<ElementB1 />]}/>
            <Block blockNumber="2" customClass="" children={
                [
                    <ElementB2 title="Les plus populaires" action={sort} limit={limit} maxResult={maxResult} 
                        setLimit={(e)=>{ if(e.target.value<= maxResult) setLimit(e.target.value) }}
                        pageNumber={pageNumber} maxPages={ pages = maxPages <= 500 ? maxPages: 500  } 
                        setPageNumber={(e)=>{ if(e.target.value <= maxPages) setPageNumber(e.target.value); else setPageNumber(pages) }} 
                    />,
                    <Movie endpoint={sorted} pageNumber={pageNumber} setMaxPages={setMaxPages} setMaxResult={setMaxResult} limit={limit}/>
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
            <div className="sort-input">
                <label>catégorie</label>
                <select name="trie" id="sortForm">
                    <option value="popular" onClick={props.action}>Les plus populaires</option>
                    <option value="nowPlaying" onClick={props.action}>Au cinéma</option>
                    <option value="topRated" onClick={props.action}>Mieux notées</option>
                    <option value="upcoming" onClick={props.action}>À venir</option>
                </select>
            </div>
            <div className="sort-input">
                <label>pages: {props.pageNumber} /{props.maxPages}</label>
                <input type="number" value={props.pageNumber} onChange={props.setPageNumber}/>
            </div>
            <div className="sort-input">
                <label>Résultats: {props.limit} /{props.maxResult}</label>
                <input type="number" value={props.limit} onChange={props.setLimit}/>
            </div>
        </div>
    );
};

export default AppHome;