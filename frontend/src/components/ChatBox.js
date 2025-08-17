import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const typeOutMessage = (text, callback) => {
    let i = 0;
    const typingSpeed = 10 + Math.random() * 30; // Variable typing speed
    const partialMessage = { sender: "bot", text: "" };
    setMessages(prev => [...prev, partialMessage]);

    const typingInterval = setInterval(() => {
      if (i < text.length) {
        partialMessage.text += text.charAt(i);
        setMessages(prev => [...prev.slice(0, -1), { ...partialMessage }]);
        i++;
      } else {
        clearInterval(typingInterval);
        if (callback) callback();
      }
    }, typingSpeed);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsBotTyping(true);

    try {
      const res = await axios.post("https://chatbot-nwrt.onrender.com/chat", {
        message: input,
      });

      // Simulate typing effect for bot response
      typeOutMessage(res.data.reply, () => {
        setIsBotTyping(false);
      });

    } catch (err) {
      console.error(err);
      typeOutMessage("⚠️ Error connecting to server", () => {
        setIsBotTyping(false);
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={{ 
      width: "600px", 
      margin: "auto",
      fontFamily: "'Fira Code', 'Courier New', monospace",
      backgroundColor: "#1e1e1e",
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      overflow: "hidden"
    }}>
      {/* Terminal-like header */}
      <div style={{
        backgroundColor: "#333",
        padding: "8px 15px",
        display: "flex",
        alignItems: "center",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px"
      }}>
        <div style={{ display: "flex", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f56" }}></div>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffbd2e" }}></div>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27c93f" }}></div>
        </div>
        <div style={{ 
          marginLeft: "15px",
          color: "#aaa",
          fontSize: "14px",
          fontWeight: "bold"
        }}>
          dev-chat — bash — 80×24
        </div>
      </div>

      {/* Chat messages area */}
      <div style={{
        height: "400px",
        overflowY: "auto",
        padding: "20px",
        backgroundColor: "#1e1e1e",
        color: "#e0e0e0"
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              margin: "15px 0",
              fontFamily: "'Fira Code', monospace",
              whiteSpace: "pre-wrap"
            }}
          >
            {msg.sender === "user" ? (
              <>
                <div style={{ color: "#569cd6", marginBottom: "5px" }}>
                  $ user input
                </div>
                <div style={{ 
                  backgroundColor: "#252526",
                  padding: "10px",
                  borderRadius: "4px",
                  borderLeft: "3px solid #569cd6"
                }}>
                  {msg.text}
                </div>
              </>
            ) : (
              <>
                <div style={{ color: "#4ec9b0", marginBottom: "5px" }}>
                  // system response
                </div>
                <div style={{ 
                  backgroundColor: "#252526",
                  padding: "10px",
                  borderRadius: "4px",
                  borderLeft: "3px solid #4ec9b0",
                  fontFamily: "'Fira Code', monospace"
                }}>
                  {msg.text}
                </div>
              </>
            )}
          </div>
        ))}
        
        {isBotTyping && (
          <div style={{ 
            color: "#4ec9b0",
            fontFamily: "'Fira Code', monospace",
            margin: "15px 0"
          }}>
            <div style={{ color: "#4ec9b0", marginBottom: "5px" }}>
              // system response
            </div>
            <div style={{ 
              backgroundColor: "#252526",
              padding: "10px",
              borderRadius: "4px",
              borderLeft: "3px solid #4ec9b0",
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{ marginRight: "5px" }}>⏳</span>
              <span className="typing-cursor">|</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div style={{ 
        padding: "15px",
        backgroundColor: "#252526",
        borderTop: "1px solid #333",
        display: "flex",
        alignItems: "center"
      }}>
        <span style={{ 
          color: "#4ec9b0",
          marginRight: "10px",
          fontFamily: "'Fira Code', monospace"
        }}>
          &gt;
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isBotTyping}
          style={{ 
            flex: 1,
            padding: "10px",
            backgroundColor: "#333",
            border: "1px solid #444",
            borderRadius: "4px",
            color: "#e0e0e0",
            fontFamily: "'Fira Code', monospace",
            outline: "none"
          }}
          placeholder={isBotTyping ? "Waiting for response..." : "Type your command..."}
        />
        <button 
          onClick={sendMessage}
          disabled={isBotTyping}
          style={{ 
            marginLeft: "10px",
            padding: "10px 15px",
            backgroundColor: "#0e639c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "'Fira Code', monospace",
            opacity: isBotTyping ? 0.5 : 1
          }}
        >
          {isBotTyping ? "..." : "Run"}
        </button>
      </div>
    </div>
  );
}

export default ChatBox;