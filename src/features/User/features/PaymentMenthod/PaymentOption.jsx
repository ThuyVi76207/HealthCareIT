import React from "react";

export default function PaymentOption({ value, currentValue, onClick, imgSrc, title }) {
    return (
        <button onClick={onClick} className={`py-3 px-4 text-lg bg-gray-100 flex items-center hover:border-black w-full ${currentValue === value ? 'bg-primary-color text-white' : ''}`}>
            <div className="min-w-[50px] xs:min-w-[75px] flex justify-between mr-2 xs:mr-4">
                <input type="radio" checked={currentValue === value}></input>
                <img className={`w-12 h-12 ml-3 rounded-[4px] border`} src={imgSrc}></img>
            </div>
            <span className="text-left text-[16px]" dangerouslySetInnerHTML={{ __html: title }}></span>
        </button>
    );
}