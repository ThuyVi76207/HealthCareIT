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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newMessage);
    if (newMessage === "") return;

    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };
  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message, index) => {
          console.log(
            "Check message",
            new Date(message.createdAt.seconds * 1000).getMinutes()
          );
          return (
            <div className="message" key={index}>
              <span className="user">{message.user}</span>
              {message.text}
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-message-input"
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
