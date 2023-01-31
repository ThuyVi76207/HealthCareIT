import LoadingSpinner from "components/Loading/LoadingSpinner";
import { isValidEmail } from "function/formater";
import { useEffect } from "react";
import { useState } from "react"

export default function EmailInput({
    name,
    field,
    email,
    onChange,
    placeholder,
    required,
    maxLength = 50,
    error = "",
    type = "text",
}) {
    const [loading, setLoading] = useState(false);
    const [validEmail, setValidEmail] = useState(null);

    useEffect(() => {
        if (email.length > 3) {
            setValidEmail(isValidEmail(email));
        } else {
            setValidEmail(null);
        }
    }, [email])

    return (
        <div className="mb-4">
            <label className="font-bold text-[20px]" htmlFor={name}>
                {field}
            </label>
            {required && <span className="text-red-600 text-[20px]">*</span>}
            <div className="relative mt-2">
                <input
                    id={name}
                    value={email}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
                ></input>
                <div className="absolute right-3 top-[50%] translate-y-[-50%]">
                    {validEmail === true ? (
                        <>
                            {loading ? (
                                <LoadingSpinner loading />
                            ) : (
                                <i className="fa-solid fa-circle-check text-secondary-color"></i>
                            )}
                        </>
                    ) : (
                        <>
                            {validEmail === false ? (
                                <i className="fa-solid fa-circle-xmark text-red-600"></i>
                            ) : ''}
                        </>
                    )}
                </div>
            </div>

            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}