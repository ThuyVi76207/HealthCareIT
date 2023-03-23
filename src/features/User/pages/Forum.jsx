import React, { useEffect, useRef, useState } from "react";
import { Auth } from "../features/Forum/Auth";

import Cookies from "universal-cookie";
import Chat from "../features/Forum/Chat";

import { signOut } from "firebase/auth";
import { auth } from "components/firebase/firebase-config";
import { getAllRoom, postSaveNameRoom } from "services/userService";
import NavbarForum from "../components/Navbar/NavbarForum";
import { addErrorMessage, addSuccessMessage } from "reducers/messageSlice";
import { useDispatch } from "react-redux";

const cookies = new Cookies();

function Forum() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [listRoom, setListRoom] = useState([]);

  const roomInputRef = useRef("room");

  const getNameUser = cookies.get("get-name");
  const getPhotoUrl = cookies.get("get-photo-url");

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  useEffect(() => {
    const getAllListRoom = async () => {
      try {
        let res = await getAllRoom();
        if (res && res.errCode === 0) {
          setListRoom(res.data);
        }
      } catch (error) {
        console.log("Faild to get all room", error);
      }
    };

    getAllListRoom();
  }, []);
  console.log("Check list room", listRoom);
  return (
    <>
      {!isAuth ? (
        <Auth setIsAuth={setIsAuth} />
      ) : (
        <>
          <NavbarForum
            getNameUser={getNameUser}
            getPhotoUrl={getPhotoUrl}
            signUserOut={signUserOut}
            roomInputRef={roomInputRef}
            handleSetRoom={() => setRoom(roomInputRef.current.value)}
          />
          <div className="h-[100px] w-full"></div>
          <div className="w-full flex">
            <div className="w-[35%] h-full bg-[#1d176e] bg-opacity-90">
              <div className="h-[86vh] bg-[#1d176e]">
                <div className="text-center bg-[#1d176e] py-[18px] text-white bg-opacity-70">
                  List room
                </div>
                <ul className="">
                  {listRoom.map((item, index) => (
                    <li
                      key={index}
                      className="flex text-white items-center gap-4 py-2 px-[20%] hover:bg-[#1d176e] hover:bg-opacity-70 cursor-pointer"
                      onClick={() => setRoom(item.name)}
                    >
                      <i className="text-[25px] pt-1">
                        <ion-icon name="shapes-outline"></ion-icon>
                      </i>
                      <h2 className="text-[20px]">{item.name}</h2>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-[65%]">{room ? <Chat room={room} /> : null}</div>
          </div>
          {/* {room ? <Chat room={room} /> : null} */}

          {/* <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div> */}
        </>
      )}
    </>
  );
}

export default Forum;
