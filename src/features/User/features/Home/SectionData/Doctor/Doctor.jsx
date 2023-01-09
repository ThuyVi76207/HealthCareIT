import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { getTopDoctorHomeService } from "services/userService";
import { Buffer } from "buffer";
import './DoctorStyles.scss';

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

                        let imageBase64 = '';
                        if (item.image) {
                            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                        }

                        let nameVi = `${item.positionData.value_Vi}, ${item.lastName} ${item.firstName}`;
                        let nameEn = `${item.positionData.value_En}, ${item.firstName} ${item.lastName}`;
                        console.log('Check image', item.image)

                        return (

                            <div className="doctor-customize" key={index}>
                                <img className='doctor-image rounded-full m-auto' style={{ height: "140px", width: "140px" }} src={imageBase64} />
                                <div className='text-doctor'><b>{language === 'vi' ? nameVi : nameEn}</b></div>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default Doctor;