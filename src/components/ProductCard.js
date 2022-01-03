import React from 'react';

const ProductCard = () => {
    return (
        <div className="product">
            <div className="product-header">
                produt name
            </div>
            <div  className="product-body">
                <div className="price">
                    <span> 10$</span>/mois
                </div>
                <ul className="main-functionalities">
                    <li>lorem</li>
                    <li>lorem</li>
                    <li>lorem</li>
                </ul>
                <div>
                    <a href="" className="button">Souscrire</a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;