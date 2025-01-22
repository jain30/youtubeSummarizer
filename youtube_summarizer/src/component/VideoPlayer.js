import React from "react";

const VideoPlayer = ({ videoId }) => {
  if (!videoId) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Video Preview:</h2>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
