import { useState, useEffect } from "react";
import { getStories, postStory } from "../api";
import StoryCard from "../components/StoryCard";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStories();
  }, []);

  async function loadStories() {
    try {
      const res = await getStories();
      setStories(res.data);
    } catch (e) {
      setError("Could not load stories.");
    }
  }

  async function handlePost() {
    if (!image) return setError("Please select an image.");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    try {
      await postStory(formData);
      setCaption("");
      setImage(null);
      setError("");
      loadStories();
    } catch (e) {
      setError("Failed to post story.");
    }
  }

  return (
    <div className="page">
      <h2>Stories 📸</h2>

      <div className="card">
        <h3>Post a Story</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "12px" }}
        />
        <input
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handlePost}>Post Story</button>
      </div>

      <h3>All Stories</h3>
      {stories.length === 0 && <p style={{ color: "#aaa" }}>No stories yet.</p>}
      {stories.map((s) => (
        <StoryCard key={s._id} story={s} />
      ))}
    </div>
  );
}