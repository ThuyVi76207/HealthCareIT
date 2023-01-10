import React from "react";
import { withNamespaces } from "react-i18next";
import Specialty from "./Specialty/Specialty";
import Doctor from "./Doctor/Doctor";
import './Section3Styles.scss';

function Section3({ t }) {
    return (
        <div className="section3">
            <div className="section3-title">
                <h2 className="uppercase">{t('section3.title')}</h2>
            </div>
            <div className="section3-conten">
                <Specialty />
                <Doctor />
            </div>

        </div>
    )
}

export default withNamespaces()(Section3);