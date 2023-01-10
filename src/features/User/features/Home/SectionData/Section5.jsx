import React from "react";
import { withNamespaces } from "react-i18next";
import News from "./News/News";
import './Section5Styles.scss';

const Section5 = ({ t }) => {
    return (
        <div className="section5">
            <div className="section5-title">
                <h2 className="uppercase">{t('section5.title')}</h2>
            </div>
            <div className="section5-content">
                <News />
            </div>

        </div>
    )
}

export default withNamespaces()(Section5);