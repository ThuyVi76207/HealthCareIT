import React from "react";
// import i18n from '../function/i18n/i18n';
// import { withNamespaces } from 'react-i18next';
import MainLayout from "../layouts/MainLayout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Banner from "../components/Banner/Banner";

const Home = () => {
    // const changeLanguage = (lng) => {
    //     i18n.changeLanguage(lng);
    // }

    return (
        <MainLayout>
            <Banner />
        </MainLayout>



        // <div>
        //     <button onClick={() => changeLanguage('vi')}>vi</button>
        //     <button onClick={() => changeLanguage('en')}>en</button>
        //     <h1>{t('Welcome to React')}</h1>
        // </div>
    )
}

export default Home