import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { getTopDoctorHomeService } from "services/userService";

function Doctor() {

    const [listTopDoctor, setListTopDoctor] = useState([]);
    const { language } = useSelector((state) => state.user) || {};

    console.log('Check language', language);

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
        const printTopDoctorHome = async () => {
            try {
                const res = await getTopDoctorHomeService('10');
                setListTopDoctor(res.data);
            } catch (err) {
                console.log('Failed get top doctor home page', err);
            }
        }
        printTopDoctorHome();

    }, [])

    console.log('Top doctor home page', listTopDoctor)

    return (
        <div className='section-doctor'>
            <div className='share-container'>

                <div className='doctor-body'></div>
                <Slider {...settings}>
                    {listTopDoctor && listTopDoctor.length > 0 && listTopDoctor.map((item, index) => {
                        let nameVi = `${item.positionData.value_Vi}, ${item.lastName} ${item.firstName}`;
                        let nameEn = `${item.positionData.value_En}, ${item.firstName} ${item.lastName}`;

                        return (

                            <div key={index}>
                                <img src={item.image} />
                                <div>{nameVi}</div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default Doctor;