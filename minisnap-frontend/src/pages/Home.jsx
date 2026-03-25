export default function Home() {
  const token = localStorage.getItem("token");

  // Decode the username from JWT (basic decode, no library needed)
  let username = "User";
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      username = payload.username || "User";
    } catch (e) {}
  }

  return (
    <div className="page">
      <h2>Welcome, {username}! 👋</h2>
      <div className="card">
        <p>📸 Go to <strong>Stories</strong> to post or view stories.</p>
      </div>
      <div className="card">
        <p>💬 Go to <strong>Chat</strong> to send messages to others.</p>
      </div>
    </div>
  );
}