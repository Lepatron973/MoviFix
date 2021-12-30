import React from 'react';

const Form = (props) => {
    let i = 0;
    return (
        <form method={props.method} action={props.action} onSubmit={props.onSubmit} encType='multipart/form-data'>
            {props.children.map(input => (
                <React.StrictMode key={i++}>
                    {input}
                </React.StrictMode>
            ))}
        </form>
    );
};

export default Form;