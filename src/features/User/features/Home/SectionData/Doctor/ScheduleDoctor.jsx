import moment from 'moment';
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import 'moment/locale/vi'
import { getScheduleDoctorByDate } from "services/userService";


const ScheduleDoctor = ({ id }) => {
    const { language } = useSelector((state) => state.user) || {};
    console.log('language', language);
    const [scheduleDoctor, setScheduleDoctor] = useState([]);





    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getArrDays = useCallback((language) => {

        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === 'en') {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today;
                } else {
                    let labelEn = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                    object.label = labelEn;
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM') // dddd: Thứ - DD:Ngày/MM:Tháng
                    object.label = capitalizeFirstLetter(labelVi);
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);

        }
        console.log(allDays);
        setScheduleDoctor(allDays);

        return allDays;

    }, [])






    useEffect(() => {
        const printScheduleDoctor = async () => {
            let getAlldays = getArrDays(language);
            console.log('Chekc day', getAlldays);
            try {
                if (getAlldays && getAlldays.length > 0) {
                    const resSchedule = await getScheduleDoctorByDate(id, getAlldays[0].value);

                    //Get all work days doctor

                    console.log('check get all days', resSchedule.data);
                }

            } catch (err) {
                console.log('Failed to print schedule', err);
            }
        }
        printScheduleDoctor();

    }, [id, language, getArrDays])





    return (
        <div className='ml-2'>
            <select className='border-b border-[#c6c3c3] rounded-[50px] focus:outline-none py-1 px-3 text-[#16917c] text-[16px] font-semibold'>
                {
                    scheduleDoctor && scheduleDoctor.length > 0 && scheduleDoctor.map((item, index) => {
                        return (
                            <option key={index} value={item}>{item.label}</option>
                        )
                    })
                }
            </select>
            <div>

            </div>

        </div>
    )
}

export default ScheduleDoctor;