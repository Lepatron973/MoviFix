import React, {useState} from 'react';
import Block from '../components/Block';
import Form from '../components/Form';
import HeaderBlock from '../components/HeaderBlock';
import ImageForm from '../components/ImageForm';
import Input from '../components/Input';
import {checkRegistrationPasswordIsOk,checkValidEmail,AjaxRequest, ajaxPath} from '../utilities';
const AppInscription = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [status, setStatus] = useState(false);
    const [file, setFile] = useState("");
    let alertMessage;
    const handleSubmit = (e)=> {
        e.preventDefault()
        if(!checkRegistrationPasswordIsOk(password,password2)){
            let passwordInputs = document.querySelectorAll(".password");
            for(let input of passwordInputs){
                input.style.borderColor = "red";
                
                // input.style.aftervalue = "votre mots de passe doit comporter 8 charactère minimum + majuscule,minuscule,chiffre."
            }
        }
        console.log()
        const req =  AjaxRequest("test","salut");
        fetch(req)
        console.log(checkValidEmail(email))
    }
    return (
        <div>
            <HeaderBlock title="Inscription" />
            <Block blockNumber="2" customClass="block-inscription container" children={[
                
                <Form method="POST" action="/inscription/addUser" onSubmit={handleSubmit} children={[
                    <ImageForm image="https://cdn.futura-sciences.com/buildsv6/images/wide1920/1/8/a/18a0ef0c93_50178875_oeil-sauron.jpg"/>,
                    <p className='title'>Veuillez saisir vos informations</p>,
                    <div className="input-icon">
                       <i className="fas fa-user"></i>
                        <Input type="text" name="firstname" placeHolder="Nom" value={firstname} setValue={setFirstName}/>
                    </div>,
                    <div className="input-icon">
                       <i className="fas fa-user"></i>
                        <Input type="text" name="lastname" placeHolder="Prénom" value={lastname} setValue={setLastName}/>
                    </div>,
                    <div className="input-icon">
                        <i className="fas fa-envelope"></i>
                        <Input type="email" name="email" placeHolder="E-mail" value={email} setValue={setEmail}/>
                        <p className="alert">{alertMessage}</p>
                     </div>,
                    <div className="input-icon">
                        <i className="fas fa-lock"></i>
                        <Input customClass="password" name="password" type={status ? "text" : "password" } placeHolder="Password" value={password} setValue={setPassword}/>
                        <i className={status ? "fas fa-eye": "fas fa-eye-slash" } onClick={()=>{setStatus(!status)}}></i>
                        <p className="alert">{alertMessage}</p>
                    </div>,
                    <div className="input-icon">
                        <i className="fas fa-lock"></i>
                        <Input customClass="password" name="confirm-password" type={status ? "text" : "password" } placeHolder="Confirmer Password" value={password2} setValue={setPassword2}/>
                        <i className={status ? "fas fa-eye": "fas fa-eye-slash" } onClick={()=>{setStatus(!status)}}></i>
                        <p className="alert">{alertMessage}</p>
                    </div>,
                    <div className="input-icon">
                        <Input type="file" name="image" value={file} setValue={setFile} accept=".jpg, .jpeg, .png, .svg"/>
                    </div>,
                    <div className="input-icon">
                        <Input type="submit" name="submit" value={"Valider"} />
                    </div>,
                ]}/>
            ]}/>
        </div>
    );
};

export default AppInscription;