import ManagerLayout from "features/Admin/layouts/ManagerLayout";
import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { getAllDoctors } from "services/adminService";

const AddInforDoctor = ({ t }) => {

    const [listDoctor, setListDoctor] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [description, setDescription] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [addressClinic, setAddressClinic] = useState("");
    const [nameClinic, setNameClinic] = useState("");
    const [note, setNote] = useState("");

    const [error, setError] = useState({

    });

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
            <h2>{t('addinfordoctor.titles')}</h2>
            <form>

            </form>
        </ManagerLayout>
    )
}

export default withNamespaces()(AddInforDoctor);