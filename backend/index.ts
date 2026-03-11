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
    origin: [
      "http://localhost:5173",
      "https://ai-form-assistant-coral.vercel.app",
    ],
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

Improve the following text while keeping it concise and natural.
Don't only improve the text, but also make it more engaging and interesting.
If the user writes something like "I want to..." or "I would like to...", try to make it more direct and action-oriented.
If the text shows a lack of commitment towards the field, try to ellaborate by creating more text.
Consider this as an example:

Field: "What motivates you?"
Input: "I need money" - A candidate shouldn't show that its only interest is money, here you should suggest a better answer, not only changing the tone.
Output: "I am motivated by the opportunity to grow and develop my skills, also the monetary aspect is important for me."

Field: "What motivates you?"
Input: "I want to learn" - A candidate should show that its only interest is learning, here you should suggest a better answer, not only changing the tone.
Output: "I am motivated by the opportunity to grow and develop my skills, also the monetary aspect is important for me."

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
