import { type BDResearchInput } from "../types/BDResearch";

export function buildDeepResearchPrompt(data: BDResearchInput): string {
  console.log("DATA", data)
  return `
Objective:
To generate a comprehensive research report for our Business Development and Sales team. The report should provide actionable insights into the ${data.geography} ${data.industry}, with a specific deep dive on our key competitor, ${data.company}. The goal is to equip our team with the knowledge to engage in strategic conversations, understand customer needs, ask intelligent questions, and ultimately win more business. The tone should be analytical, strategic, and focused on sales enablement.

Audience:
${data.geography} Sales Team

Format:
A structured report using clear headings, bullet points, and bolded key takeaways. Start with an executive summary that provides the most critical “so what” points for a salesperson.

I. Executive Summary: The State of Play in ${data.geography} ${data.industry}
Top 5 Actionable Insights for the Sales Team: Summarize the most critical takeaways a salesperson needs to know right now about the market and ${data.company}.
Key Talking Points: Provide 3–4 compelling, data-backed talking points that the team can use in client conversations.
${data.company}’s Current Strategic Focus: What is ${data.company}’s primary goal right now? (e.g., market share growth, operational efficiency, technology leadership).

This executive summary should be a one-pager and serve as the cover of the report. Use short bullets, bolding for key elements, and write at a Grade 5 reading level.

II. ${data.geography} ${data.industry} Landscape
A. Industry Pain Points & Customer Challenges
What are the primary frustrations for ${data.industry} owners/operators today?
What challenges do end-customers face that our solution can address?

B. Industry Trends & Opportunities
New Areas of Opportunity: Where is the market headed?
Market Size & Growth:
Current estimated ${data.geography} market size in local currency
Projected annual growth rate (CAGR) for the next 3–5 years
Geographic Mix:
Top regions/states with highest concentration or growth
Identify 5–10 key areas as competitive battlegrounds
E-commerce vs. Physical Channel Analysis:
Online vs. offline pricing/demand trends
Growth of digital or “contactless” engagement in the industry

C. PESTEL Analysis
Political: Zoning laws, taxation, and policy impacts
Economic: Interest rates, inflation, and housing/commercial trends
Social: Urbanization, downsizing, demographic shifts
Technological: Adoption of digital platforms, automation, data analytics
Environmental: Sustainability demands, energy efficiency
Legal: Regulations and compliance affecting operators

III. Company Deep Dive: ${data.company}
A. Mission and Guiding Principles
What is ${data.company}’s stated mission and core values?
How do they position themselves in the market, and where can we differentiate?

B. Financial Health & Strategic Objectives
Financial Trends (Timeline):
Revenue and profitability growth patterns
Simple table with yearly revenue for 3–5 years
Large Investments & M&A:
Major acquisitions or initiatives and their strategic significance
Leadership & Organizational Changes:
Recent leadership transitions and implications
Stated Financial Objectives:
Strategic goals based on investor presentations or public filings

IV. Customer Analysis: The ${data.geography} ${data.industry} Customer
A. Customer Demographics
Typical customer profile by age, gender, and income
Primary reasons for engaging with ${data.industry} products/services

B. Customer Personas
Persona 1: [Name]
Profile: [Age] [Profession] [Objective]
Pain Points:
What She Values:

V. Competitive Analysis: Top 5 Players in ${data.industry}
A. Market Share Overview
Provide total market size and break down market share for top 5 players

Reference Proposals:
${data.referenceProposals.map(p => `- ${p.name} (${p.link})`).join("\n")}

Project Closures:
${data.projectClosures.map(p => `- ${p.name}: ${p.summary} (${p.link})`).join("\n")}

Narrative Structure:
${data.narrativeStructure}
`.trim();
}
