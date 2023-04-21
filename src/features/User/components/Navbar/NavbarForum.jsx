import { useDispatch } from "react-redux";
import { addErrorMessage, addSuccessMessage } from "reducers/messageSlice";
import { postSaveNameRoom } from "services/userService";
import "./NavbarForumStyles.scss";
import { useEffect, useState } from "react";

const NavbarForum = (props) => {
  const dispatch = useDispatch();
  const { getNameUser, getPhotoUrl, signUserOut, roomInputRef, handleSetRoom } =
    props;
  const [activeSroll, setActiveSroll] = useState(false);
  // console.log("Check name user", getNameUser, getPhotoUrl);

  const handleSaveNameRoom = async () => {
    let data = {
      name: roomInputRef.current.value,
    };

    try {
      let res = await postSaveNameRoom(data);
      if (res && res.errCode === 0) {
        dispatch(
          addSuccessMessage({
            title: "Thành công",
            content: "Tạo phòng chat thành công",
          })
        );
      } else {
        dispatch(
          addErrorMessage({
            title: "Đã có lỗi xảy ra",
            content: "Vui lòng thử lại sau!!!",
          })
        );
      }
      console.log("Check result", res);
    } catch (error) {
      alert("Đã có lỗi xảy ra. Vui lòng thử lại sau!!!");
      console.log("Faild to api save name room error: ", error);
    }
  };

  const handleClickCreateRoom = () => {
    handleSetRoom();
    handleSaveNameRoom();
  };

  useEffect(() => {
    const handleSroll = () => {
      const isSrollFarFromTop = window.scrollY > 50;
      // console.log('isSrollFarFromTop', isSrollFarFromTop);
      setActiveSroll(isSrollFarFromTop);
    };
    window.addEventListener("scroll", handleSroll);
    return () => window.removeEventListener("scroll", handleSroll);
  }, []);

  return (
    <>
      <nav
        className={`navbar-forum top-0 w-full bg-[#1d176e] bg-opacity-90 z-40`}
      >
        <div
          className={`navbar-forum__left flex items-center justify-between h-full bg-[#1d155e] ${
            activeSroll ? "active-scroll" : ""
          }`}
        >
          <div className="flex items-center w-[50%]">
            <img
              className="rounded-[50%] w-[60px] h-[60px] ml-[10%]"
              src={getPhotoUrl}
              alt=""
            />
            <h2 className="text-white ml-4">{getNameUser}</h2>
          </div>
          <div className="text-white mr-[5%] logout-showup">
            <button onClick={signUserOut} className="border-b-2">
              Đăng xuất
            </button>
          </div>
        </div>
        <div className="navbar-forum__right gap-x-10">
          <div className="text-white ">
            <label>Tên phòng: </label>
            <input
              placeholder="Nhập tên phòng mới..."
              type="text"
              ref={roomInputRef}
              className="border-b-2 bg-[#1d155e] py-1 px-2 focus:outline-none"
            />

            <button
              className="navbar-forum__right__btn bg-[#1d155e] rounded-[5px] text-center hover:bg-[#110c3d]"
              onClick={handleClickCreateRoom}
            >
              Tạo phòng
            </button>
          </div>

          <div className="text-white mr-[10%] logout-showdown">
            <button onClick={signUserOut} className="border-b-2">
              Đăng xuất
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavbarForum;
