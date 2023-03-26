import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getAllNews } from "services/userService";
import './NewsStyles.scss';

function News() {
    const [listNews, setListNews] = useState([]);
    const navigate = useNavigate();

    let settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />
    };

    useEffect(() => {
        const printAllNews = async () => {
            try {
                const res = await getAllNews('5');
                setListNews(res.data);
            } catch (err) {
                console.log('Failed to get all news', err);
            }
        }
        printAllNews();
    }, [])

    // console.log('Check list News', listNews);

    const handleViewDetailNews = (item) => {
        console.log('Check News id', item);
        navigate(`/healthcare/detail-news/${item.id}`)

    }

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
                                    onClick={() => handleViewDetailNews(item)}
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