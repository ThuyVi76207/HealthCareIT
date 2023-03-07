import { useEffect } from "react";
import { withNamespaces } from "react-i18next";
import { successPay } from "services/userService";

const PaymentSuccess = ({ t }) => {
    // let url = window.location
    let urlParam = new URLSearchParams(window.location.search)
    console.log("Check ủl", urlParam)
    let PayerID = urlParam.get('PayerID');
    let paymentId = urlParam.get('paymentId');
    console.log('payerid', PayerID);
    console.log('paymentid', paymentId);
    useEffect(() => {
        const paymentSuccess = async () => {
            await successPay({
                PayerID: PayerID,
                paymentId: paymentId
            })
        }

        paymentSuccess();
    })


    return (
        <div className="bg-[#d8f2f1] relative w-full h-[100vh]">
            <div className="bg-white absolute top-[20%] left-[35%] w-[500px] h-[300px]">
                <div className="bg-[#16917c] h-[50%] flex items-center">
                    <div className="bg-[#16917c] border-[3px] border-white mx-auto h-[80px] w-[80px] rounded-[50%] flex justify-center items-center">
                        <i className="font-extrabold pt-1 pl-1 text-[45px] text-white"><ion-icon name="checkmark-outline"></ion-icon></i>
                    </div>
                </div>

                <div className="h-[50%] text-center">
                    <h2 className="text-[25px] font-bold mt-3">{t('verifyBooking.title')}!</h2>
                    <p className="font-medium mt-1">{t('verifyBooking.description')}</p>
                    <p className="font-medium mt-1">{t('verifyBooking.note')}</p>
                </div>

            </div>
        </div>
    )
}

export default withNamespaces()(PaymentSuccess);