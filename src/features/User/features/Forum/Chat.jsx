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
  }, [room]);

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
        <div className="header-apps">
          <h1 className="text-[20px]">Tên phòng: {room.toUpperCase()}</h1>
        </div>
        <div className="messages">
          {messages.map((message, index) => {
            return (
              <div className="message w-[100%]" key={index}>
                {/* <span className="user">{message.user}</span> */}
                <div className="message-left ">
                  <img
                    className="w-[50px] h-[50px] rounded-[50%]"
                    src={message.photo}
                    alt=""
                  />
                  <p className="text-[13px] text-gray-500">{message.user}</p>
                </div>
                <div className="message-right">
                  <h2 className=" text-gray-600 bg-[#f5f5f5] rounded-[10px] border-b-2 border-[#1d155e]">
                    {message.text}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={handleSubmit}
          className="new-message-form bg-white border-2 border-[#1d155e] fixed bottom-0 right-0"
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
