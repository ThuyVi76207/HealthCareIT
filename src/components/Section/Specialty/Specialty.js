import React from "react";
import { withNamespaces } from "react-i18next";
// import Slider from "react-slick";
import './SpecialtyStyle.scss';


const Specialty = ({ t }) => {
    // let settings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 4,

    // };
    return (
        <div className='section-specialty'>
            <div className='share-container'>
                <div className='specialty-header'>
                    <span className='tilte-spec text-center'>{t('specialty.title')}</span>
                    <button className='text-center bg-zinc-300 p-2'>{t('specialty.see')}</button>
                </div>
                <div className='specialty-body'></div>
                {/* <Slider {...settings}>
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
                                        
                                        {item.name}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider> */}
                {/* <FormattedMessage id="homeheader.musculoskeletal" /> */}
            </div>
        </div>
    )
}

export default withNamespaces()(Specialty)