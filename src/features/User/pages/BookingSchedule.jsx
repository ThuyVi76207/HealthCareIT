import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";

const BookingSchedule = () => {

    const timeSchedule = useSelector((state) => state.timework) || {}

    console.log("Check schedule for booking", timeSchedule)
    return (
        <MainLayout>
            <div>Booking</div>
        </MainLayout>
    )
}

export default BookingSchedule;