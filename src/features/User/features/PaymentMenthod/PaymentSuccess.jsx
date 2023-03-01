import { useEffect } from "react";
import { successPay } from "services/userService";

const PaymentSuccess = () => {
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
        <div>Xác nhận thanh toán thành công</div>
    )
}

export default PaymentSuccess;