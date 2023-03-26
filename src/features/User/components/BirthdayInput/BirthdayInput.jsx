const BirthdayInput = ({
    field,
    onChange,
    date,
    type = "date",


}) => {
    return (
        <div className="pb-5 w-full">
            <label
                className="text-[20px] font-bold"
                htmlFor="date"
            >
                {field}
            </label>
            <span className="text-red-600 text-[20px]">*</span>
            <input
                id="date"
                type={type}
                onChange={onChange}
                value={date}
                max={new Date().toISOString().split("T")[0]}
                className="rounded-[4px] border-b-2 border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px] w-full px-5"
            ></input>
        </div>
    )
}

export default BirthdayInput;