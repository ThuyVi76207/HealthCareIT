import { formatMonthAndDate } from "function/formater";
import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";

const BookingSchedule = ({ t }) => {

    const timeSchedule = useSelector((state) => state.timework) || {};
    const inforDoctor = useSelector((state) => state.inforDoctor) || {};
    const { language } = useSelector((state) => state.user) || {};

    console.log("Check schedule for booking", timeSchedule);
    console.log("Check inforDoctor schedule", inforDoctor);

    let nameVi = '', nameEn = '';
    if (inforDoctor && inforDoctor.positionData) {
        nameVi = `${inforDoctor.positionData.value_Vi} ${inforDoctor.lastName} ${inforDoctor.firstName}`;
        nameEn = `${inforDoctor.positionData.value_En} ${inforDoctor.firstName} ${inforDoctor.lastName}`;
    }


    const [date, setDate] = useState('');
    useEffect(() => {

        const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
        let daymonthyear;
        let formatDate = +timeSchedule.date

        daymonthyear = days[new Date(formatDate).getDay()] + " - " + formatMonthAndDate(new Date(formatDate).getDate()) +
            "/" + formatMonthAndDate(new Date(formatDate).getMonth() + 1) +
            "/" + new Date(formatDate).getFullYear();
        // daymonthyear = new Date(formatDate).getMonth()
        console.log("Check format date: ", daymonthyear);
    }, [timeSchedule])










    return (
        <MainLayout>
            <div>
                <div className="bg-[#daeeed] ">
                    <div className="py-3 flex w-[45%] mx-auto gap-[3%]">
                        <img
                            src={inforDoctor.image} alt={inforDoctor.id}
                            className="w-[100px] h-[100px] rounded-[50%]"
                        />
                        <div className="leading-6">
                            <h4 className="uppercase text-[15px]">{t('bookingschedule.titles')}</h4>
                            <h2 className="font-bold text-[#16917c]">{language === "vi" ? nameVi : nameEn}</h2>
                            <p>{ }</p>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    )
}

export default withNamespaces()(BookingSchedule);