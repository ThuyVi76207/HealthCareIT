import i18n from "function/i18n/i18n";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addLanguage } from "reducers/userSlice";

const NavbarManager = () => {

    const [language, setLanguage] = useState('vi');
    const dispatch = useDispatch();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

        dispatch(addLanguage(lng));

        setLanguage(lng);

    }

    return (
        <div className="flex justify-between w-[95%] mx-auto items-center">
            <div>
                <i className="text-[#1b2342] text-[30px]"><ion-icon name="menu-outline"></ion-icon></i>
            </div>
            <div className="flex items-center gap-3 w-[25%]">
                <div className="flex">
                    <div className={`cursor-pointer hover:text-orange-400 ${language === 'vi' ? 'text-orange-400' : 'text-black'}`}><span onClick={() => changeLanguage('vi')}>VN</span></div>
                    <span className="mx-1">/</span>
                    <div className={`cursor-pointer hover:text-blue-500 ${language === 'en' ? 'text-blue-600' : 'text-black'}`}><span onClick={() => changeLanguage('en')}>EN</span></div>

                </div>
                <i className="bg-slate-100 text-center pt-2 rounded-[50%] w-[40px] h-[40px] text-[20px]"><ion-icon name="mail-unread-outline"></ion-icon></i>
                <i className="bg-slate-100 text-center pt-2 rounded-[50%] w-[40px] h-[40px] text-[20px]"><ion-icon name="call-outline"></ion-icon></i>
                <img className="w-[50px] h-[50px] rounded-[50%] border" src="../logo/Hcare.svg" alt="" />
                <div>
                    <h2 className="text-[15px] font-semibold">ThuyVi</h2>
                    <p className="text-[12px]">Admin</p>
                </div>
            </div>
        </div>
    )
}

export default NavbarManager;