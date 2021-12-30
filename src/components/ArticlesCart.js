import React from 'react';
import {imageSizePath } from '../utilities';

const ArticlesCart = (props) => {
    return (
        <div className='container container-articles-cart'>
            <p><strong>My Cart</strong></p>
            {
                props.articles.map(article=>(

                    <div className='article' key={article.id}>
                        <div className='container-image'>
                            <img src={`https://www.themoviedb.org/${imageSizePath[0]}/${article.image}`} alt={article.title} />
                        </div>
                        <div className='info-article'>
                            <p className='price-article'> {article.price} $</p>
                            <div>
                                <a href={`./?id=${article.id}`} className='remove-one' onClick={ props.removeOne }> <i className="fas fa-minus-circle" index={article.id}></i> </a>
                                <span className='quantity'> {article.quantity} </span>
                                <span ></span>
                                <a href={`./?path=addCart&id=${article.id}`} className='add-one' onClick={ props.addOne }> <i className="fas fa-plus-circle" index={article.id}></i> </a>
                            </div>
                            <p className='title-article'>{article.title}</p>
                        </div>
                        <div className='delete-article'>
                            <i className="far fa-times-circle"></i>
                        </div>
                    </div>
                ))
            }
            {/* <p className='price-total-articles'>Sous-total: <span className='amount'>61,20</span> </p> */}

        </div>
    );
};

export default ArticlesCart;