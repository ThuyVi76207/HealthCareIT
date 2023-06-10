import Loading from "components/Loading/loading";
import { convertDateToDateTime } from "function/formater";

import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  addErrorMessage,
  addSuccessMessage,
  addWarningMessage,
} from "reducers/messageSlice";
import { getAllDoctors } from "services/adminService";
import { deleteComment, getAllCommentByDoctor } from "services/userService";

const ListComment = ({ t }) => {
  const dispatch = useDispatch();

  const [listComment, setListComment] = useState([]);
  const [listDoctor, setListDoctor] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(0);
  const { language } = useSelector((state) => state.user) || {};
  const [loading, setLoading] = useState(false);
  const stars = Array(5).fill(0);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getListDoctor = async () => {
      setLoading(true);
      try {
        let res = await getAllDoctors();
        if (res && res.errCode === 0) {
          console.log("Check list doctor", res.data);
          setListDoctor(res.data);
        }
        setLoading(false);
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
    setLoading(true);
    console.log("Check data", data);
    const getListComment = async () => {
      try {
        let res = await getAllCommentByDoctor(data);
        if (res && res.errCode === 0) {
          console.log("Check commentData", res);
          setListComment(res.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Failed to get list comment", error);
        setLoading(false);
      }
    };
    getListComment();
  }, [selectedDoctor]);

  const handleDeleteComment = async (id) => {
    setLoading(true);
    try {
      let res = await deleteComment(id);
      console.log("Check deleted comment", res);
      if (res && res.errCode === 0) {
        dispatch(
          addSuccessMessage({
            title: "Xóa thành công",
            content: "Đã xóa thành công bình luận!!!",
          })
        );

        setReload(!reload);
      } else if (res && res.errCode === 2) {
        dispatch(
          addWarningMessage({
            title: "Xóa không thành công",
            content: "Vui lòng kiểm tra lại!!!",
          })
        );
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      dispatch(
        addErrorMessage({
          title: "Đã có lỗi xảy ra",
          content: "Vui lòng thử lại sau!!!",
        })
      );
      console.error("Faild api delete specialty", err);
    }
  };
  return (
    <div>
      <Loading loading={loading} />
      <div className="w-[30%] my-8 ">
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
              <th>{t("listcomment.name")}</th>
              <th>{t("listcomment.daycreate")}</th>
              <th>{t("listcomment.commentdata")}</th>
              <th>{t("listcomment.rating")}</th>
              <th>{t("listcomment.choose")}</th>
            </tr>

            {listComment &&
              listComment.length > 0 &&
              listComment.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.userName}</td>
                    <td>{convertDateToDateTime(item.createdAt)}</td>
                    <td>{item.commentData}</td>
                    <td>
                      {stars.map((_, index) => {
                        return (
                          <i
                            key={index}
                            className={`text-[20px] mr-[10px] cursor-pointer ${
                              item.rating > index
                                ? "text-orange-400"
                                : "text-gray-500"
                            }`}
                          >
                            <ion-icon name="star-outline"></ion-icon>
                          </i>
                        );
                      })}
                    </td>
                    <td className="text-center">
                      <button
                        className="mr-2 hover:text-orange-400"
                        // onClick={() => handleEditNews(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="hover:text-red-600"
                        onClick={() => handleDeleteComment(item.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withNamespaces()(ListComment);
