import React, {useState,useEffect} from 'react';
import { AjaxRequest, addOneArticleToCart, removeOneArticleFromCart } from '../utilities';
import ArticlesCart from './ArticlesCart';
import Payement from './Payement';

const AppCart = () => {
    const [cart, setCart] = useState([]);
    
    useEffect(()=>{
        let req = AjaxRequest("getCart");
        fetch(req)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setCart(res);
        })
    
    },[])
    return (
        <>
          <ArticlesCart articles={cart} removeOne={removeOneArticleFromCart} addOne={addOneArticleToCart}/>
          <Payement articles={cart}/>  
        </>
    );
};

export default AppCart;