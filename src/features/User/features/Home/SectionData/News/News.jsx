import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { getAllNews } from 'services/userService';
import './NewsStyles.scss';
import loadingAPI from 'assets/Loading/LoadingAPI.gif';

function News() {
  const [listNews, setListNews] = useState([]);
  const navigate = useNavigate();

  let settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000,
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          autoplay: true,
          autoplaySpeed: 5000,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };

  useEffect(() => {
    const printAllNews = async () => {
      try {
        const res = await getAllNews('5');
        setListNews(res.data);
      } catch (err) {
        alert('Failed to get all news');
        // console.log("Failed to get all news", err);
      }
    };
    printAllNews();
  }, []);

  // console.log('Check list News', listNews);

  const handleViewDetailNews = (item) => {
    // console.log('Check News id', item);
    navigate(`/healthcare/detail-news/${item.id}`);
  };

  return (
    <div className="section-news">
      <div className="news-container">
        {listNews.length === 0 && (
          // <img className="w-[365px] mx-auto" src={loadingAPI} alt="loading" />
          <div className="container-loading">
            <div className="container-loading_text">
              <h1>Loading...</h1>
            </div>
            <div className="container-loading_body">
              <div className="line-box">
                <div className="line"></div>
              </div>
            </div>
          </div>
        )}
        <Slider {...settings}>
          {listNews.map((item, index) => {
            return (
              <div
                className=" mx-2 cursor-pointer"
                key={index}
                onClick={() => handleViewDetailNews(item)}
              >
                <div className="bg-white news-container__item  transition-[0.5s] hover:transform  hover:scale-[0.95]  overflow-hidden hover:shadow-[0_1px_3px_3px_#ccc3c3] hover:text-[#16917c]">
                  <img className="img-news" src={item.image} alt={index} />
                  <div className="text-center mt-2 font-bold  ">
                    {item.name}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default News;
