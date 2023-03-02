
import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import { getAllPatientDoctor } from "services/adminService";
import ScheduleCommon from "../PlanManager/ScheduleCommon";

const ListPatient = ({ t }) => {

    const [dateStartContract, setDateStartContract] = useState(
        new Date().toISOString().split("T")[0]
    );

    const profile = useSelector((state) => state.profileuser);
    let id = profile.id;

    useEffect(() => {

        let formatedDate = new Date(dateStartContract).getTime() - 25200000;
        const listPatient = async () => {
            let data = {
                doctorId: id,
                date: formatedDate
            }
            try {
                let res = await getAllPatientDoctor(data);
                console.log('Check Patient', res);
            } catch (error) {
                console.log("Faild to get API patient", error)
            }
        }

        listPatient();
    }, [id, dateStartContract])
    return (
        <div className="grid grid-cols-2">
            <ScheduleCommon
                field={t('addplan.chooseday')}
                onChange={(e) => setDateStartContract(e.target.value)}
                date={dateStartContract}
            />
        </div>

    )
}

export default withNamespaces()(ListPatient);