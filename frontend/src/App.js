import React from "react";
import ChatBox from "./components/ChatBox";
import { createGlobalStyle } from "styled-components";

// Global styles for the entire app
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 20px;
    background-color: #1e1e1e;
    color: #e0e0e0;
    font-family: 'Fira Code', 'Courier New', monospace;
    min-height: 100vh;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    body {
      padding: 10px;
    }
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px"
      }}>
        <header style={{
          marginBottom: "30px",
          borderBottom: "1px solid #333",
          paddingBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1 style={{
              margin: 0,
              color: "#4ec9b0",
              fontSize: "28px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span style={{ fontSize: "32px" }}>🤖</span>
              <span>
                <span style={{ color: "#569cd6" }}>Dev</span>
                <span style={{ color: "#dcdcaa" }}>Assistant</span>
              </span>
            </h1>
            <span style={{
              marginLeft: "15px",
              padding: "4px 8px",
              backgroundColor: "#252526",
              borderRadius: "4px",
              color: "#9cdcfe",
              fontSize: "12px",
              border: "1px solid #333"
            }}>
              v1.0.0
            </span>
          </div>
          <div style={{
            display: "flex",
            gap: "10px",
            color: "#888"
          }}>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "5px" }}>🟢</span>
              <span>Online</span>
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "5px" }}>⚡</span>
              <span>Fast Mode</span>
            </span>
          </div>
        </header>

        <main>
          <div style={{
            backgroundColor: "#252526",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            marginBottom: "20px"
          }}>
            <h2 style={{
              color: "#dcdcaa",
              marginTop: 0,
              borderBottom: "1px solid #333",
              paddingBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span style={{ color: "#569cd6" }}>📘</span>
              Assignment Chatbot
            </h2>
            <p style={{ lineHeight: 1.6 }}>
              This interactive chatbot helps you with programming assignments. 
              Ask questions about <span style={{ color: "#4ec9b0" }}>algorithms</span>, 
              <span style={{ color: "#569cd6" }}> code debugging</span>, or 
              <span style={{ color: "#dcdcaa" }}> system design</span>.
            </p>
            <div style={{
              backgroundColor: "#1e1e1e",
              padding: "15px",
              borderRadius: "4px",
              marginTop: "15px",
              borderLeft: "3px solid #4ec9b0"
            }}>
              <div style={{ color: "#9cdcfe", marginBottom: "5px" }}>// Try these examples:</div>
              <ul style={{ 
                margin: "5px 0", 
                paddingLeft: "20px",
                listStyleType: "none"
              }}>
                <li style={{ marginBottom: "8px" }}>
                  <span style={{ color: "#ce9178" }}>$</span> Explain the time complexity of BFS and DFS
                </li>
                <li style={{ marginBottom: "8px" }}>
                  <span style={{ color: "#ce9178" }}>$</span> Help me related assignment x
                </li>
                <li style={{ marginBottom: "8px",color:"orange"}}>
                  <span style={{ color: "#ce9178" }}>$</span>  Enter your Name (Premium Peoples) 
                </li>
              </ul>
            </div>
          </div>

          <ChatBox />
        </main>

        <footer style={{
          marginTop: "40px",
          textAlign: "center",
          color: "#888",
          fontSize: "14px",
          borderTop: "1px solid #333",
          paddingTop: "20px"
        }}>
          <div style={{ marginBottom: "10px" }}>
            <span style={{ marginRight: "15px" }}>📝 MIT License</span>
            <span style={{ marginRight: "15px" }}>🐛 Report Issues</span>
            <span>🔄 v1.0.0</span>
          </div>
          <div>
            © {new Date().getFullYear()} DevAssistant — Built by Darshan with ❤️
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;