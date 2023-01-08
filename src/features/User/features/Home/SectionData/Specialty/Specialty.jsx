import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { getAllSpecialty } from "services/userService";
import './SpecialtyStyles.scss';

// SpecialtyHome.prototype = {

// }

function Specialty() {
    const [listSpecialty, setListSpecialty] = useState([]);
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
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