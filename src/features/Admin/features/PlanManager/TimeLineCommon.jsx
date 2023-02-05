import { useState } from "react";

const TimeLineCommon = ({
    rangeTime,
    language,
}) => {
    const [selectedItem, setSelectedItem] = useState('');
    const [active, setActive] = useState(false);

    const handleClickBtnTime = (item) => {
        setSelectedItem(item);

    }

    console.log('check item select:', selectedItem)

    return (
        <div className="grid grid-cols-4">
            {rangeTime && rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                    console.log('Check item1:', item)
                    return (
                        <button
                            className={`border mt-4 mx-3 py-2 hover:bg-yellow-300 ${item.value === selectedItem ? 'bg-yellow-300' : ''}  ${language === 'vi' ? 'min-w-[110px] ' : 'min-w-[150px]'}`}
                            key={index}
                            onClick={() => handleClickBtnTime(item.value)}
                        >
                            {language === 'vi' ? item.label.vi : item.label.en}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default TimeLineCommon;