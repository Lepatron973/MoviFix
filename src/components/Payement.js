import React from 'react';

const Payement = (props) => {
    let totalAmount = 0;
    props.articles.map(article =>( totalAmount += Number(article.price)));
    return (
        <div className='container container-payement'>
            <div>
                <strong>Total </strong>
                <span>articles: </span>
            </div>
            <div className='price-total-container'>
                <p>Sous-total:</p>  
                <span className='price-ttc'>{totalAmount} $</span>
            </div>
            <div className='btn-payement-container'>
                <a>Payement</a>
            </div>
            <div className='payement-mode-container'>
                <p>Nous acceptons: </p>
                <ul>
                    <li><i className="fab fa-cc-visa"></i></li>
                    <li><i className="fab fa-cc-stripe"></i></li>
                    <li><i className="fas fa-credit-card"></i></li>
                    <li><i className="fab fa-cc-paypal"></i></li>
                    <li><i className="fab fa-ethereum"></i></li>
                </ul>
            </div>
        </div>
    );
};

export default Payement;