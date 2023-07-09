import React, { useEffect, useRef, useState } from 'react';
import { Auth } from '../features/Forum/Auth';

import Cookies from 'universal-cookie';
import Chat from '../features/Forum/Chat';

import { signOut } from 'firebase/auth';
import { auth } from 'components/firebase/firebase-config';
import { getAllRoom, postSaveNameRoom } from 'services/userService';
import NavbarForum from '../components/Navbar/NavbarForum';
import '../features/Forum/ForumStyles.scss';

const cookies = new Cookies();

function Forum() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);
  const [listRoom, setListRoom] = useState([]);

  const [activeNameRoom, setActiveNameRoom] = useState(false);

  const roomInputRef = useRef('room');

  const getNameUser = cookies.get('get-name');
  const getPhotoUrl = cookies.get('get-photo-url');

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('auth-token');
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
        alert('Faild to get all room');
        // console.log("Faild to get all room", error);
      }
    };

    getAllListRoom();
  }, []);
  // console.log('Check list room', listRoom);
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
          <div className="w-full flex forum-container">
            <div
              className={`forum-container__left  h-full bg-[#1d176e] bg-opacity-90
               ${
                 activeNameRoom
                   ? 'forum-container_animation-show'
                   : 'forum-container_animation '
               }`}
            >
              <div className="h-[86vh]">
                <div className="text-center bg-[#1d176e] py-[18px] text-white bg-opacity-70">
                  Danh sách nhóm
                </div>
                <ul className="group-name">
                  {listRoom.map((item, index) => (
                    <li
                      key={index}
                      className="flex text-white items-center gap-4 py-2  hover:bg-[#1d176e] hover:bg-opacity-60 cursor-pointer"
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
            <div
              onClick={() => setActiveNameRoom(!activeNameRoom)}
              className="humbager"
            >
              <i className="text-[28px] bg-[#deaa31] text-white pt-1 pl-2 rounded-r-[10px]">
                <ion-icon name="play-outline"></ion-icon>
              </i>
            </div>
            <div className="forum-container__right">
              {room ? <Chat room={room} /> : null}
            </div>
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
