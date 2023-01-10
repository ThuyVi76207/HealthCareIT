import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getAllNews } from "services/userService";
import './NewsStyles.scss';

function News() {
    const [listNews, setListNews] = useState([]);

    let settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />
    };

    useEffect(() => {
        const printAllNews = async () => {
            try {
                const res = await getAllNews();
                setListNews(res.data);
            } catch (err) {
                console.log('Failed to get all news', err);
            }
        }
        printAllNews();
    }, [])

    console.log('Check list News', listNews);

    return (
        <div className="section-news">
            <div className="news-container">
                <Slider {...settings}>
                    {
                        listNews.map((item, index) => {
                            return (
                                <div
                                    className="mx-2"
                                    key={index}
                                >
                                    <img className="img-news" src={item.image} alt={index} />
                                    <div className="text-center mt-2">{item.name}</div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default News;