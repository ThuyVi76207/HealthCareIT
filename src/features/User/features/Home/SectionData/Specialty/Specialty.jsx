import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { getAllSpecialty } from "services/userService";
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
                console.log("Failed to get list Specialty: ", error);
            }
        }
        printAllSpecialty();

    }, []);
    // console.log('List Specialty: ', listSpecialty);

    const handleViewDetailSpecialty = (item) => {
        console.log('Check Special', item);
        const itemSpecialtyUrl = `/healthcare/detail-speacilty/${item.id}`
        navigate(itemSpecialtyUrl);
    }

    return (
        <div className="section-specialty">
            <div className="share-container">
                <Slider {...settings}>
                    {
                        listSpecialty && listSpecialty.length > 0 &&
                        listSpecialty.map((item, index) => {
                            return (
                                <div
                                    className="specialty-customize"
                                    key={index}
                                    onClick={() => handleViewDetailSpecialty(item)}
                                >
                                    <img className='img-sp' src={item.image} alt={index} />
                                    <div className='text-specialty'>{item.name}</div>
                                </div>
                            )
                        })
                    }

                </Slider>
            </div>


        </div>
    )
}

export default Specialty;