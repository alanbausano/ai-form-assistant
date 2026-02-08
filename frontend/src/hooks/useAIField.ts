import { useState } from "react";
import type { Tone } from "../components/ToneSelector";

type AIResult = {
  suggestion: string;
};

export function useAIField() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const improve = async (text: string, fieldLabel: string, tone: Tone) => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ai/improve/stream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            fieldLabel,
            tone,
          }),
        },
      );

      if (!response.body) {
        throw new Error("ReadableStream not supported in this browser");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunk = decoder.decode(value || new Uint8Array());
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.replace("data: ", "");

            if (data === "[DONE]") {
              return;
            }

            setResult((prev) => ({
              suggestion: (prev?.suggestion || "") + data,
            }));
          }
        }
      }
      const data = await response.json();
      setResult({ suggestion: data.suggestion });
    } catch {
      setError("Streaming AI request failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    result,
    error,
    improve,
  };
}
