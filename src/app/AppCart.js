import React, {useState,useEffect} from 'react';
import { AjaxRequest, addOneArticleToCart, removeOneArticleFromCart } from '../utilities';
import HeadersBlock from '../components/HeaderBlock';
import Block from '../components/Block';
import ArticlesCart from '../components/ArticlesCart';
import Payement from '../components/Payement';

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
            <HeadersBlock title="Panier"/>
            <Block blockNumber="2" customClass="block-cart" children={[
                <ArticlesCart articles={cart} removeOne={removeOneArticleFromCart} addOne={addOneArticleToCart}/>,
                <Payement articles={cart}/>  
            ]}
            />
        </>
    );
};

export default AppCart;