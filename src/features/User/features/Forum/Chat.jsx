import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "components/firebase/firebase-config";

import "./Chat.css";

import { useDispatch } from "react-redux";

const Chat = (props) => {
  const { room } = props;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessage = query(
      messageRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unscribe = onSnapshot(queryMessage, (snapshot) => {
      let message = [];
      snapshot.forEach((doc) => {
        message.push({ ...doc.data(), id: doc.id });
      });
      setMessages(message);
    });

    return () => unscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newMessage);
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      photo: auth.currentUser.photoURL,
      room,
    });

    setNewMessage("");
  };
  if (!room) return;
  return (
    <>
      <div className="chat-app">
        <div className="header">
          <h1 className="text-[20px]">Tên phòng: {room.toUpperCase()}</h1>
        </div>
        <div className="messages">
          {messages.map((message, index) => {
            return (
              <div className="message w-[100%]" key={index}>
                {/* <span className="user">{message.user}</span> */}
                <div className="w-[6%]">
                  <img
                    className="w-[50px] h-[50px] rounded-[50%]"
                    src={message.photo}
                    alt=""
                  />
                  <p className="text-[13px] text-gray-500">{message.user}</p>
                </div>
                <div className="w-[93%]">
                  <h2 className="mx-4 mt-3 text-[20px] text-gray-600 bg-[#f5f5f5] px-3 rounded-[10px] border-b-2 border-[#1d155e]">
                    {message.text}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={handleSubmit}
          className="new-message-form bg-white border-2 border-[#1d155e] fixed w-[65%] bottom-0 right-0"
        >
          <input
            className="new-message-input"
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button type="submit" className="send-button mr-4 mt-3">
            <i className="text-[30px]">
              <ion-icon name="paper-plane-outline"></ion-icon>
            </i>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
