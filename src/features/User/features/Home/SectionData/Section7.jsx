import React from "react";
import { withNamespaces } from "react-i18next";
import Doctor from "./Doctor/Doctor";
import './Section5Styles.scss';

const Section7 = ({ t }) => {
    return (
        <div className="section5">
            <div className="section5-title">
                <h2 className="uppercase mb-[50px]">{t('section7.title')}</h2>
            </div>
            <div className="section5-content">
                <Doctor />
            </div>

        </div>
    )
}

export default withNamespaces()(Section7);