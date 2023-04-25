import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MainLayout from "features/User/layouts/MainLayout";
import Section1 from "../features/Home/SectionUI/Section1";
import Section2 from "../features/Home/SectionUI/Section2";
import Banner from "features/User/components/Banner/Banner";
import Section3 from "../features/Home/SectionData/Section3";
import Section4 from "../features/Home/SectionUI/Section4";
import Section5 from "../features/Home/SectionData/Section5";
import Section6 from "../features/Home/SectionUI/Section6";
import Section7 from "../features/Home/SectionData/Section7";
import Section8 from "../features/Home/SectionUI/Section8";
import Chatbot from "../components/Chatbot/Chatbot";

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
      <Section7 />
      <Section8 />
      <Section5 />
      <Section6 />
      <Chatbot />
    </MainLayout>

    // <div>
    //     <button onClick={() => changeLanguage('vi')}>vi</button>
    //     <button onClick={() => changeLanguage('en')}>en</button>
    //     <h1>{t('Welcome to React')}</ h1>
    // </div>
  );
};

export default Home;
