import Loading from "components/Loading/loading";
import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useSelector } from "react-redux";
import { getAllDoctors } from "services/adminService";
import { getAllCommentByDoctor } from "services/userService";

const ListComment = ({ t }) => {
  const [listComment, setListComment] = useState([]);
  const [listDoctor, setListDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const { language } = useSelector((state) => state.user) || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListDoctor = async () => {
      try {
        let res = await getAllDoctors();
        if (res && res.errCode === 0) {
          console.log("Check list doctor", res.data);
          setListDoctor(res.data);
        }
      } catch (error) {
        console.log("Faild to get list of Doctor", error);
      }
    };
    getListDoctor();
  }, []);

  useEffect(() => {
    let data = {
      limit: "",
      doctorId: selectedDoctor,
    };
    console.log("Check data", data);
    const getListComment = async () => {
      try {
        let res = await getAllCommentByDoctor(data);
        console.log("Check commentData", res);
      } catch (error) {
        console.log("Failed to get list comment", error);
      }
    };
    getListComment();
  }, [selectedDoctor]);
  return (
    <div>
      <Loading loading={loading} />
      <div className="w-[30%] mt-6 ">
        <select
          onChange={(e) => setSelectedDoctor(e.target.value)}
          value={selectedDoctor}
          className="w-full rounded-[4px] px-2 border border-[#003985] placeholder-shown:border-gray-500 focus:outline-none h-[40px]"
        >
          <option value={0}>{`--- ${t(
            "addinfordoctor.selecdoctor"
          )} ---`}</option>
          {listDoctor.map((option) => {
            let nameDoctorVi, nameDoctorEn;
            nameDoctorVi = `${option.lastName} ${option.firstName}`;
            nameDoctorEn = `${option.firstName} ${option.lastName}`;
            return (
              <option
                value={option.id}
                key={option.id}
                // selected={option.value === selectedRole}
              >
                {language === "vi" ? nameDoctorVi : nameDoctorEn}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <table id="tableManager">
          <tbody>
            <tr className="uppercase">
              <th>STT</th>
              <th>{t("tablenews.name")}</th>
              <th>{t("tablenews.daycreate")}</th>
              <th>{t("tablenews.dayupdate")}</th>
              <th>{t("tablenews.choose")}</th>
            </tr>

            {/* {listnews &&
              listnews.length > 0 &&
              listnews.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{convertDateToDateTime(item.createdAt)}</td>
                    <td>{convertDateToDateTime(item.updatedAt)}</td>
                    <td className="text-center">
                      <button
                        className="mr-2 hover:text-orange-400"
                        onClick={() => handleEditNews(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="hover:text-red-600"
                        onClick={() => handleDeleteNews(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withNamespaces()(ListComment);
