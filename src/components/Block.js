import React from 'react';

const Block = (props) => {
    let i = 0;
    return (
        <section className={`block block-${props.blockNumber}`}>
            <div className= {`block-${props.blockNumber}-content container ${props.customClass}`}>
                {props.children.map(elementDOM => (
                    < React.StrictMode key={i++}>
                        {elementDOM}
                    </React.StrictMode>
                ))}
            </div>
        </section>
    );
};

export default Block;