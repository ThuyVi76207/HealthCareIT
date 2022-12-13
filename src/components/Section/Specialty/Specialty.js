import React from "react";
import Slider from "react-slick";

const Specialty = () => {
    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />
    };
    return (
        <div className='section-specialty'>
            <div className='share-container'>
                <div className='specialty-header'>
                    <span className='tilte-spec text-center'><FormattedMessage id="homeheader.specialties" /></span>
                    <button className='text-center bg-zinc-300 p-2'><FormattedMessage id="homeheader.see" /></button>
                </div>
                <div className='specialty-body'></div>
                <Slider {...settings}>
                    {
                        dataSpecialty && dataSpecialty.length > 0 &&
                        dataSpecialty.map((item, index) => {
                            return (
                                <div className='specialty-customize'
                                    key={index}
                                    onClick={() => { this.handleViewDeatailSpecialty(item) }}
                                >
                                    <img className='img-sp' src={item.image} alt='' />
                                    <div className='text-specialty'>
                                        {/* <FormattedMessage id="homeheader.musculoskeletal" /> */}
                                        {item.name}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default Specialty