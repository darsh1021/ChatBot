import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socket.off("receive_message");
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("send_message", message);
            setMessages((prev) => [...prev, message]);
            setMessage("");
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>AI Chatbot</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
