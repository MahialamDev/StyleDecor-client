import React from 'react';
import Hero from './Hero/Hero';
import BuildBase from './BuildBase/BuildBase';
import TopDecorators from './TopDecorators/TopDecorators';
import Coverage from './Coverage/Coverage';
import ContactPage from './ContactPage/ContactPage';
import MyContainer from '../../Layouts/MyContainer';
import HowItWorks from './HowItWorks/HowItWorks';
import FeatureSection from './Feature.jsx/Feature';

const Home = () => {
    return (
        <>
            <Hero />
            <BuildBase />
            <Coverage /> 
            <TopDecorators />
           
            <MyContainer>
                <HowItWorks />
                <FeatureSection />
            </MyContainer>
             <ContactPage />
        </>
    );
};

export default Home;