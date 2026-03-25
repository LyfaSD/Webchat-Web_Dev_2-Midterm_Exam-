export default function StoryCard({ story }) {
  return (
    <div className="card">
      <p style={{ color: "#2a52be", fontWeight: "bold", marginBottom: "8px" }}>
        👤 {story.author?.username || "Unknown"}
      </p>
      {story.imageUrl && (
        <img
          src={story.imageUrl}
          alt="story"
          style={{ width: "100%", borderRadius: "8px", marginBottom: "8px" }}
        />
      )}
      {story.caption && <p>{story.caption}</p>}
      <p style={{ color: "#888", fontSize: "12px", marginTop: "8px" }}>
        {new Date(story.createdAt).toLocaleString()}
      </p>
    </div>
  );
}