import { useState, useEffect } from "react";
import { getUsers, getMessages, sendMessage } from "../api";

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // Get current user id from token
  let myId = null;
  try {
    const token = localStorage.getItem("token");
    myId = JSON.parse(atob(token.split(".")[1])).id;
  } catch (e) {}

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data)).catch(() => {});
  }, []);

  async function openChat(user) {
    setSelectedUser(user);
    try {
      const res = await getMessages(user._id);
      setMessages(res.data);
    } catch (e) {
      setError("Could not load messages.");
    }
  }

  async function handleSend() {
    if (!text.trim()) return;
    try {
      await sendMessage({ receiverId: selectedUser._id, text });
      setText("");
      const res = await getMessages(selectedUser._id);
      setMessages(res.data);
    } catch (e) {
      setError("Failed to send message.");
    }
  }

  return (
    <div className="page">
      <h2>Chat 💬</h2>

      {!selectedUser ? (
        <>
          <p style={{ color: "#aaa", marginBottom: "12px" }}>Select a user to chat with:</p>
          {users.map((u) => (
            <div
              key={u._id}
              className="card"
              onClick={() => openChat(u)}
              style={{ cursor: "pointer" }}
            >
              👤 {u.username}
            </div>
          ))}
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedUser(null)}
            style={{ width: "auto", marginBottom: "16px", padding: "6px 14px" }}
          >
            ← Back
          </button>
          <h3>Chat with {selectedUser.username}</h3>

          <div style={{
            background: "#111",
            border: "1px solid #2a52be",
            borderRadius: "8px",
            padding: "12px",
            minHeight: "200px",
            marginBottom: "12px"
          }}>
            {messages.length === 0 && (
              <p style={{ color: "#aaa" }}>No messages yet. Say hi!</p>
            )}
            {messages.map((m) => (
              <div
                key={m._id}
                style={{
                  textAlign: m.sender === myId ? "right" : "left",
                  marginBottom: "8px",
                }}
              >
                <span style={{
                  background: m.sender === myId ? "#2a52be" : "#1a1a2e",
                  padding: "6px 12px",
                  borderRadius: "12px",
                  display: "inline-block",
                }}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          {error && <p className="error">{error}</p>}
          <input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </>
      )}
    </div>
  );
}
