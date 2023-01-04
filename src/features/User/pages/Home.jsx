import React from "react";
// import i18n from '../function/i18n/i18n';
// import { withNamespaces } from 'react-i18next';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainLayout from "features/User/layouts/MainLayout";
import Section1 from "../features/Home/SectionUI/Section1";
import Section2 from "../features/Home/SectionUI/Section2";
import Banner from "components/Banner/Banner";
import SpecialtyHome from "../features/Home/SectionData/SpecialtyHome";
// import Specialty from "../components/Section/Specialty/Specialty";

const Home = () => {
    // const changeLanguage = (lng) => {
    //     i18n.changeLanguage(lng);
    // }

    return (
        <MainLayout>
            <Banner />
            <Section1 />
            <Section2 />
            <SpecialtyHome />
            {/* <Specialty /> */}
        </MainLayout >



        // <div>
        //     <button onClick={() => changeLanguage('vi')}>vi</button>
        //     <button onClick={() => changeLanguage('en')}>en</button>
        //     <h1>{t('Welcome to React')}</ h1>
        // </div>
    )
}

export default Home