import React from "react";
// import i18n from '../function/i18n/i18n';
// import { withNamespaces } from 'react-i18next';
import Navbar from "../components/Navbar/Navbar";
import { withNamespaces } from "react-i18next";

const Home = ({ t }) => {
    // const changeLanguage = (lng) => {
    //     i18n.changeLanguage(lng);
    // }
    return (
        <>
            <Navbar />

        </>


        // <div>
        //     <button onClick={() => changeLanguage('vi')}>vi</button>
        //     <button onClick={() => changeLanguage('en')}>en</button>
        //     <h1>{t('Welcome to React')}</h1>
        // </div>
    )
}

export default withNamespaces()(Home)