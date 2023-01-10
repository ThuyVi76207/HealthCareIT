import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import i18n from '../function/i18n/i18n';
// import { withNamespaces } from 'react-i18next';

import MainLayout from "features/User/layouts/MainLayout";
import Section1 from "../features/Home/SectionUI/Section1";
import Section2 from "../features/Home/SectionUI/Section2";
import Banner from "components/Banner/Banner";
import Section3 from "../features/Home/SectionData/Section3";
import Section4 from "../features/Home/SectionUI/Section4";
import Section5 from "../features/Home/SectionData/Section5";

const Home = () => {
    // const changeLanguage = (lng) => {
    //     i18n.changeLanguage(lng);
    // }

    return (
        <MainLayout>
            <Banner />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
        </MainLayout >



        // <div>
        //     <button onClick={() => changeLanguage('vi')}>vi</button>
        //     <button onClick={() => changeLanguage('en')}>en</button>
        //     <h1>{t('Welcome to React')}</ h1>
        // </div>
    )
}

export default Home