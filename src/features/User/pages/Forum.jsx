import React, { useRef, useState } from "react";
import { Auth } from "../features/Chat/Auth";

import Cookies from "universal-cookie";
import Chat from "../features/Chat/Chat";

import { signOut } from "firebase/auth";
import { auth } from "components/firebase/firebase-config";

const cookies = new Cookies();

function Forum() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return <Auth setIsAuth={setIsAuth} />;
  }
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };
  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Enter Room name: </label>
          <input type="text" ref={roomInputRef} className="border" />
          <button
            className="border"
            onClick={() => setRoom(roomInputRef.current.value)}
          >
            Enter chat
          </button>
        </div>
      )}
      <div className="sign-out">
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </>
  );
}

export default Forum;
