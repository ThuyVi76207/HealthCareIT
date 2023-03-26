import { useDispatch } from "react-redux";
import { addErrorMessage, addSuccessMessage } from "reducers/messageSlice";
import { postSaveNameRoom } from "services/userService";

const NavbarForum = (props) => {
  const dispatch = useDispatch();
  const { getNameUser, getPhotoUrl, signUserOut, roomInputRef, handleSetRoom } =
    props;
  console.log("Check name user", getNameUser, getPhotoUrl);

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

  return (
    <>
      <nav className="fixed top-0 h-[100px] flex justify-between items-center w-full bg-[#1d176e] bg-opacity-90 z-40">
        <div className="flex items-center h-full w-[35%] bg-[#1d155e]">
          <img
            className="rounded-[50%] w-[60px] h-[60px] ml-[10%]"
            src={getPhotoUrl}
            alt=""
          />
          <h2 className="text-white ml-4">{getNameUser}</h2>
        </div>
        <div className="w-[65%] flex items-center justify-end gap-x-10">
          <div className="text-white">
            <label>Tên phòng: </label>
            <input
              placeholder="Nhập tên phòng mới..."
              type="text"
              ref={roomInputRef}
              className="border-b-2 bg-[#1d155e] py-1 px-2 focus:outline-none"
            />
            <button
              className="ml-3 bg-[#1d155e] rounded-[5px] py-[6px] px-3 text-center hover:bg-[#110c3d]"
              onClick={handleClickCreateRoom}
            >
              Tạo phòng
            </button>
          </div>

          <div className="text-white mr-[10%]">
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
