import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyAJPzcVKzhqxZ17YtelgFucP0qF0TxBKYY";

export const getVideoDetails = async (videoId) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          part: "snippet,contentDetails",
          id: videoId,
          key: YOUTUBE_API_KEY,
        },
      }
    );
    return response.data.items[0];
  } catch (error) {
    throw new Error("Failed to fetch video details.");
  }
};

export const getCaptions = async (videoId) => {
  // YouTube API doesn't directly provide captions in v3; you'll need to rely on
  // third-party services or extract captions manually via other means.
};



//youtube api 

// AIzaSyAJPzcVKzhqxZ17YtelgFucP0qF0TxBKYY