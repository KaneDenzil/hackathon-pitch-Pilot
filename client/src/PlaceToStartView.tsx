import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { fetchMultiplePageContents } from "./utils/notion";
import { getGeminiSummary } from "./utils/gemini";
import { buildPlaceToStartPrompt } from "./utils/buildPlaceToStartPrompt";
import { useReactToPrint } from "react-to-print";

const PrintableContent = React.forwardRef<HTMLDivElement, { content: string }>(({ content }, ref) => (
  <div
    ref={ref}
    className="prose prose-lg max-w-none whitespace-pre-wrap bg-white p-6 rounded-md shadow"
  >
    <ReactMarkdown>{content}</ReactMarkdown>
  </div>
));

const PlaceToStartView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState("");

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current!,
    documentTitle: "BD Place To Start",
  });

  useEffect(() => {
    async function fetchAndGenerate() {
      setLoading(true);
      try {
        const pages = await fetchMultiplePageContents(); // Consider breaking this down by page type if needed

        const combinedText = pages
          .map((page: any) =>
            page.blocks
              .map((block: any) => {
                if (block.type === "paragraph") {
                  return block.paragraph?.rich_text?.map((rt: any) => rt.plain_text).join("") ?? "";
                }
                return "";
              })
              .join("\n")
          )
          .join("\n\n");

        const prompt = buildPlaceToStartPrompt(combinedText); // Needs to be written
        const summary = await getGeminiSummary(prompt);

        setGeminiResponse(summary);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAndGenerate();
  }, []);

  return (
    <div className="p-6">
    <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Past Win Intelligence 🏆
</h2>
      </div>
      {loading ? <p>Get a Snack 🥐 We are collating the Research Summary for you... 😎</p> : <PrintableContent ref={printRef} content={geminiResponse} />}
    </div>
  );
};

export default PlaceToStartView;
