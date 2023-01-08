import React from "react";
import { withNamespaces } from "react-i18next";
import Specialty from "./Specialty/Specialty";

function Section3({ t }) {
    return (
        <div className="section3">
            <div>
                <h2>{t('section3.title')}</h2>
            </div>
            <Specialty />
        </div>
    )
}

export default withNamespaces()(Section3);