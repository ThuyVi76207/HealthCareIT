import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import loadingAPI from 'assets/Loading/LoadingAPI.gif';

import { getAllSpecialty } from 'services/userService';
import './SpecialtyStyles.scss';

// SpecialtyHome.prototype = {

// }

function Specialty() {
  const [listSpecialty, setListSpecialty] = useState([]);
  const navigate = useNavigate();

  let settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
    ],
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };

  useEffect(() => {
    const printAllSpecialty = async () => {
      try {
        const res = await getAllSpecialty();
        // console.log(res);
        setListSpecialty(res.data);
      } catch (error) {
        alert('Failed to get list Specialty');
        // console.log("Failed to get list Specialty: ", error);
      }
    };
    printAllSpecialty();
  }, []);
  // console.log('List Specialty: ', listSpecialty);

  const handleViewDetailSpecialty = (item) => {
    // console.log('Check Special', item);
    const itemSpecialtyUrl = `/healthcare/detail-speacilty/${item.id}`;
    navigate(itemSpecialtyUrl);
  };

  return (
    <div className="section-specialty">
      <div className="share-container">
        {listSpecialty.length === 0 && (
          // <img className="w-[365px] mx-auto" src={loadingAPI} alt="loading" />
          <div className="container-loading">
            <div className="container-loading_text">
              <h1>vui lòng chờ trong giây lát...</h1>
            </div>
            <div className="container-loading_body">
              <div className="line-box">
                <div className="line"></div>
              </div>
            </div>
          </div>
        )}
        <Slider {...settings}>
          {listSpecialty &&
            listSpecialty.length > 0 &&
            listSpecialty.map((item, index) => {
              return (
                <div
                  className="specialty-customize"
                  key={index}
                  onClick={() => handleViewDetailSpecialty(item)}
                >
                  <img className="img-sp" src={item.image} alt={index} />
                  <div className="text-specialty font-bold">{item.name}</div>
                </div>
              );
            })}
          <div className="specialty-customize"></div>
        </Slider>
      </div>
    </div>
  );
}

export default Specialty;
