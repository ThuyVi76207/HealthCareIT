import LoadingSpinner from "components/Loading/LoadingSpinner";
import { isValidPhoneNumber } from "function/formater";
import { useEffect } from "react";
import { useState } from "react"

export default function PhoneInput({
    field,
    name,
    phoneNumber,
    onChange,
    placeholder,
    required,
    maxLength = 50,
    error = "",
    type = "text",
}) {
    const [loading, setLoading] = useState(false)
    const [validNumber, setValidNumber] = useState(null);

    useEffect(() => {
        if (phoneNumber.length > 9) {
            setValidNumber(isValidPhoneNumber(phoneNumber))
        }
    }, [phoneNumber])

    return (
        <div className="mb-4">
            <label
                className="font-bold text-[20px]"
                htmlFor={name}
            >
                {field}
            </label>
            {required && <span className="text-red-600">*</span>}
            <div className="relative mt-2">
                <input
                    id={name}
                    value={phoneNumber}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className="w-full rounded-[4px] border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                ></input>
                <div>
                    {
                        validNumber === true ? (
                            <>
                                {loading ? (
                                    <LoadingSpinner loading />
                                ) : (
                                    <i className="fa-solid fa-circle-check text-secondary-color"></i>
                                )}
                            </>
                        ) : (
                            <>
                                {
                                    validNumber === false ? (
                                        <i className="fa-solid fa-circle-xmark text-red-600"></i>
                                    ) : ''
                                }
                            </>
                        )
                    }
                </div>
            </div>

            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}