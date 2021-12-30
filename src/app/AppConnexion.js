import React,{useState} from 'react';
import HeaderBlock from '../components/HeaderBlock';
import Form from '../components/Form';
import ImageForm from '../components/ImageForm';
import Input from '../components/Input';
const AppConnexion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(false);
   
    return (
        <>
            <HeaderBlock title="Connection"/>
            <Form method="POST" action="/connexion/1" children={[
                <ImageForm image="/public/ressources/images/eye-sauron-bleu.jpg"/>,
                <p className='title'>Veuillez saisir vos informations</p>,
                <div className="input-icon">
                        <i className="fas fa-envelope"></i>
                        <Input type="email" name="email" placeHolder="E-mail" value={email} setValue={setEmail}/>
                     </div>,
                    <div className="input-icon">
                        <i className="fas fa-lock"></i>
                        <Input customClass="password" name="password" type={status ? "text" : "password" } placeHolder="Password" value={password} setValue={setPassword}/>
                        <i className={status ? "fas fa-eye": "fas fa-eye-slash" } onClick={()=>{setStatus(!status)}}></i>
                    </div>,
                    <div className="input-icon">
                        <Input type="submit" name="submit" value={"Connexion"} />
                    </div>
            ]}/>
        </>
    )
};

export default AppConnexion;