import Loading from 'components/Loading/loading';
import { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import {
  postPaymentPaypal,
  postPaymentVNPay,
  postVerifyBooking,
} from 'services/userService';
import { getFormattedPriceUSD } from 'function/formater';

const VerifyBooking = ({ t }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let urlParam = new URLSearchParams(window.location.search);
    let token = urlParam.get('token');
    let doctorId = urlParam.get('doctorId');
    let data = {
      token: token,
      doctorId: doctorId,
    };
    let paymentMethod = localStorage.getItem('paymentMethod');
    // console.log(paymentMethod);
    setLoading(true);

    const verifyBooking = async () => {
      try {
        let res = await postVerifyBooking(data);
        // console.log("Check booking", res);
        if (res && res.errCode === 0) {
          setLoading(false);
          const urlParams = new URLSearchParams(window.location.search);
          const tokenID = urlParams.get('token');
          const doctorId = urlParams.get('doctorId');
          const price = localStorage.getItem('price');

          // console.log("Check token", tokenID);
          // console.log("Check doctor", doctorId);
          localStorage.setItem('tokenID', `${tokenID}`);
          localStorage.setItem('doctorId', `${doctorId}`);

          // console.log('Check price to vnd', price);

          const priceToUsd = parseInt(price) / 23580;

          const priceFormat = getFormattedPriceUSD(priceToUsd).slice(1);

          // console.log('Check price to usd', priceFormat);
          if (paymentMethod === '12') {
            let res = await postPaymentPaypal(priceFormat);
            if (res && res.forwardLink) {
              window.location.href = res.forwardLink;
            }
            // console.log('Check paypal', res);
          } else {
            let res = await postPaymentVNPay(price);
            if (res && res.data) {
              window.location.href = res.data;
            }
            // console.log('check payemnt vnpay', res);
          }
        }
      } catch (error) {
        setLoading(false);
        alert('Có lỗi xảy ra vui lòng thử lại!!!');
        // console.log('Faild to API verify booking', error);
      }
    };
    verifyBooking();
  }, []);

  return (
    <>
      <Loading loading={loading} />

      {!loading ? (
        <div className="bg-[#d8f2f1] relative w-full h-[100vh]">
          <div className="bg-white absolute top-[20%] left-[35%] w-[500px] h-[300px]">
            <div className="bg-[#16917c] h-[50%] flex items-center">
              <div className="bg-[#16917c] border-[3px] border-white mx-auto h-[80px] w-[80px] rounded-[50%] flex justify-center items-center">
                <i className="font-extrabold pt-1 pl-1 text-[45px] text-white">
                  <ion-icon name="checkmark-outline"></ion-icon>
                </i>
              </div>
            </div>

            <div className="h-[50%] text-center">
              <h2 className="text-[25px] font-bold mt-3">
                {t('verifyBooking.title')}!
              </h2>
              <p className="font-medium mt-1">
                {t('verifyBooking.description')}
              </p>
              <p className="font-medium mt-1">{t('verifyBooking.note')}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default withNamespaces()(VerifyBooking);
