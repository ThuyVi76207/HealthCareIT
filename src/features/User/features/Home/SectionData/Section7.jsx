import React from "react";
import { withNamespaces } from "react-i18next";
import Doctor from "./Doctor/Doctor";
import "./Section7Styles.scss";

const Section7 = ({ t }) => {
  return (
    <div className="section7">
      <div className="section7-title">
        <h2 className="uppercase ">{t("section7.title")}</h2>
      </div>
      <div className="section7-content">
        <Doctor />
      </div>
    </div>
  );
};

export default withNamespaces()(Section7);
