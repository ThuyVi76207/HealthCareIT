import ManagerLayout from "features/Admin/layouts/ManagerLayout";
import { useEffect, useState } from "react";
import { getAllDoctors } from "services/adminService";

const AddInforDoctor = () => {

    const [listDoctor, setListDoctor] = useState([]);

    useEffect(() => {
        const getListDoctor = async () => {
            try {
                let res = await getAllDoctors();
                if (res && res.errCode === 0) {
                    console.log("Check list doctor", res.data);
                    setListDoctor(res.data);
                }
            } catch (error) {
                console.log('Faild to get list of Doctor', error)
            }
        }

        getListDoctor();
    }, [])

    return (
        <ManagerLayout>
            <div>CreateDoctor</div>
        </ManagerLayout>
    )
}

export default AddInforDoctor;