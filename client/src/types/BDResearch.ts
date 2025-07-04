export interface ReferenceLink {
  name: string;
  link: string;
}

export interface ClosureSummary {
  name: string;
  summary: string;
  link: string;
}

export interface BDResearchInput {
  bdName: string;
  geography: string;
  industry: string;
  company: string;
  engagementType: string;
  pursuitSummary: string;
  referenceProposals: ReferenceLink[];
  projectClosures: ClosureSummary[];
  narrativeStructure: string;
}
