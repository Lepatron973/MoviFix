import React from 'react';
import Block from '../components/Block';
import DetailCard from '../components/DetailCard';
import HeaderBlock from '../components/HeaderBlock';
const AppDetail = () => {
    return (
        <>
            <HeaderBlock  title="Film" />
            <Block blockNumber="2" customClass="block-detail container" children={[<DetailCard />]} />
        </>
    );
};

export default AppDetail;