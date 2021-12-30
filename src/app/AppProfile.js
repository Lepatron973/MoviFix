import React,{useState,useEffect} from 'react';
import HeaderBlock from '../components/HeaderBlock';
import Block from '../components/Block';
import Form from '../components/Form';
import ImageForm from '../components/ImageForm';
import Input from '../components/Input';
import {AjaxRequest,checkValidEmail,getProfile} from '../utilities';

const AppProfile = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [status, setStatus] = useState(false);
    const [file, setFile] = useState("");
    const [profile, setProfile] = useState("")
    const [img, setimg] = useState("https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png");
    const handleSubmit = (e)=> {
        // console.log(checkRegistrationPasswordIsOk(password,password2))
        console.log(checkValidEmail(email))
    }
   
    useEffect(()=>{
        const req = AjaxRequest("getProfile");
        fetch(req)
        .then(res=>{return res.json()})
        .then(res => {
            setFirstName(res.firstname)
            setLastName(res.lastname)
            setEmail(res.email)
            setimg(`/public/ressources/uploads/${res.image}`);
        })

       

    },[]);
    console.log(profile)
    return (
        <>
            <HeaderBlock title="Profile"/>
            <Block blockNumber="2" className="block-profil-content container" children={[
                <Form method="POST" action="/profile/update" enctype="multipart/form-data" children={[
                    <ImageForm image={img} />,
                    <p className="title"> Modification du profile</p>,
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
                     </div>,
                    <div className="input-icon">
                        <i className="fas fa-lock"></i>
                        <Input customClass="password" name="password" type={status ? "text" : "password" } placeHolder="Password" value={password} setValue={setPassword}/>
                        <i className={status ? "fas fa-eye": "fas fa-eye-slash" } onClick={()=>{setStatus(!status)}}></i>
                    </div>,
                    <div className="input-icon">
                        <i className="fas fa-lock"></i>
                        <Input customClass="password" name="confirm-password" type={status ? "text" : "password" } placeHolder="Confirmer Password" value={password2} setValue={setPassword2}/>
                        <i className={status ? "fas fa-eye": "fas fa-eye-slash" } onClick={()=>{setStatus(!status)}}></i>
                    </div>,
                    <div className="input-icon">
                        <Input type="file" name="image" value={file} setValue={setFile} accept=".jpg, .jpeg, .png, .svg"/>
                    </div>,
                    <div className="input-icon">
                        <Input type="submit" name="submit" value={"Enregistrer"} />
                    </div>,
                ]}/>
            ]} />
        </>
    );
};

export default AppProfile;