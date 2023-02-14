import './NavbarStyle.scss';
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { FormattedMessage } from 'react-intl';
// import LogoImg from '../../assets/Hcare.svg';

import { useState } from 'react';
import i18n from '../../../../function/i18n/i18n';
import { withNamespaces } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addLanguage } from 'reducers/userSlice';



const Navbar = ({ t }) => {

    const dispatch = useDispatch()



    const [language, setLanguage] = useState('vi');

    const [activeSroll, setActiveSroll] = useState(false);
    useEffect(() => {
        const handleSroll = () => {
            const isSrollFarFromTop = window.scrollY > 50;
            // console.log('isSrollFarFromTop', isSrollFarFromTop);
            setActiveSroll(isSrollFarFromTop)
        }
        window.addEventListener('scroll', handleSroll);
        return () =>
            window.removeEventListener('scroll', handleSroll);
    }, []);

    //changeLanguage
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

        dispatch(addLanguage(lng));

        setLanguage(lng);

    }











    return (
        <div className='navbar-common'>
            <div className='navbar-up'>
                <div className='header-up'>
                    <img className='h-[3.125rem]' src='/logo/Hcare.svg' alt='' />
                    <div className='flex w-[42%] justify-between'>
                        <a href="mailto:healthcare@gmail.com" className='content-item'>
                            <i className='fa fa-envelope'></i>
                            <div className='text-item'>healthcare@gmail.com</div>
                        </a>

                        <a href="tel:0123456894" className='content-item'>
                            <i className='fa fa-phone'></i>
                            <div className='text-item font-sans'>0123456894</div>
                        </a>
                        <div className='content-item'>
                            <i className='fa fa-registered'></i>
                            <div className='text-item'>{t('navbar.register')}</div>
                        </div>
                        <div className='content-item'>
                            <i className='fa fa-user'></i>
                            <div className='text-item'>{t('navbar.login')}</div>
                        </div>
                    </div>
                </div>
            </div>
            {activeSroll && <div className='h-[50px]'></div>}
            <div className={activeSroll ? 'navbar-down navbar-down__active' : 'navbar-down'} id='menuHeader'>
                <div className='header-down'>
                    <div className='left-content'>
                        <div className='child-content'>
                            <Link to={"/healthcare"}><b>{t('navbar.homepage')}</b></Link>
                        </div>
                        <div className='child-content'>
                            {/* <Link to={"/healthcare/online-examination"}></Link> */}
                            <a href={"/healthcare/online-examination"}><b>{t('navbar.onlinemedica')}</b></a>
                        </div>
                        <div className='child-content'>
                            <Link to={"/healthcare/forum"}><b>{t('navbar.forum')}</b></Link>
                        </div>
                        <div className='child-content'>
                            <Link to={"/healthcare/news"}><b>{t('navbar.healthnews')}</b></Link>
                        </div>
                        <div className='child-content'>
                            <Link to={"/healthcare/contact"}><b>{t('navbar.contact')}</b></Link>
                        </div>

                    </div>
                    <div className='change-language'>
                        <i className='text-[20px] mr-[5px] mt-[5px]'>
                            <ion-icon name="earth-outline"></ion-icon>
                        </i>

                        <div className={`cursor-pointer hover:text-orange-400 ${language === 'vi' ? 'text-orange-400' : 'text-black'}`}><span onClick={() => changeLanguage('vi')}>VN</span></div>
                        <div className='mx-1'>/</div>
                        <div className={`cursor-pointer hover:text-blue-500 ${language === 'en' ? 'text-blue-600' : 'text-black'}`}><span onClick={() => changeLanguage('en')}>EN</span></div>
                    </div>

                </div>
            </div>


        </div>

    )
}

export default withNamespaces()(Navbar)


