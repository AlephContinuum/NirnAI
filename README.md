# Nirnay Procurement Portal

Nirnay is an AI-assisted government tender document intelligence and bid-compliance evaluation prototype.

## What is included

This frontend implements the complete prototype journey:

### Bidder
- Procurement portal
- Tender listing
- Search and filters
- Tender details
- Requirement checklist
- Bid participation
- Document upload
- Upload validation
- Bid review
- Submission confirmation
- My Bids
- My Documents
- FAQs

### Tender Officer
- Evaluation dashboard
- Submitted bids
- Bid submission inspection
- AI analysis progress
- Requirement-by-requirement compliance analysis
- Evidence panel
- Confidence indicators
- Issue severity
- AI-generated summary
- Audit trail

## Stack

- React
- Vite
- React Router
- Lucide React
- CSS

The frontend currently uses controlled mock data. It is intentionally structured so the mock services can later be replaced by the Nirnay FastAPI backend.

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Deploy

### Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

### Netlify

Build command:

```bash
npm run build
```

Publish directory:

```text
dist
```

## Important

This is an independent Nirnay prototype. It is inspired by public procurement portal interaction patterns but is not the official Government e-Marketplace (GeM) website.

Do not present Nirnay as GeM or use official GeM branding as if this were an official service.

## Next backend integration

The frontend should eventually call:

```text
GET  /api/tenders
GET  /api/tenders/{tender_id}
POST /api/bids
GET  /api/bids
GET  /api/bids/{bid_id}
POST /api/bids/{bid_id}/documents
GET  /api/bids/{bid_id}/documents
POST /api/bids/{bid_id}/analyze
GET  /api/bids/{bid_id}/analysis
```

The AI result should remain structured JSON and should contain evidence references, requirement status, confidence, and issues.
