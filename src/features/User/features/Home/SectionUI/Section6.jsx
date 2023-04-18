import React from "react";
import { withNamespaces } from "react-i18next";
import { Link } from "react-router-dom";
import "./Section6Styles.scss";

const Section6 = ({ t }) => {
  return (
    <div className="section6">
      <div className="section6-container">
        <div className="section6-container__title">
          <h2>{t("section6.title1")}</h2>
          <h2>{t("section6.title2")}</h2>
        </div>
        <div className="section6-container__btn">
          <Link to={"/healthcare/contact"}>
            <b className="font-semibold">{t("section6.button")}</b>
          </Link>
          {/* <a  href="/"></a> */}
        </div>
      </div>
    </div>
  );
};

export default withNamespaces()(Section6);
