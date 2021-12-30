import React from 'react';

const HeaderBlock = (props) => {
    return (
        <section className="block block-1 header-block">
            <div className="block-1-content container">
                <h1>
                    {props.title}
                </h1>
            </div>
        </section>
    )
}

export default HeaderBlock;