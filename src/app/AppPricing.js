import React from 'react';
import Block from '../components/Block';
import HeaderBlock from '../components/HeaderBlock';
import Products from '../components/Products';

const AppPricing = () => {
    return (
        <>
            <HeaderBlock title="Produits" />
            <Block blockNumber="2" customClass="block-products" children={[
                <Products />
            ]}/> 
        </>
    );
};

export default AppPricing;