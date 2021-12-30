import React from 'react';

const ImageForm = (props) => {
    return (
        <div className="form-image">
            <img src={props.image} alt="image du formulaire" />
        </div>
    );
};

export default ImageForm;