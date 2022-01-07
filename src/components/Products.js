import React, {useState,useEffect} from 'react';
import { addOneArticleToCart, AjaxRequest } from '../utilities';
import ProductCard from './ProductCard';

const Products = () => {
    const req = AjaxRequest("getProducts");
    const [products, setproducts] = useState([]);

    useEffect(() => {
        fetch(req)
        .then(res=>res.json())
        .then(res => setproducts(res))
        
    }, [])
    return (
        <div className="products">
            {
                products.map(product => 
                    <ProductCard product={product} key={product.id_product} addOne={addOneArticleToCart}/>
                )
            }
        </div>
    );
};

export default Products;