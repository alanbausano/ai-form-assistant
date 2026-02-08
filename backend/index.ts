import express, { type Request, type Response } from "express";
import cors from "cors";

import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
  }),
);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.post("/ai/improve/stream", async (req: Request, res: Response) => {
  const { text, fieldLabel, tone } = req.body;

  if (!text) {
    return res.status(400).end();
  }

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const prompt = `
You are an assistant that improves form input text.

Field: ${fieldLabel}
Tone: ${tone}

Improve the following text while keeping it concise and natural:

"${text}"
  `.trim();

  try {
    const stream = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices?.[0]?.delta?.content;
      if (content) {
        await new Promise((r) => setTimeout(r, 30));

        res.write(`data: ${content}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Groq streaming error:", err);
    res.write("data: [ERROR]\n\n");
    res.end();
  }
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
