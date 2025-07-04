// DeepResearchView.tsx
import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { fetchMultiplePageContents } from "./utils/notion";
import { getGeminiSummary } from "./utils/gemini";
import { buildDeepResearchPrompt } from "./utils/buildDeepResearchPrompt";
import { useReactToPrint } from "react-to-print";
import { type BDResearchInput } from "./types/BDResearch";

// 👇 Define the printable component outside for consistency
const PrintableContent = React.forwardRef<HTMLDivElement, { content: string }>(
  ({ content }, ref) => (
    <div
      ref={ref}
      className="prose prose-lg max-w-none whitespace-pre-wrap bg-white p-6 rounded-md shadow"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
);

const DeepResearchView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState("");

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current!,
    documentTitle: "BD Deep Research Summary",
  });

  useEffect(() => {
    async function fetchAndAnalyze() {
      setLoading(true);

      try {
        const pages = await fetchMultiplePageContents();

        const notionText = pages
          .map((page: any) =>
            page.blocks
              .map((block: any) => {
                if (block.type === "paragraph") {
                  return block.paragraph?.rich_text
                    ?.map((t: any) => t.plain_text)
                    .join(" ");
                }
                return "";
              })
              .filter(Boolean)
              .join("\n")
          )
          .join("\n\n");

        const input: BDResearchInput = {
          bdName: "Kane",
          geography: "USA",
          industry: "Self Storage",
          company: "CubeSmart",
          engagementType: "Digital transformation and eComm strategy",
          pursuitSummary: notionText,
          referenceProposals: [
            { name: "EF Tours", link: "https://example.com/ef-tours" },
            { name: "SC Johnson", link: "https://example.com/sc-johnson" },
            { name: "Harry Rosen", link: "https://example.com/harry-rosen" },
          ],
          projectClosures: [
            {
              name: "Markertrax",
              summary: "Closed a multi-year digital build including POS integration.",
              link: "https://notion.so/markertrax",
            },
            {
              name: "Wynn",
              summary: "Provided a complete rebranding and CX design overhaul.",
              link: "https://notion.so/wynn",
            },
          ],
          narrativeStructure: "Challenge ➜ Insight ➜ Solution ➜ Win ➜ Value",
        };

        const prompt = buildDeepResearchPrompt(input);
        const geminiResult = await getGeminiSummary(prompt);
        setGeminiResponse(geminiResult);
      } catch (err) {
        console.error("❌ Error running deep research:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAndAnalyze();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Prospect Insight Sheets 🔎
</h2>
      </div>

      {loading ? (
        <p>Get a coffee ☕️ We are collating the Research Summary for you... 😎</p>
      ) : (
        <>
          {/* Render for screen */}
          <div className="prose prose-lg max-w-none whitespace-pre-wrap bg-white p-6 rounded-md shadow mb-6">
            <ReactMarkdown>{geminiResponse}</ReactMarkdown>
          </div>

          {/* Hidden printable version */}
          <div style={{ display: "none" }}>
            <PrintableContent ref={printRef} content={geminiResponse} />
          </div>
        </>
      )}
    </div>
  );
};

export default DeepResearchView;
