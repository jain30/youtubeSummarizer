import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;
const API_KEY = "AIzaSyCBgEHKaiz6XcBBgQjcnnBKJq8S5M_8deY";

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.post("/api/generate", async (req, res) => {
  try {
    console.log("inside generate Api handler");
    const { prompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("response received", data);

    // Extract the text from the response
    const extractedText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No text generated";

    console.log("Extracted Text:", extractedText);

    res.status(response.status).json(extractedText);
  } catch (error) {
    console.error("Error generating content:", error.message || error);
    res
      .status(500)
      .json({ error: error.message || "Failed to generate content" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
