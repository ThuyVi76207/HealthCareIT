import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSettingService } from "services/userService";
import { addTime } from "reducers/timelineSlice";

const TimeLineCommon = ({
    language,
}) => {
    const dispatch = useDispatch();

    const [listTime, setListTime] = useState([]);
    // const [selectedItem, setSelectedItem] = useState('');
    // const [active, setActive] = useState(false);

    const handleClickBtnTime = (time) => {
        let arrTime = listTime
        if (arrTime && arrTime.length > 0) {
            arrTime = arrTime.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            setListTime(arrTime);

            console.log('List time', arrTime);
        }

        arrTime = JSON.parse(JSON.stringify(arrTime));
        dispatch(addTime(arrTime));


    }

    useEffect(() => {
        const getTime = async () => {
            try {
                let res = await getSettingService("TIME");
                let data = res.data;
                if (data && data.length > 0) {
                    data = data.map(item => ({ ...item, isSelected: false }));

                }
                setListTime(data);
                // console.log('get time', res)
            } catch (err) {
                console.log('Faild to get time', err);
            }
        }
        getTime();
    }, []);

    // useEffect(() => {
    //     dispatch(addTime(listTime));
    // }, [listTime]);
    console.log('get time', listTime);
    // console.log('check item select:', selectedItem)

    return (
        <div className="grid grid-cols-4">
            {listTime && listTime.length > 0 &&
                listTime.map((item, index) => {
                    // console.log('Check item1:', item)
                    return (
                        <button
                            className={`border mt-4 mx-3 py-2 ${item.isSelected ? 'bg-yellow-300' : ''}  ${language === 'vi' ? 'min-w-[110px] ' : 'min-w-[150px]'}`}
                            key={index}
                            onClick={() => handleClickBtnTime(item)}
                        >
                            {language === 'vi' ? item.value_Vi : item.value_En}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default TimeLineCommon;