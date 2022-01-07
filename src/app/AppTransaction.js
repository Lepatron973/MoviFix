import React,{useState,useEffect} from 'react';

import Input from "../components/Input";
import Form from "../components/Form";
import { AjaxRequest } from '../utilities';
const AppTransaction = () => {
    const [productId, setProductId] = useState();
    const [price, setprice] = useState(0);
    const [month, setmonth] = useState("");
    const [year, setyear] = useState("");
    const [cardNumber, setcardNumber] = useState("");
    const [cryptoGrame, setcryptoGrame] = useState("");
    const [formStatus, setformStatus] = useState(false);
    const [profile, setProfile] = useState(false);
    
    useEffect(()=>{
        let req = AjaxRequest("getCart");
        fetch(req)
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            let price = 0;
            let id;
            res.map(article => {
               id = article.id;
               price += parseInt(article.price) 
            })
            setprice(price);
            setProductId(id);
            if(price < 1)
                location.assign("/");

        })
    },[]) 
    useEffect(() => {
        let req = AjaxRequest("getProfile");
        fetch(req)
        .then(res=>res.json())
        .then(res=>{
            setProfile(res)
            if(!res.status)
                location.assign("/");
        })
    }, [])
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        let formChek = true;
        if(cardNumber.length != 16)
            formChek = false;
        if(month > 12 || month <= 0)
            formChek = false;
        if(year > 2030 || year < 2022)
            formChek = false;
        if(cryptoGrame >= 1000 || cryptoGrame <= 100)
            formChek = false;
        if(formChek){
            setformStatus(true)
            let req = AjaxRequest("passOrder",[profile.id,productId]);
            fetch(req)
            
        }
        
        
    }
    return (
        <div className="block-2-content transaction">
            < Header />
            <div className="block-3-content transaction">

                <SellerInfo price={price}/>

                <CardInfo status={formStatus} price={price} children={[
                    <Form method="POST" customClass="credit-card-form" action="/" onSubmit={handleSubmit} children={[
    
                        <div className="input-icon card-num">
                                <label>Numéro de la carte</label>
                                <Input type="number" customClass="card-number" name="card-number" setValue={setcardNumber} value={cardNumber}   placeHolder="Ex: 4024007103939509" />
                        </div>,
                        <div className="input-icon expiration">
                            <label>Date d'expiration</label>
                            <Input customClass="month" name="month" type="number" setValue={setmonth} value={month} placeHolder="Ex: 12" />
                            <Input customClass="year" name="year" type="number" setValue={setyear} value={year} placeHolder="EX: 2023" />
                            
                        </div>,
                         <div className="input-icon crypto">
                            <label>Cryptograme</label>
                            <Input customClass="cryptograme" type="number" name="cryptograme" setValue={setcryptoGrame} value={cryptoGrame}  placeHolder="Ex: 676" />
                        </div>,
                        <div className="input-icon">
                            <Input type="submit" name="submit" value={"Valider"} />
                           <a href="/home" className={"submit"}> Abandonner</a>
                        </div>
                    ]} />
                ]}/>
                <div className={formStatus ? "transaction-state display" : "hide"}>
                    <ValidationBlock status={formStatus} index={1}/>
                </div>
            </div>
            <Footer />
        </div>
    );
};
const Header = ()=>{
    return(
        <header>
            <span>MoneticoPaiement</span>
            <img src="https://pimms77.org/app/uploads/2019/09/LOGO-2-LBP-2019x.jpg" alt="La banque postale"/>
        </header>
    )
}
const SellerInfo = (props)=>{
    return(

        <div className="seller-info">
            <ul className="infos">
                <li><span className="name">Commerçant: </span> <span className="result">moviflix.com</span></li>
                <li><span className="name">Référencte: </span> <span className="result">XDR1P6</span></li>
                <li><span className="name">Montant: </span> <span className="result">{props.price}€</span></li>
            </ul>
            <div className="mentions">
            <i className="fas fa-shield-alt"></i>
                <p>
                    Monético Paiement garantit la confidentialité
                    et la sécurité de vos données.
                </p>
            </div>
        </div>
    )
}
const CardInfo = (props)=>{
    return(

        <div className={`${!props.status ? "card-info  display" : "hide"}`}>
            <div className="header">
                <ul className="accepted">
                    <li><img src="/public/ressources/images/visa.png" alt="image visa" /></li>
                    <li><img src="/public/ressources/images/mastercard.png" alt="image mastercard" /></li>
                    {/* <li><img src="/public/ressources/images/cb.png" alt="image carte bleu" /></li> */}
                </ul>
                <p className="amount">Montant de la transaction: {props.price}€</p>
            </div>
            {props.children.map(child => 
                <React.StrictMode key={1}>
                    {child}
                </React.StrictMode>
            )}
            <div className="mentions">
                <i className="fas fa-info-circle"></i>
                <p>
                    Pour annuler votre paiement et retourner sur 
                    le site de Movifix, cliquez sur le bouton abandonner.
                </p>
            </div>
        </div>
    )

}
const ValidationBlock = (props)=>{
    const [status, setstatus] = useState(true);
    
        useEffect(() => {
            if(props.status){
                setTimeout(() => {
                    setstatus(!status)
                }, 5000);
            }
           
        }, [props.status])
    if(status){
        return(
            <div className="transaction-status transaction-progress">
                <img src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif" alt="" />
                <p>Transaction en cours...</p>
            </div>
        )
    }else{

        return(
            <div className="transaction-status transaction-done">
                <img src="https://images.emojiterra.com/google/android-pie/512px/2714.png" alt="" />
                <p>Transaction validé. Veuillez cliquer <a href="/home">ici</a> afin de routrner sur le site commerçant</p>
            </div>
        )
    }
}
const Footer = ()=>{
    return(
        <div className="footer">
            <p>Le symbole: <i className="fas fa-lock"></i> indique que la transaction est sécurisée</p>
        </div>
    )
}
export default AppTransaction;