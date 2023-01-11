import './FooterStyles.scss';
import hCareWhite from 'assets/Logo/Hcare-white.svg'
import { withNamespaces } from 'react-i18next';

const Footer = ({ t }) => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-container__left">
                    <div className='logo'>
                        <img className='logo-img' src={hCareWhite} alt='logo' />
                    </div>
                    <div className='flex'>
                        <i className='mr-2 text-[20px]'><ion-icon name="business-outline"></ion-icon></i>
                        <h2>371 Nguyễn Kiệm - Phường 03 - Quận Gò Vấp - Tp. Hồ Chí Minh</h2>
                    </div>
                    <div className='flex'>
                        <i className='mr-2 text-[20px]'><ion-icon name="mail-outline"></ion-icon></i>
                        <h2>healthcare@gmail.com</h2>
                    </div>
                    <div>
                        <h2>{t('footer.follow')}</h2>
                        <div className="my-[5px] text-[2.6rem] flex gap gap-2">
                            <span className="text-blue-600 ">
                                <ion-icon name="logo-facebook"></ion-icon>
                            </span>
                            <span className="text-blue-400 ">
                                <ion-icon name="logo-twitter"></ion-icon>
                            </span>
                            <span className="text-red-600 ">
                                <ion-icon name="logo-pinterest"></ion-icon>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="footer-container__right">
                    <h2 className='text-[20px] font-bold'>{t('footer.titlepolicy')}</h2>
                    <div className='mt-2'>
                        <h3 className='mt-1'>{t('footer.policy1')}</h3>
                        <h3 className='mt-1'>{t('footer.policy2')}</h3>
                    </div>
                </div>
            </div>
            <div className="bg-[#9adcdc] pb-[2rem] text-center text-[#0e294d] font-light text-[1rem]">
                <p>
                    © Copyright <span className="text-[#16917c]">HCare {" "}</span><span>{new Date().getFullYear()}</span>
                </p>
            </div>

        </div>
    )
}

export default withNamespaces()(Footer);