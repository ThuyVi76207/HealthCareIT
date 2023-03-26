import React from "react";

export default function CommonInput({
    name,
    field,
    value,
    onChange,
    type = "text",
    maxLength = 50,
    placeholder,
    required,
    error = '',
}) {
    return (
        <div>
            <label
                className="text-[20px] font-bold"
                htmlFor={name}
            >
                {field}
            </label>
            {required && <span className="text-red-600 text-[20px]">*</span>}
            <input
                id={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}

                className="w-full rounded-[4px] px-2 border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
            ></input>
            {error && <p className="text-red-600">{error}</p>}
        </div>
    )
}