import logo from 'assets/Logo/Hcare-white.svg';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';

const Menu = ({ t }) => {



    return (
        <div className="bg-[#1b2342] flex flex-col items-center absolute left-0 w-[20%] h-full">
            <div className="opacity-95 bg-[#27284a] w-full">
                <img className="w-[120px] h-[120px] m-auto" src={logo} alt="logo" />
            </div>
            <div className="text-[#fff]">
                <ul>
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

                    </li>
                </ul>
            </div>

        </div>
    )
}

export default withNamespaces()(Menu);