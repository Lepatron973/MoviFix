import React,{useState,useEffect} from 'react';
import { AjaxRequest } from '../utilities';

const ProductCard = (props) => {
    const req = AjaxRequest("getCart");
    const [cartEmpty, setcartEmpty] = useState(true)
    useEffect(() => {
        fetch(req)
        .then(res=>res.json())
        .then(res =>{
            if(res.length > 0)
                setcartEmpty(false)
        })
    }, []);
    
    return (
        <div className="product">
            <div className="product-header">
                {props.product.product_name}
            </div>
            <div  className="product-body">
                <div className="price">
                    <span> {props.product.price}$</span>/mois
                </div>
                <ul className="main-functionalities">
                    {props.product.func_name.map(prop => 
                        <li key={prop}>{prop}</li>
                    )}
                </ul>
                <div>
                    <a href="" disabled="disabled" className="button" index={props.product.id_product} onClick={cartEmpty ? props.addOne : (e)=>{e.preventDefault();alert("Votre panier est remplis")}}>Souscrire</a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;