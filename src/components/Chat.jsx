import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const { targetUserId } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [reciver, setReceiver] = useState([]);
  const user = useSelector(store => store.user);
  const userId = user?._id;
  const [socketInstance, setSocketInstance] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchReceiver = async (targetUserId) => {
    try {
      const res = await axios.get(
        BASE_URL + "/profile/get/" + targetUserId,
        { withCredentials: true }
      );
      setReceiver(res?.data?.user)
    } catch (err) {
      if (err.status === 401) {
        navigate("/login")
      }
      console.error(err)
    }
  }

  useEffect(() => {
    if (targetUserId) {
      fetchReceiver(targetUserId);
    }
  }, [])


  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });


    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        id: senderId?._id,
        firstName: senderId?.firstName,
        text,
      };
    });
    setMessage(chatMessages);
  };


  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    setSocketInstance(socket);
    socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });
    socket.on("messageReceived", ({ id, firstName, text }) => {
      setMessage(prevMessages => [...prevMessages, { id, firstName, text }]);
    });
    return () => {
      socket.disconnect();
      setSocketInstance(null);
    }

  }, [userId, targetUserId]);

  const handleChat = () => {
    if (!socketInstance || !newMessage.trim()) return;
    socketInstance.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage
    });

    setNewMessage("");

  }
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <div className="flex flex-col h-[80vh] min-h-[500px] lg:h-[80vh] bg-base-300 rounded-lg shadow-xl lg:max-w-xl lg:mx-auto border border-base-300 my-10">

      <header className="navbar bg-base-300 border-b border-base-300 rounded-t-lg px-4 py-3 sticky top-0 z-20">
        <div className="flex items-center gap-3 flex-1">

          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="profile"
                src={reciver?.photoUrl}
              />
            </div>
          </div>

          <h2 className="text-lg font-bold">
            {reciver?.firstName + " " + reciver?.lastName}
          </h2>
        </div>

        <div className="flex-none gap-2">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </button>
        </div>
      </header>

      <main ref={messagesEndRef} className="flex-grow p-4 space-y-4 bg-base-200 overflow-y-auto">
        {message.map((msg, index) => {
          const isCurrentUser = msg.id === user._id;
          const chatClassName = isCurrentUser ? "chat chat-end" : "chat chat-start";
          return (
            <div key={index}>
              <div className={chatClassName}>
                <div className="chat-header">
                  {msg.firstName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            </div>
          );
        })}



      </main>

      <footer className="p-4 bg-base-300 border-t border-base-300 rounded-b-lg sticky bottom-0 z-20">
        <div className="flex items-center gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="input input-neutral input-bordered w-full"
          />
          <button className="btn btn-primary" onClick={handleChat}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default Chat