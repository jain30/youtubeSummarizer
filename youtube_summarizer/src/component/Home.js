import React, { useState } from "react";
import { YoutubeTranscript } from "youtube-transcript";

const HomePage = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null); // New state for backend response

  // const handleGenerateContent = async (transcript) => {
  //   const prompt = `here is the youtube transcript please summarize it and highlight the important points, i want tittle, discription and keypoints discussed:${transcript}`;

  const handleGenerateContent = async (transcript) => {
    const prompt = `Here is the YouTube transcript: ${transcript}
  
  Please summarize the transcript and highlight the important points.
  i want the response in json format, here is an example. STRICTLY give me the json only
  {
     "Title" : "Briefly summarize the main topic of the video.",
  
  "Description": "Provide a concise overview of the key points discussed in the video.",
  
  "Key Points": "List the essential takeaways from the transcript in bullet points."
  }

  dont enclose the output in any quotes
  `;

    // console.log("Prompt being sent to backend:", prompt);

    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log(data);
      console.log(JSON.parse(data));

      // Store the backend response in state
      setResponseData(JSON.parse(data) || "No data received from backend.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const extractVideoId = (url) => {
    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const videoId = extractVideoId(youtubeUrl);

    if (videoId) {
      setVideoId(videoId);
      setError("");
      YoutubeTranscript.fetchTranscript(videoId).then((res) => {
        const transcript = JSON.stringify(res);
        // console.log(transcript);
        handleGenerateContent(transcript);
      });
    } else {
      setVideoId(null);
      setError("Invalid YouTube URL. Please try again.");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Enter YouTube URL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="Paste YouTube URL here"
          style={{
            padding: "10px",
            width: "60%",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {videoId && (
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
          {/* Display the backend response below the video */}
          {responseData && ( // New code for rendering response data
            <div
              style={{
                marginTop: "20px",
                textAlign: "left",
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                maxWidth: "800px",
                margin: "20px auto",
              }}
            >
              <h3
                style={{
                  color: "#333",
                  borderBottom: "2px solid #007BFF",
                  paddingBottom: "10px",
                }}
              >
                Generated Content:
              </h3>
              <h2>{responseData.Title}</h2>
              <p>{responseData.Description}</p>
              <ol>
                {responseData["Key Points"].map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
