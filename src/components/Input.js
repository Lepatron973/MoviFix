import React from 'react';

const Input = (props) => {
    return (
        <>
            <input className={props.customClass} type={props.type} name={props.name} placeholder={props.placeHolder} value={props.value} accept={props.accept} onChange={ (e) => props.setValue(e.target.value)}/>
        </>
    );
};

export default Input;