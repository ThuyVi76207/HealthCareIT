import './NavbarStyle.scss';
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { FormattedMessage } from 'react-intl';
// import LogoImg from '../../assets/Hcare.svg';

import { useState } from 'react';
import i18n from '../../function/i18n/i18n';
import { withNamespaces } from 'react-i18next';



const Navbar = ({ t }) => {

    const [language, setLanguage] = useState('vi');

    const [start, setStart] = useState(false);

    // const secRef = useRef();
    useEffect(() => {
        // Define the on-scroll callback
        const callback = function () {
            // const secTop = secRef.current.offsetTop;
            if (window.scrollY >= 100) {
                setStart(true);
            }
            else {
                setStart(false);
            }
        };

        // Attach the callback after the component mounts
        window.addEventListener("scroll", callback);

        // Detach the callback before the component unmounts
        return () => window.removeEventListener("scroll", callback);
    }, []);

    //changeLanguage
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
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
                            <div className='text-item'>0123456894</div>
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
            <div className={start ? 'navbar-down sticky' : 'navbar-down'} id='menuHeader'>
                <div className='header-down'>
                    <div className='left-content'>
                        <div className='child-content'>
                            <Link to={"/home"}><b>{t('navbar.homepage')}</b></Link>
                        </div>
                        <div className='child-content'>
                            <Link to={"/room"}><b>{t('navbar.onlinemedica')}</b></Link>
                        </div>
                        <div className='child-content'>
                            <Link to="#"><b>{t('navbar.forum')}</b></Link>
                        </div>
                        <div className='child-content'>
                            <Link to="#"><b>{t('navbar.healthnews')}</b></Link>
                        </div>
                        <div className='child-content'>
                            <Link to={"/contact"}><b>{t('navbar.contact')}</b></Link>
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


