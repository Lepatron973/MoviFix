import React,{useEffect,useState} from 'react';
import { AjaxRequest } from '../utilities';

const Payement = (props) => {
    let totalAmount = 0;
    props.articles.map(article =>( totalAmount += Number(article.price)));
    const [cartEmpty, setcartEmpty] = useState(true)
    const req = AjaxRequest("getCart");
    useEffect(() => {
        fetch(req)
        .then(res=>res.json())
        .then(res =>{
            if(res.length > 0)
                setcartEmpty(false)
        })
    }, []);
    
    const handlePayment = (e)=>{
        if(cartEmpty){
            e.preventDefault();
            alert("Veullez remplir votre panier")
        }
    }
    return (
        <div className='container-payement'>
            <div>
                <strong>Total </strong>
                <span>articles: </span>
            </div>
            <div className='price-total-container'>
                <p>Sous-total:</p>  
                <span className='price-ttc'>{totalAmount} $</span>
            </div>
            <a href='/transaction' className='btn-payement-container' onClick={handlePayment}>
                <span >Payement</span>
            </a>
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