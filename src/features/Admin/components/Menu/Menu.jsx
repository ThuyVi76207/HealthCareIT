import logo from 'assets/Logo/Hcare-white.svg';
import { USER_ROLES } from 'constants';
import { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { adminMenu, doctorMenu, healthStaffMenu } from './OptionMenu';

const Menu = ({ t }) => {

    const rolID = sessionStorage.getItem('role');
    const profileuser = JSON.parse(localStorage.getItem(`${rolID}`));

    console.log("check profile login", profileuser)

    const [menuUrl, setMenuUrl] = useState([]);
    useEffect(() => {

        let menu = [];
        if (profileuser && profileuser.roleId) {
            let role = profileuser.roleId;
            if (role === USER_ROLES.ADMIN) {
                menu = adminMenu;
                setMenuUrl(menu);
            }
            if (role === USER_ROLES.DOCTOR) {
                menu = doctorMenu;
                setMenuUrl(menu);
            }
            if (role === USER_ROLES.STAFF) {
                menu = healthStaffMenu;
                setMenuUrl(menu);
            }
        }

    }, [profileuser])

    console.log("Check menuURl", menuUrl);
    // let icon = `grid-outline`;

    return (
        <div className="bg-[#1b2342] flex flex-col items-center absolute left-0 w-[20%] h-full">
            <div className="opacity-95 bg-[#27284a] w-full">
                <img className="w-[120px] h-[120px] m-auto" src={logo} alt="logo" />
            </div>
            <div className="text-[#fff]">
                <ul>
                    {
                        menuUrl.map((item, index) => {
                            return (
                                <li key={index} className='my-3 cursor-pointer hover:text-[#16917c]'>
                                    <Link className="flex items-center w-full" to={item.link}>
                                        <i className='mt-1 mr-4'><ion-icon name={item.icon}></ion-icon></i>
                                        <h2>{t(item.name)}</h2>
                                    </Link>

                                </li>
                            )
                        })
                    }

                    {/* 
                    <li className='my-3 cursor-pointer hover:text-[#16917c]'>
                                    <Link className="flex items-center w-full" to={"/manager"}>
                                        <i className='mt-1 mr-4'><ion-icon name="grid-outline"></ion-icon></i>
                                        <h2>{t('menu.dashboard')}</h2>
                                    </Link>

                                </li>
                    <li className='my-3 cursor-pointer hover:text-[#16917c]'>
                        <Link className="flex items-center w-full" to={"/manager/usermanager"}>
                            <i className='mt-1 mr-4'><ion-icon name="people-outline"></ion-icon></i>
                            <h2>{t('menu.usermanager')}</h2>
                        </Link>

                    </li>
                    <li className='my-3 cursor-pointer hover:text-[#16917c]'>
                        <Link className="flex items-center w-full" to={"/manager/doctormanager"}>
                            <i className='mt-1 mr-4'><ion-icon name="fitness-outline"></ion-icon></i>
                            <h2>{t('menu.doctormanager')}</h2>
                        </Link>

                    </li>
                    <li className='my-3 cursor-pointer hover:text-[#16917c]'>
                        <Link className="flex items-center w-full" to={"/manager/planmanager"}>
                            <i className='mt-1 mr-4'><ion-icon name="time-outline"></ion-icon></i>
                            <h2>{t('menu.planmanager')}</h2>
                        </Link>

                    </li>
                    <li className='my-3 cursor-pointer hover:text-[#16917c]'>
                        <Link className="flex items-center w-full" to={"/manager/specialtymanager"}>
                            <i className='mt-1 mr-4'><ion-icon name="layers-outline"></ion-icon></i>
                            <h2>{t('menu.specialtymanager')}</h2>
                        </Link>

                    </li>
                    <li className='my-3 cursor-pointer hover:text-[#16917c]'>
                        <Link className="flex items-center w-full" to={"/manager/newsmanager"}>
                            <i className='mt-1 mr-4'><ion-icon name="newspaper-outline"></ion-icon></i>
                            <h2>{t('menu.newsmanager')}</h2>
                        </Link>

                    </li>
                    <li className='my-3 cursor-pointer hover:text-[#16917c]'>
                        <Link className="flex items-center w-full" to={"/manager/medicinemanager"}>
                            <i className='mt-1 mr-4'><ion-icon name="flask-outline"></ion-icon></i>
                            <h2>{t('menu.medicine')}</h2>
                        </Link>

                    </li> */}
                </ul>
            </div>

        </div>
    )
}

export default withNamespaces()(Menu);