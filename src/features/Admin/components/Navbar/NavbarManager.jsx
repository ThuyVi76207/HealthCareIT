import { ROLE_OPTIONS } from "constants";
import i18n from "function/i18n/i18n";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLanguage } from "reducers/userSlice";
import { Buffer } from "buffer";

const NavbarManager = () => {

    const [language, setLanguage] = useState('vi');
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profileuser);
    // console.log("chek profile", profile)

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);

        dispatch(addLanguage(lng));

        setLanguage(lng);

    }

    let nameVi, nameEn;
    if (profile && profile.lastName && profile.firstName) {
        nameVi = `${profile.lastName} ${profile.firstName}`;
        nameEn = `${profile.firstName} ${profile.lastName}`;
    }

    let imageBase64 = '';
    if (profile.image) {
        imageBase64 = Buffer.from(profile.image, 'base64').toString('binary');
    }

    return (
        <div className="flex justify-between w-[95%] mx-auto items-center">
            <div>
                <i className="text-[#1b2342] text-[30px]"><ion-icon name="menu-outline"></ion-icon></i>
            </div>
            <div className="flex items-center gap-3 py-2">
                <div className="flex">
                    <div className={`cursor-pointer hover:text-orange-400 ${language === 'vi' ? 'text-orange-400' : 'text-black'}`}><span onClick={() => changeLanguage('vi')}>VN</span></div>
                    <span className="mx-1">/</span>
                    <div className={`cursor-pointer hover:text-blue-500 ${language === 'en' ? 'text-blue-600' : 'text-black'}`}><span onClick={() => changeLanguage('en')}>EN</span></div>
                </div>
                <i className="bg-slate-100 text-center pt-2 rounded-[50%] w-[40px] h-[40px] text-[20px]"><ion-icon name="mail-unread-outline"></ion-icon></i>
                <i className="bg-slate-100 text-center pt-2 rounded-[50%] w-[40px] h-[40px] text-[20px]"><ion-icon name="call-outline"></ion-icon></i>
                <img className="w-[50px] h-[50px] rounded-[50%] border" src={imageBase64} alt="" />
                <div>
                    <h2 className="text-[17px] font-semibold">{language === 'vi' ? nameVi : nameEn}</h2>
                    {
                        ROLE_OPTIONS.map((item, index) => {
                            return (
                                item.value === profile.roleId
                                    ?
                                    <p key={index} className="text-[15px] font-semibold">{language === 'vi' ? item.label.vi : item.label.en}</p>
                                    :
                                    ''
                            )
                        })
                    }
                </div>
                <a className="p-3" href='/manager/login'><i className="fas fa-sign-out-alt"></i></a>
            </div>
        </div>
    )
}

export default NavbarManager;