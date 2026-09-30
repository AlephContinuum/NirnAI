export const tenders = [
  {
    id: "NIR/2026/B/001",
    title: "Supply and Installation of IT Infrastructure",
    department: "Department of Digital Infrastructure",
    category: "IT Infrastructure",
    type: "Tender",
    status: "Ongoing",
    startDate: "11 Sep 2026",
    endDate: "20 Sep 2026",
    value: "₹5.8 Cr",
    bids: 18,
    requirements: [
      { id: "REQ-001", type: "EXPERIENCE", title: "Minimum 3 years relevant experience", value: 3, unit: "YEARS", mandatory: true },
      { id: "REQ-002", type: "FINANCIAL", title: "Minimum annual turnover of ₹5 Crore", value: 50000000, unit: "INR", mandatory: true },
      { id: "REQ-003", type: "CERTIFICATION", title: "ISO 9001 certification", value: "ISO 9001", unit: "CERTIFICATION", mandatory: true },
      { id: "REQ-004", type: "EXPERIENCE", title: "Government project experience", value: true, unit: "BOOLEAN", mandatory: true },
      { id: "REQ-005", type: "TECHNICAL", title: "Minimum RAM specification of 16 GB", value: 16, unit: "GB", mandatory: true },
      { id: "REQ-006", type: "DOCUMENT", title: "Valid GST registration", value: true, unit: "BOOLEAN", mandatory: true },
      { id: "REQ-007", type: "DOCUMENT", title: "PAN document", value: true, unit: "BOOLEAN", mandatory: true },
      { id: "REQ-008", type: "DOCUMENT", title: "Financial proposal", value: true, unit: "BOOLEAN", mandatory: true }
    ],
    requiredDocuments: ["GST Certificate", "PAN Card", "Experience Certificate", "ISO 9001 Certificate", "Technical Proposal", "Financial Proposal"]
  },
  {
    id: "NIR/2026/B/002",
    title: "Managed Cloud Services for Government Data Centre",
    department: "National Digital Services Division",
    category: "Cloud Services",
    type: "Tender",
    status: "Ongoing",
    startDate: "13 Sep 2026",
    endDate: "25 Sep 2026",
    value: "₹12.4 Cr",
    bids: 11,
    requirements: [
      { id: "REQ-101", type: "EXPERIENCE", title: "Minimum 5 years cloud service experience", value: 5, unit: "YEARS", mandatory: true },
      { id: "REQ-102", type: "CERTIFICATION", title: "ISO 27001 certification", value: "ISO 27001", unit: "CERTIFICATION", mandatory: true },
      { id: "REQ-103", type: "TECHNICAL", title: "24×7 support and monitoring", value: true, unit: "BOOLEAN", mandatory: true },
      { id: "REQ-104", type: "FINANCIAL", title: "Minimum annual turnover of ₹10 Crore", value: 100000000, unit: "INR", mandatory: true }
    ],
    requiredDocuments: ["GST Certificate", "PAN Card", "ISO 27001 Certificate", "Experience Certificate", "Technical Proposal", "Financial Proposal"]
  },
  {
    id: "NIR/2026/B/003",
    title: "Cybersecurity Assessment and VAPT Services",
    department: "National Cyber Security Cell",
    category: "Cybersecurity",
    type: "Tender",
    status: "Upcoming",
    startDate: "02 Oct 2026",
    endDate: "18 Oct 2026",
    value: "₹2.1 Cr",
    bids: 0,
    requirements: [
      { id: "REQ-201", type: "EXPERIENCE", title: "Minimum 3 completed VAPT engagements", value: 3, unit: "PROJECTS", mandatory: true },
      { id: "REQ-202", type: "CERTIFICATION", title: "ISO 27001 certification", value: "ISO 27001", unit: "CERTIFICATION", mandatory: true },
      { id: "REQ-203", type: "TECHNICAL", title: "Certified security professionals on payroll", value: true, unit: "BOOLEAN", mandatory: true }
    ],
    requiredDocuments: ["GST Certificate", "PAN Card", "Experience Certificates", "ISO 27001 Certificate", "Technical Proposal", "Financial Proposal"]
  },
  {
    id: "NIR/2026/B/004",
    title: "Procurement of Network Security Appliances",
    department: "Government Network Operations",
    category: "Networking",
    type: "Reverse Auction",
    status: "Ongoing",
    startDate: "09 Sep 2026",
    endDate: "16 Sep 2026",
    value: "₹3.6 Cr",
    bids: 24,
    requirements: [
      { id: "REQ-301", type: "TECHNICAL", title: "Firewall throughput of minimum 40 Gbps", value: 40, unit: "GBPS", mandatory: true },
      { id: "REQ-302", type: "CERTIFICATION", title: "OEM authorization certificate", value: true, unit: "BOOLEAN", mandatory: true },
      { id: "REQ-303", type: "FINANCIAL", title: "Minimum annual turnover of ₹3 Crore", value: 30000000, unit: "INR", mandatory: true }
    ],
    requiredDocuments: ["GST Certificate", "PAN Card", "OEM Authorization", "Technical Datasheet", "Financial Bid"]
  }
];

export const submittedBids = [
  {
    id: "NIR-BID-2026-000123",
    tenderId: "NIR/2026/B/001",
    bidder: "ABC Technologies Pvt. Ltd.",
    documents: 6,
    required: 6,
    status: "Pending Analysis",
    submitted: "30 Sep 2026, 14:32",
    result: null
  },
  {
    id: "NIR-BID-2026-000124",
    tenderId: "NIR/2026/B/001",
    bidder: "XYZ Solutions India Ltd.",
    documents: 5,
    required: 6,
    status: "Missing Document",
    submitted: "30 Sep 2026, 13:48",
    result: null
  },
  {
    id: "NIR-BID-2026-000125",
    tenderId: "NIR/2026/B/001",
    bidder: "TechNova Systems Pvt. Ltd.",
    documents: 6,
    required: 6,
    status: "Analysis Complete",
    submitted: "30 Sep 2026, 12:15",
    result: { score: 96, satisfied: 7, review: 1, failed: 0 }
  }
];

export const mockAnalysis = {
  bidId: "NIR-BID-2026-000123",
  bidder: "ABC Technologies Pvt. Ltd.",
  tender: "NIR/2026/B/001",
  score: 87,
  status: "REVIEW_REQUIRED",
  summary: "The submission contains evidence for all major eligibility requirements. A technical specification mismatch was identified for RAM, while the ISO certificate requires validity review. The report is intended to support officer review and does not constitute a procurement decision.",
  requirements: [
    { id: "REQ-001", requirement: "Minimum 3 years relevant experience", status: "SATISFIED", evidenceDocument: "Experience_Certificate.pdf", evidence: "5 years of relevant experience identified.", confidence: 0.91, source: "Page 2" },
    { id: "REQ-002", requirement: "Minimum annual turnover of ₹5 Crore", status: "SATISFIED", evidenceDocument: "Financial_Statement.pdf", evidence: "Reported annual turnover of ₹7.4 Crore.", confidence: 0.94, source: "Page 4" },
    { id: "REQ-003", requirement: "ISO 9001 certification", status: "REVIEW_REQUIRED", evidenceDocument: "ISO_Certificate.pdf", evidence: "Certificate located; expiry date requires officer verification.", confidence: 0.88, source: "Page 1" },
    { id: "REQ-004", requirement: "Government project experience", status: "SATISFIED", evidenceDocument: "Experience_Certificate.pdf", evidence: "Government network deployment project identified.", confidence: 0.93, source: "Page 2" },
    { id: "REQ-005", requirement: "Minimum RAM specification of 16 GB", status: "NOT_SATISFIED", evidenceDocument: "Technical_Proposal.pdf", evidence: "Submitted specification indicates 8 GB RAM.", confidence: 0.98, source: "Page 7" },
    { id: "REQ-006", requirement: "Valid GST registration", status: "SATISFIED", evidenceDocument: "GST_Certificate.pdf", evidence: "GST registration number extracted.", confidence: 0.97, source: "Page 1" },
    { id: "REQ-007", requirement: "PAN document", status: "SATISFIED", evidenceDocument: "PAN.pdf", evidence: "PAN identifier extracted.", confidence: 0.99, source: "Page 1" },
    { id: "REQ-008", requirement: "Financial proposal", status: "SATISFIED", evidenceDocument: "Financial_Proposal.pdf", evidence: "Financial proposal present.", confidence: 0.99, source: "Page 1" }
  ],
  issues: [
    { severity: "HIGH", type: "SPECIFICATION_MISMATCH", description: "Tender requires 16 GB RAM; submitted technical specification indicates 8 GB.", source: "Technical_Proposal.pdf · Page 7" },
    { severity: "MEDIUM", type: "VALIDITY_REVIEW", description: "ISO 9001 certificate is present, but the extracted expiry information requires manual verification.", source: "ISO_Certificate.pdf · Page 1" }
  ]
};