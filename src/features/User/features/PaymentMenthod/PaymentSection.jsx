import PaymentOption from "./PaymentOption";
// import { PaymentOptionCK } from "./PaymentOption";
import imgvnpay from "assets/Payment/vnpay.png";
import imgpaypal from "assets/Payment/paypal.png";

export default function PaymentMethodSection({
  paymentMethod,
  handlePaymentMethod,
  // bankCodeZalo,
  // handleBankCodeZalo,
}) {
  return (
    <div>
      <div className="mb-5 rounded-[4px]">
        <div className="border-2 mb-2 rounded-[4px]">
          <PaymentOption
            onClick={() => handlePaymentMethod(10)}
            title={"Thanh toán qua ví điện tử VNPay"}
            value={10}
            currentValue={paymentMethod}
            imgSrc={imgvnpay}
          />
        </div>

        <div className="border-2 mb-2 rounded-[4px]">
          <PaymentOption
            onClick={() => handlePaymentMethod(12)}
            title={"Thanh toán qua ví điện tử Paypal"}
            value={12}
            currentValue={paymentMethod}
            imgSrc={imgpaypal}
          />
          {/* {
                        paymentMethod === 12 && (
                            <div className="p-2">
                                <button onClick={() => handleBankCodeZalo("zalopayapp")} className={`flex items-center p-2 mb-2 border-2 bg-gray-100 w-full text-left hover:opacity-80 ${bankCodeZalo === 'zalopayapp' ? 'bg-primary-color text-white' : ''}`}>
                                    <input className="mr-2" id="bankCode-zalopayapp" type="radio" name="bankCode" value="zalopayapp" checked={bankCodeZalo === "zalopayapp"}></input>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="mr-2">ZaloPay</div>
                                        <div>
                                            <img src="/images/zalopay.png" className="h-8 w-8"></img>
                                        </div>
                                    </div>
                                </button>
                                <button onClick={() => handleBankCodeZalo("CC")} className={`flex items-center p-2 mb-2 border-2 bg-gray-100 w-full text-left hover:opacity-80 ${bankCodeZalo === 'CC' ? 'bg-primary-color text-white' : ''}`}>
                                    <input className="mr-2" id="bankCode-CC" type="radio" name="bankCode" value="CC" checked={bankCodeZalo === "CC"}></input>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="mr-2">Thẻ ATM</div>
                                        <div>
                                            <img src="/images/atm-card.png" className="h-8 w-8"></img>
                                        </div>
                                    </div>
                                </button>
                                <button onClick={() => handleBankCodeZalo("")} className={`flex items-center p-2 mb-2 border-2 bg-gray-100 w-full text-left hover:opacity-80 ${bankCodeZalo === '' ? 'bg-primary-color text-white' : ''}`}>
                                    <input className="mr-2" id="bankCode-credit-card" type="radio" name="bankCode" value="" checked={bankCodeZalo === ""}></input>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="mr-2">Thẻ Visa, Master, VCP</div>
                                        <div className="flex">
                                            <img src="/images/credit-card.webp" className="h-8 w-8"></img>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        )
                    } */}
        </div>
      </div>
    </div>
  );
}
