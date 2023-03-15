import { useEffect } from "react";
import { successPay } from "services/userService";

const PaymentSuccess = () => {
    // let url = window.location
    let urlParam = new URLSearchParams(window.location.search)
    console.log("Check url", urlParam)
    let PayerID = urlParam.get('PayerID');
    let paymentId = urlParam.get('paymentId');
    console.log('payerid', PayerID);
    console.log('paymentid', paymentId);


    const tokenID = localStorage.getItem("tokenID");
    const doctorId = localStorage.getItem("doctorId");
    const price = localStorage.getItem("price");

    console.log("Check token", tokenID);
    console.log("Check doctor", doctorId);

    useEffect(() => {
        const paymentSuccess = async () => {
            await successPay({
                PayerID: PayerID,
                paymentId: paymentId,
                doctorId: doctorId,
                token: tokenID,
                price: price.toString()
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
                    <h2 className="text-[25px] font-bold mt-3">Thanh toán thành công!</h2>
                    <p className="font-medium mt-1">Cảm ơn bạn đã đến với HealthCare.</p>
                    <p className="font-medium mt-1">Vui lòng kiểm tra và vào đúng giờ để Bác sĩ tư vấn.</p>
                </div>

            </div>
        </div>
    )
}

export default PaymentSuccess;