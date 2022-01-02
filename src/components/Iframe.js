import React from 'react';

const Iframe = (props) => {
    if(props.display){

        return (
            <div className="video-container">
                <p><span>Bande annonce</span> <i className="fas fa-window-close" onClick={()=> props.setDisplay(!props.display)}></i></p>
                <div className="iframe-content">
                    <iframe  width="900" height="400" src={`https://www.youtube.com/embed/${props.video}`}
                    title="YouTube video player" frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen></iframe>
                </div>
            </div>
        )
    }else{
        return <></>;
    }
};

export default Iframe;