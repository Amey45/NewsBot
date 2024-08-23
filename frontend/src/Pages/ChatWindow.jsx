import React, { useState, useEffect } from "react";
import { getNews } from "../Services/api";
import Layout from "../Components/Layout";
import "./ChatWindow.css";
import { json } from "react-router-dom";

const ChatWindow = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      const loadMessages = async () => {
        console.log("query: ", selectedChat.query);
        console.log("selected chat: ", selectedChat);
        const response = await getNews({ query: selectedChat.query });
        console.log("fetch message response", response);
        setMessages(response);
      };
      loadMessages();
    }
  }, [selectedChat]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  const findIndex = (a) => {
    return messages.findIndex((message) => {
      return message === a;
    });
  };

  return (
    <>
      <div
        style={{ width: "100%", backgroundColor: "black", overflow: "hidden" }}
      >
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "5px",
            padding: "10px",
            marginBottom: "10px",
            background: "red",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <Layout onSelectChat={setSelectedChat}>
        <div className="chat-container">
          {selectedChat ? (
            <div className="chat-messages">
              <div className="card-display">
                {messages &&
                  messages.map((msg) => (
                    <>
                      <div className="card">
                        <h3>{msg.title}</h3>
                        <h5>Author: {msg.author}</h5>
                        <br />
                        <p>{msg.content.slice(0, 200)}</p>
                        <a href={msg.url} target="blank">
                          ...read more
                        </a>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          ) : (
            <div className="no-chat-selected">
              Insert OR Select a Topic to get news
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ChatWindow;
