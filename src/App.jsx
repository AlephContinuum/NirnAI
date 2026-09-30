import { useMemo, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight, Bell, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardCheck,
  Clock3, Download, FileCheck2, FileText, Filter, FolderOpen, Gauge, Globe2, Home,
  Info, LayoutDashboard, Menu, Search, ShieldCheck, Sparkles, Upload, UserRound,
  X, CheckCircle2, AlertTriangle, XCircle, Eye, Building2, IndianRupee, ListChecks,
  RefreshCw, ExternalLink
} from "lucide-react";
import { tenders, submittedBids, mockAnalysis } from "./data";

function App() {
  return (
    <Routes>
      <Route path="*" element={<PortalLayout />} />
    </Routes>
  );
}

function PortalLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isOfficer = location.pathname.startsWith("/officer");
  const [role, setRole] = useState(isOfficer ? "officer" : "bidder");

  const switchRole = () => {
    const next = role === "bidder" ? "officer" : "bidder";
    setRole(next);
    navigate(next === "officer" ? "/officer" : "/bids");
    setMobileOpen(false);
  };

  return (
    <div className="app-shell">
      <TopUtilityBar />
      <header className="main-header">
        <div className="container header-inner">
          <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu">
            <Menu size={20} />
          </button>
          <Link to={role === "officer" ? "/officer" : "/bids"} className="brand">
            <div className="brand-mark"><ShieldCheck size={25} strokeWidth={2.4} /></div>
            <div>
              <div className="brand-name">NIRNAY</div>
              <div className="brand-sub">PROCUREMENT INTELLIGENCE</div>
            </div>
          </Link>

          <div className="header-search">
            <Search size={18} />
            <input placeholder={role === "officer" ? "Search bids, bidders or tender IDs" : "Search tenders, categories or bid numbers"} />
            <button>Search</button>
          </div>

          <div className="header-actions">
            <button className="icon-btn" title="Notifications"><Bell size={19} /><span className="notification-dot" /></button>
            <button className="help-btn"><CircleHelp size={17} /> Help</button>
            <button className="profile-btn"><UserRound size={17} /><span>{role === "officer" ? "Officer" : "Bidder"}</span><ChevronDown size={15} /></button>
          </div>
        </div>
      </header>

      <nav className={`primary-nav ${mobileOpen ? "open" : ""}`}>
        <div className="container nav-inner">
          {role === "bidder" ? (
            <>
              <NavItem to="/bids" label="Home" icon={<Home size={16} />} active={location.pathname === "/bids"} />
              <NavItem to="/bids" label="Tenders" active={location.pathname.includes("/tender")} />
              <NavItem to="/my-bids" label="My Bids" active={location.pathname === "/my-bids"} />
              <NavItem to="/documents" label="My Documents" active={location.pathname === "/documents"} />
              <NavItem to="/help" label="FAQs" active={location.pathname === "/help"} />
            </>
          ) : (
            <>
              <NavItem to="/officer" label="Dashboard" icon={<LayoutDashboard size={16} />} active={location.pathname === "/officer"} />
              <NavItem to="/officer/bids" label="Submitted Bids" active={location.pathname === "/officer/bids"} />
              <NavItem to="/officer/analysis" label="AI Analyses" active={location.pathname === "/officer/analysis"} />
              <NavItem to="/officer/audit" label="Audit Trail" active={location.pathname === "/officer/audit"} />
            </>
          )}
          <div className="nav-spacer" />
          <button className="role-switch" onClick={switchRole}>
            <RefreshCw size={14} /> Switch to {role === "bidder" ? "Officer Portal" : "Bidder Portal"}
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<NavigateTo to="/bids" />} />
          <Route path="/bids" element={<BidListing />} />
          <Route path="/tender/:id" element={<TenderDetails />} />
          <Route path="/tender/:id/participate" element={<Participation />} />
          <Route path="/tender/:id/upload" element={<DocumentUpload />} />
          <Route path="/tender/:id/review" element={<BidReview />} />
          <Route path="/submission-success/:bidId" element={<SubmissionSuccess />} />
          <Route path="/my-bids" element={<MyBids />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/officer" element={<OfficerDashboard />} />
          <Route path="/officer/bids" element={<OfficerBids />} />
          <Route path="/officer/bid/:bidId" element={<OfficerBid />} />
          <Route path="/officer/bid/:bidId/analyze" element={<AnalysisProgress />} />
          <Route path="/officer/analysis" element={<AnalysisPage />} />
          <Route path="/officer/audit" element={<AuditTrail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function NavigateTo({ to }) {
  const navigate = useNavigate();
  useMemo(() => navigate(to, { replace: true }), [navigate, to]);
  return null;
}

function TopUtilityBar() {
  return (
    <div className="utility-bar">
      <div className="container utility-inner">
        <div className="utility-left">
          <span>Government Procurement Intelligence Platform</span>
          <span className="utility-separator">|</span>
          <span>Prototype Environment</span>
        </div>
        <div className="utility-right">
          <span><Globe2 size={13} /> English <ChevronDown size={12} /></span>
          <span>Accessibility</span>
          <span>Skip to content</span>
        </div>
      </div>
    </div>
  );
}

function NavItem({ to, label, icon, active }) {
  return <Link className={`nav-item ${active ? "active" : ""}`} to={to}>{icon}{label}</Link>;
}

function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  );
}

function PortalNotice() {
  return (
    <div className="portal-notice">
      <Info size={17} />
      <div><strong>Nirnay Prototype</strong> — This interface is an independent prototype inspired by public procurement portal workflows. It is not the official Government e-Marketplace (GeM) website.</div>
    </div>
  );
}

function BidListing() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");

  const categories = [...new Set(tenders.map(t => t.category))];
  const filtered = tenders.filter(t => {
    const hay = `${t.id} ${t.title} ${t.department} ${t.category}`.toLowerCase();
    return hay.includes(search.toLowerCase()) &&
      (status === "All" || t.status === status) &&
      (category === "All" || t.category === category) &&
      (type === "All" || t.type === type);
  });

  return (
    <div className="container">
      <PortalNotice />
      <PageHeader
        eyebrow="BID DISCOVERY"
        title="Find Tenders"
        description="Discover active government procurement opportunities and review eligibility requirements before participating."
      />

      <div className="quick-stats">
        <StatCard label="Ongoing Tenders" value="128" icon={<FileText />} />
        <StatCard label="New Today" value="17" icon={<Clock3 />} />
        <StatCard label="Categories" value="42" icon={<FolderOpen />} />
        <StatCard label="AI-Ready Evaluations" value="36" icon={<Sparkles />} />
      </div>

      <div className="search-panel">
        <div className="search-main">
          <Search size={19} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by bid number, tender title, department or keyword" />
          <button className="primary-btn">Search</button>
        </div>
        <div className="filter-row">
          <div className="filter-label"><Filter size={16} /> Filters</div>
          <Select label="Bid Status" value={status} onChange={setStatus} options={["All", "Ongoing", "Upcoming", "Closed"]} />
          <Select label="Bid Type" value={type} onChange={setType} options={["All", "Tender", "Reverse Auction"]} />
          <Select label="Category" value={category} onChange={setCategory} options={["All", ...categories]} />
          <button className="text-btn" onClick={() => { setSearch(""); setStatus("All"); setCategory("All"); setType("All"); }}>Clear all</button>
        </div>
      </div>

      <div className="results-head">
        <div><strong>{filtered.length}</strong> opportunities found</div>
        <div className="sort-control">Sort by <strong>Closing Date</strong> <ChevronDown size={14} /></div>
      </div>

      <div className="listing-layout">
        <aside className="filter-sidebar">
          <div className="sidebar-title">Browse Tenders</div>
          <SideLink label="All Tenders" count="128" active />
          <SideLink label="Ongoing" count="87" />
          <SideLink label="Upcoming" count="41" />
          <div className="side-section">
            <div className="side-heading">Popular Categories</div>
            {["IT Infrastructure", "Cloud Services", "Cybersecurity", "Networking"].map(c => <SideLink key={c} label={c} />)}
          </div>
          <div className="side-help">
            <CircleHelp size={18} />
            <strong>Need help?</strong>
            <span>Review the tender FAQs before submitting a bid.</span>
          </div>
        </aside>

        <section className="tender-list">
          {filtered.map(t => <TenderCard key={t.id} tender={t} />)}
        </section>
      </div>
    </div>
  );
}

function TenderCard({ tender }) {
  return (
    <article className="tender-card">
      <div className="tender-topline">
        <span className={`status-pill ${tender.status.toLowerCase()}`}>{tender.status}</span>
        <span className="bid-type">{tender.type}</span>
        <span className="tender-id">{tender.id}</span>
      </div>
      <Link to={`/tender/${encodeURIComponent(tender.id)}`} className="tender-title">{tender.title}</Link>
      <div className="tender-dept"><Building2 size={15} /> {tender.department}</div>
      <div className="tender-meta-grid">
        <Meta label="Category" value={tender.category} />
        <Meta label="Bid Start" value={tender.startDate} />
        <Meta label="Bid End" value={tender.endDate} urgent={tender.status === "Ongoing"} />
        <Meta label="Estimated Value" value={tender.value} />
        <Meta label="Current Bids" value={String(tender.bids)} />
      </div>
      <div className="tender-bottom">
        <div className="requirements-mini"><ListChecks size={15} /> {tender.requirements.length} key requirements · {tender.requiredDocuments.length} documents</div>
        <Link to={`/tender/${encodeURIComponent(tender.id)}`} className="outline-btn">View Details <ArrowRight size={15} /></Link>
      </div>
    </article>
  );
}

function TenderDetails() {
  const { id } = useParams();
  const tender = tenders.find(t => t.id === decodeURIComponent(id)) || tenders[0];
  return (
    <div className="container">
      <Breadcrumb items={[["Tenders", "/bids"], [tender.id, "#"]]} />
      <PageHeader eyebrow="TENDER DETAILS" title={tender.title} description={`${tender.department} · ${tender.category}`} actions={<Link to={`/tender/${encodeURIComponent(tender.id)}/participate`} className="primary-btn">Participate in Bid <ArrowRight size={16} /></Link>} />

      <div className="tender-banner">
        <div><span>Tender Number</span><strong>{tender.id}</strong></div>
        <div><span>Bid End Date</span><strong className="danger-text">{tender.endDate}</strong></div>
        <div><span>Estimated Value</span><strong>{tender.value}</strong></div>
        <div><span>Bid Type</span><strong>{tender.type}</strong></div>
      </div>

      <div className="detail-grid">
        <section className="content-card">
          <CardTitle icon={<ListChecks />} title="Eligibility & Technical Requirements" />
          <div className="requirement-table">
            {tender.requirements.map((r, i) => (
              <div className="requirement-row" key={r.id}>
                <div className="req-number">{String(i + 1).padStart(2, "0")}</div>
                <div><div className="req-type">{r.type}</div><strong>{r.title}</strong></div>
                {r.mandatory && <span className="mandatory">Mandatory</span>}
              </div>
            ))}
          </div>
        </section>
        <aside className="content-card">
          <CardTitle icon={<FileCheck2 />} title="Required Documents" />
          <div className="doc-checklist">
            {tender.requiredDocuments.map(doc => <div key={doc}><CheckCircle2 size={16} /> {doc}</div>)}
          </div>
          <div className="side-note"><Info size={15} /> Uploading a document does not by itself establish legal validity. Nirnay performs evidence analysis after submission.</div>
        </aside>
      </div>

      <section className="content-card dates-card">
        <CardTitle icon={<Clock3 />} title="Important Dates" />
        <div className="timeline">
          <TimelineItem label="Bid Start" date={tender.startDate} done />
          <TimelineItem label="Current Date" date="30 Sep 2026" done />
          <TimelineItem label="Bid End" date={tender.endDate} />
        </div>
      </section>
    </div>
  );
}

function Participation() {
  const { id } = useParams();
  const tender = tenders.find(t => t.id === decodeURIComponent(id)) || tenders[0];
  return (
    <div className="container narrow">
      <Breadcrumb items={[["Tenders", "/bids"], ["Tender Details", `/tender/${encodeURIComponent(tender.id)}`], ["Participation", "#"]]} />
      <PageHeader eyebrow="BID PARTICIPATION" title="Participate in Bid" description={`Complete the submission for ${tender.id}.`} />
      <ProgressSteps current={1} />
      <section className="content-card">
        <CardTitle icon={<Building2 />} title="Bidder Information" />
        <div className="form-grid">
          <FormField label="Organization Name" value="ABC Technologies Pvt. Ltd." />
          <FormField label="Organization Type" value="Private Limited Company" />
          <FormField label="Authorized Representative" value="Demo Bidder" />
          <FormField label="Email Address" value="procurement@abctech.example" />
        </div>
        <div className="form-footer"><Link to={`/tender/${encodeURIComponent(tender.id)}`} className="text-btn">Back</Link><Link to={`/tender/${encodeURIComponent(tender.id)}/upload`} className="primary-btn">Continue to Documents <ArrowRight size={16} /></Link></div>
      </section>
    </div>
  );
}

function DocumentUpload() {
  const { id } = useParams();
  const tender = tenders.find(t => t.id === decodeURIComponent(id)) || tenders[0];
  const [uploaded, setUploaded] = useState({});
  const [drag, setDrag] = useState(null);

  const upload = (doc, file) => {
    if (!file) return;
    setUploaded(prev => ({ ...prev, [doc]: { name: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` } }));
  };

  const allUploaded = tender.requiredDocuments.every(d => uploaded[d]);

  return (
    <div className="container narrow">
      <Breadcrumb items={[["Tenders", "/bids"], ["Participation", `/tender/${encodeURIComponent(tender.id)}/participate`], ["Documents", "#"]]} />
      <PageHeader eyebrow="DOCUMENT SUBMISSION" title="Upload Tender Documents" description="Submit the documents required for this tender. Supported formats: PDF, DOCX, JPG, PNG." />
      <ProgressSteps current={2} />
      <div className="upload-summary"><strong>{Object.keys(uploaded).length} of {tender.requiredDocuments.length}</strong> required documents uploaded <span>·</span> Maximum 20 MB per file</div>
      <div className="upload-list">
        {tender.requiredDocuments.map(doc => (
          <div key={doc} className={`upload-row ${uploaded[doc] ? "uploaded" : ""}`} onDragOver={e => { e.preventDefault(); setDrag(doc); }} onDragLeave={() => setDrag(null)} onDrop={e => { e.preventDefault(); setDrag(null); upload(doc, e.dataTransfer.files?.[0]); }}>
            <div className="upload-icon">{uploaded[doc] ? <CheckCircle2 /> : <FileText />}</div>
            <div className="upload-info"><strong>{doc}</strong>{uploaded[doc] ? <span className="uploaded-file">✓ {uploaded[doc].name} · {uploaded[doc].size}</span> : <span>Required document · PDF/DOCX/JPG/PNG</span>}</div>
            <label className={`upload-btn ${drag === doc ? "dragging" : ""}`}><Upload size={16} /> {uploaded[doc] ? "Replace" : "Choose File"}<input type="file" accept=".pdf,.docx,.jpg,.jpeg,.png" onChange={e => upload(doc, e.target.files?.[0])} /></label>
          </div>
        ))}
      </div>
      <div className="upload-disclaimer"><Info size={16} /> Prototype mode: files are held in browser state. The production workflow will send documents to the FastAPI document service.</div>
      <div className="form-footer"><Link to={`/tender/${encodeURIComponent(tender.id)}/participate`} className="text-btn">Back</Link><Link className={`primary-btn ${!allUploaded ? "disabled" : ""}`} to={allUploaded ? `/tender/${encodeURIComponent(tender.id)}/review` : "#"}>Review Submission <ArrowRight size={16} /></Link></div>
    </div>
  );
}

function BidReview() {
  const { id } = useParams();
  const tender = tenders.find(t => t.id === decodeURIComponent(id)) || tenders[0];
  return (
    <div className="container narrow">
      <Breadcrumb items={[["Tenders", "/bids"], ["Documents", `/tender/${encodeURIComponent(tender.id)}/upload`], ["Review", "#"]]} />
      <PageHeader eyebrow="FINAL REVIEW" title="Review & Submit Bid" description="Verify the information below before submitting." />
      <ProgressSteps current={4} />
      <section className="content-card">
        <CardTitle icon={<ClipboardCheck />} title="Bid Submission Summary" />
        <div className="review-block"><span>Tender</span><strong>{tender.id} · {tender.title}</strong></div>
        <div className="review-block"><span>Bidder</span><strong>ABC Technologies Pvt. Ltd.</strong></div>
        <div className="review-block"><span>Required Documents</span><strong>{tender.requiredDocuments.length} / {tender.requiredDocuments.length} present</strong></div>
        <div className="review-docs">{tender.requiredDocuments.map(d => <div key={d}><CheckCircle2 size={16} /> {d}<span>Uploaded</span></div>)}</div>
        <div className="review-confirm"><input type="checkbox" defaultChecked /> I confirm that the submitted information is accurate to the best of my knowledge and that the final procurement decision remains with the procuring authority.</div>
        <div className="form-footer"><Link to={`/tender/${encodeURIComponent(tender.id)}/upload`} className="text-btn">Back</Link><Link to="/submission-success/NIR-BID-2026-000123" className="primary-btn">Submit Bid <ArrowRight size={16} /></Link></div>
      </section>
    </div>
  );
}

function SubmissionSuccess() {
  const { bidId } = useParams();
  return (
    <div className="container narrow">
      <div className="success-card">
        <div className="success-icon"><CheckCircle2 size={42} /></div>
        <div className="eyebrow">SUBMISSION CONFIRMED</div>
        <h1>Bid Submitted Successfully</h1>
        <p>Your tender submission has been recorded in the Nirnay prototype workflow.</p>
        <div className="success-reference"><span>Bid Reference</span><strong>{bidId}</strong></div>
        <div className="success-meta"><span>Tender</span><strong>NIR/2026/B/001</strong><span>Submitted</span><strong>30 Sep 2026, 15:04</strong></div>
        <div className="success-actions"><Link to="/bids" className="outline-btn">Return to Tenders</Link><Link to="/officer" className="primary-btn">Open Evaluation Portal <ArrowRight size={16} /></Link></div>
      </div>
    </div>
  );
}

function OfficerDashboard() {
  return (
    <div className="container">
      <PageHeader eyebrow="NIRNAY AI · EVALUATION PORTAL" title="Tender Evaluation Dashboard" description="Review submitted bids and use Nirnay AI to structure requirement-to-evidence analysis." actions={<Link to="/officer/bids" className="primary-btn">View All Bids <ArrowRight size={16} /></Link>} />
      <div className="quick-stats officer-stats">
        <StatCard label="Submitted Bids" value="53" icon={<FileText />} />
        <StatCard label="Pending Analysis" value="21" icon={<Clock3 />} />
        <StatCard label="Review Required" value="8" icon={<AlertTriangle />} />
        <StatCard label="Completed Analyses" value="24" icon={<ShieldCheck />} />
      </div>
      <div className="dashboard-grid">
        <section className="content-card">
          <CardTitle icon={<ListChecks />} title="Recent Submitted Bids" action={<Link to="/officer/bids" className="text-btn">View all</Link>} />
          <div className="bid-table">
            <div className="table-head"><span>Bidder</span><span>Documents</span><span>Status</span><span>Action</span></div>
            {submittedBids.map(b => (
              <div className="table-row" key={b.id}>
                <div><strong>{b.bidder}</strong><small>{b.id}</small></div>
                <span>{b.documents}/{b.required}</span>
                <StatusTag status={b.status} />
                <Link to={`/officer/bid/${b.id}`} className="small-action"><Eye size={14} /> View</Link>
              </div>
            ))}
          </div>
        </section>
        <section className="content-card">
          <CardTitle icon={<Sparkles />} title="Nirnay AI Overview" />
          <div className="ai-overview">
            <div className="ai-ring"><span>87%</span><small>sample score</small></div>
            <p><strong>Explainable screening</strong></p>
            <span>AI results are grounded in uploaded evidence and should be reviewed by an authorized officer.</span>
            <Link to="/officer/analysis" className="outline-btn full">Open Analysis Workspace</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function OfficerBids() {
  const [query, setQuery] = useState("");
  const filtered = submittedBids.filter(b => `${b.bidder} ${b.id}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="container">
      <PageHeader eyebrow="EVALUATION PORTAL" title="Submitted Bids" description="Select a submission to inspect documents and start Nirnay AI analysis." />
      <div className="search-panel compact"><div className="search-main"><Search size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search bidder or bid reference" /><button className="primary-btn">Search</button></div></div>
      <section className="content-card">
        <div className="bid-table officer-table">
          <div className="table-head"><span>Bidder / Reference</span><span>Submitted</span><span>Documents</span><span>Status</span><span>Action</span></div>
          {filtered.map(b => <div className="table-row" key={b.id}>
            <div><strong>{b.bidder}</strong><small>{b.id}</small></div>
            <span>{b.submitted}</span>
            <span>{b.documents}/{b.required}</span>
            <StatusTag status={b.status} />
            <Link to={`/officer/bid/${b.id}`} className="small-action">Open <ArrowRight size={14} /></Link>
          </div>)}
        </div>
      </section>
    </div>
  );
}

function OfficerBid() {
  const { bidId } = useParams();
  const bid = submittedBids.find(b => b.id === bidId) || submittedBids[0];
  return (
    <div className="container">
      <Breadcrumb items={[["Officer Dashboard", "/officer"], ["Submitted Bids", "/officer/bids"], [bid.id, "#"]]} />
      <PageHeader eyebrow="BID REVIEW" title={bid.bidder} description={`Bid reference ${bid.id} · Tender ${bid.tenderId}`} actions={bid.result ? <Link to="/officer/analysis" className="primary-btn">View Analysis <ArrowRight size={16} /></Link> : <Link to={`/officer/bid/${bid.id}/analyze`} className="primary-btn"><Sparkles size={16} /> Analyze with Nirnay AI</Link>} />
      <div className="tender-banner">
        <div><span>Bid Reference</span><strong>{bid.id}</strong></div>
        <div><span>Documents</span><strong>{bid.documents}/{bid.required}</strong></div>
        <div><span>Submission Time</span><strong>{bid.submitted}</strong></div>
        <div><span>Status</span><StatusTag status={bid.status} /></div>
      </div>
      <div className="detail-grid">
        <section className="content-card">
          <CardTitle icon={<FolderOpen />} title="Submitted Documents" />
          {["GST_Certificate.pdf", "PAN.pdf", "Experience_Certificate.pdf", "ISO_Certificate.pdf", "Technical_Proposal.pdf", "Financial_Proposal.pdf"].map((d, i) => (
            <div className="document-line" key={d}><FileText size={18} /><div><strong>{d}</strong><span>PDF · {i + 1}.2 MB</span></div><button className="icon-btn subtle"><Eye size={16} /></button></div>
          ))}
        </section>
        <section className="content-card">
          <CardTitle icon={<ListChecks />} title="Tender Requirements" />
          {tenders[0].requirements.map(r => <div className="compact-req" key={r.id}><CheckCircle2 size={15} /> {r.title}</div>)}
        </section>
      </div>
    </div>
  );
}

function AnalysisProgress() {
  const { bidId } = useParams();
  const [done, setDone] = useState(5);
  const navigate = useNavigate();
  const steps = ["Reading Tender Requirements", "Classifying Bid Documents", "Extracting Document Information", "Matching Evidence to Requirements", "Checking Compliance", "Detecting Discrepancies", "Generating Explanation"];
  useState(() => {
    const timer = setInterval(() => setDone(v => Math.min(v + 1, 7)), 500);
    return () => clearInterval(timer);
  });
  return (
    <div className="container narrow">
      <div className="analysis-progress-card">
        <div className="ai-badge"><Sparkles size={22} /></div>
        <div className="eyebrow">NIRNAY AI ANALYSIS</div>
        <h1>Analyzing Bid Submission</h1>
        <p>{bidId} · ABC Technologies Pvt. Ltd.</p>
        <div className="processing-bar"><span style={{ width: `${Math.round((done / 7) * 100)}%` }} /></div>
        <div className="processing-list">
          {steps.map((s, i) => <div key={s} className={i < done ? "complete" : i === done ? "active" : ""}>{i < done ? <CheckCircle2 size={18} /> : i === done ? <span className="spinner" /> : <span className="empty-circle" />}<span>{s}</span>{i < done && <em>Complete</em>}</div>)}
        </div>
        {done >= 7 && <button className="primary-btn full" onClick={() => navigate("/officer/analysis")}>Open Compliance Analysis <ArrowRight size={16} /></button>}
      </div>
    </div>
  );
}

function AnalysisPage() {
  const [selected, setSelected] = useState(mockAnalysis.requirements[4]);
  return (
    <div className="container">
      <PageHeader eyebrow="NIRNAY AI · ANALYSIS RESULT" title={`Bid Analysis — ${mockAnalysis.bidder}`} description={`Tender ${mockAnalysis.tender} · Reference ${mockAnalysis.bidId}`} actions={<button className="outline-btn"><Download size={16} /> Export Report</button>} />
      <div className="analysis-summary">
        <div className="score-card"><div className="score-ring"><span>{mockAnalysis.score}%</span></div><div><span className="eyebrow">OVERALL COMPLIANCE INDICATOR</span><h2>Review Required</h2><p>AI-assisted screening indicator, not an official procurement decision.</p></div></div>
        <div className="result-count satisfied"><CheckCircle2 /><strong>6</strong><span>Satisfied</span></div>
        <div className="result-count review"><AlertTriangle /><strong>1</strong><span>Review Required</span></div>
        <div className="result-count failed"><XCircle /><strong>1</strong><span>Not Satisfied</span></div>
      </div>
      <div className="analysis-grid">
        <section className="content-card">
          <CardTitle icon={<ListChecks />} title="Requirement-by-Requirement Analysis" />
          <div className="analysis-table">
            <div className="analysis-head"><span>Requirement</span><span>Result</span><span>Evidence</span><span>Confidence</span></div>
            {mockAnalysis.requirements.map(r => <button className={`analysis-row ${selected.id === r.id ? "selected" : ""}`} key={r.id} onClick={() => setSelected(r)}>
              <span><strong>{r.requirement}</strong><small>{r.id}</small></span>
              <StatusTag status={r.status} />
              <span>{r.evidenceDocument}<small>{r.source}</small></span>
              <span>{Math.round(r.confidence * 100)}%</span>
            </button>)}
          </div>
        </section>
        <aside className="content-card evidence-panel">
          <CardTitle icon={<FileCheck2 />} title="Evidence & Explanation" />
          <div className="evidence-status"><StatusTag status={selected.status} /></div>
          <div className="evidence-section"><span>Requirement</span><strong>{selected.requirement}</strong></div>
          <div className="evidence-section"><span>Source</span><strong>{selected.evidenceDocument}</strong><small>{selected.source}</small></div>
          <div className="evidence-section"><span>Extracted Evidence</span><p>{selected.evidence}</p></div>
          <div className="evidence-section"><span>Extraction / Matching Confidence</span><div className="confidence"><span style={{width:`${selected.confidence*100}%`}} /><strong>{Math.round(selected.confidence*100)}%</strong></div><small>This is not a probability of legal eligibility.</small></div>
          <button className="outline-btn full"><Eye size={15} /> Inspect Source Document</button>
        </aside>
      </div>
      <section className="content-card">
        <CardTitle icon={<AlertTriangle />} title="Issues Requiring Attention" />
        {mockAnalysis.issues.map(issue => <div className="issue-row" key={issue.type}><span className={`severity ${issue.severity.toLowerCase()}`}>{issue.severity}</span><div><strong>{issue.type.replaceAll("_", " ")}</strong><p>{issue.description}</p><small>{issue.source}</small></div></div>)}
      </section>
      <section className="content-card ai-summary">
        <CardTitle icon={<Sparkles />} title="AI-Generated Summary" />
        <p>{mockAnalysis.summary}</p>
        <div className="grounding-note"><ShieldCheck size={17} /><strong>Evidence grounded:</strong> displayed findings reference submitted documents and extracted source locations.</div>
      </section>
    </div>
  );
}

function MyBids() {
  return <div className="container"><PageHeader eyebrow="BIDDER PORTAL" title="My Bids" description="Track your submitted tender applications." /><section className="content-card"><EmptyTable rows={["NIR-BID-2026-000123 · Supply and Installation of IT Infrastructure", "NIR-BID-2026-000087 · Network Security Appliances"]} /></section></div>;
}
function Documents() {
  return <div className="container"><PageHeader eyebrow="BIDDER PORTAL" title="My Documents" description="Documents associated with your current prototype submissions." /><section className="content-card"><EmptyTable rows={["GST_Certificate.pdf", "PAN.pdf", "Experience_Certificate.pdf", "ISO_Certificate.pdf", "Technical_Proposal.pdf"]} /></section></div>;
}
function HelpPage() {
  return <div className="container"><PageHeader eyebrow="SUPPORT" title="Frequently Asked Questions" description="Guidance for using the Nirnay procurement workflow." /><div className="faq-grid">{["How does bid submission work?", "What documents are required?", "What does REVIEW_REQUIRED mean?", "How does Nirnay AI use evidence?", "Is Nirnay an official GeM service?"].map((q,i)=><section className="content-card faq-card" key={q}><strong>{q}</strong><p>{["Select a tender, review its requirements, participate, upload the required documents and submit after final review.","Required documents are defined by each tender. Nirnay displays them before participation and during upload.","It means the available evidence is ambiguous or requires an officer to verify it manually.","Important results are linked to document evidence and deterministic comparisons are handled by application logic.","No. Nirnay is an independent prototype inspired by public procurement workflows."][i]}</p></section>)}</div></div>;
}
function AuditTrail() {
  return <div className="container"><PageHeader eyebrow="GOVERNANCE" title="Audit Trail" description="Prototype view of analysis events and officer actions." /><section className="content-card"><div className="audit-list">{["Analysis requested · NIR-BID-2026-000123", "Documents classified · 6 files", "Requirement extraction completed · 8 requirements", "Compliance comparison completed", "2 issues flagged for officer review"].map((x,i)=><div key={x}><span className="audit-time">15:{String(12+i*2).padStart(2,"0")}</span><CheckCircle2 size={16}/><strong>{x}</strong></div>)}</div></section></div>;
}

function Breadcrumb({ items }) { return <div className="breadcrumbs"><Home size={14} />{items.map(([label,to],i)=><span key={label}><ChevronRight size={13}/>{to === "#" ? <strong>{label}</strong> : <Link to={to}>{label}</Link>}</span>)}</div>; }
function ProgressSteps({ current }) { const steps=["Company Details","Eligibility Documents","Technical Documents","Financial Documents","Review & Submit"]; return <div className="progress-steps">{steps.map((s,i)=><div key={s} className={`${i+1 <= current ? "done" : ""} ${i+1===current ? "current":""}`}><span>{i+1 <= current ? <CheckCircle2 size={16}/> : i+1}</span><label>{s}</label></div>)}</div>; }
function StatCard({label,value,icon}) { return <div className="stat-card"><div className="stat-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong></div></div>; }
function Select({label,value,onChange,options}) { return <label className="select-wrap"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o}>{o}</option>)}</select></label>; }
function SideLink({label,count,active}) { return <div className={`side-link ${active?"active":""}`}><span>{label}</span>{count&&<small>{count}</small>}</div>; }
function Meta({label,value,urgent}) { return <div className="meta"><span>{label}</span><strong className={urgent?"danger-text":""}>{value}</strong></div>; }
function CardTitle({icon,title,action}) { return <div className="card-title"><div>{icon}<h2>{title}</h2></div>{action}</div>; }
function TimelineItem({label,date,done}) { return <div className="timeline-item"><div className={done?"timeline-dot done":"timeline-dot"}>{done&&<CheckCircle2 size={13}/>}</div><div><span>{label}</span><strong>{date}</strong></div></div>; }
function FormField({label,value}) { return <label className="form-field"><span>{label}</span><input defaultValue={value}/></label>; }
function StatusTag({status}) { const normalized=status.toLowerCase().replaceAll("_"," "); return <span className={`status-tag ${status.toLowerCase().replaceAll("_"," ")}`}>{status === "SATISFIED" || status === "Analysis Complete" ? <CheckCircle2 size={13}/> : status === "NOT_SATISFIED" ? <XCircle size={13}/> : <AlertTriangle size={13}/>} {normalized}</span>; }
function EmptyTable({rows}) { return <div className="simple-list">{rows.map((r,i)=><div key={r}><FileText size={17}/><strong>{r}</strong><span>{i===0?"Active":"Available"}</span><ArrowRight size={15}/></div>)}</div>; }

function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div><div className="brand footer-brand"><div className="brand-mark"><ShieldCheck size={22}/></div><div><div className="brand-name">NIRNAY</div><div className="brand-sub">PROCUREMENT INTELLIGENCE</div></div></div><p>AI-assisted document intelligence for government tender evaluation. Built as an independent prototype.</p></div>
      <div><h4>Platform</h4><Link to="/bids">Find Tenders</Link><Link to="/officer">Evaluation Portal</Link><Link to="/help">Help & FAQs</Link></div>
      <div><h4>Governance</h4><span>Human-in-the-loop</span><span>Evidence grounded</span><span>Prototype environment</span></div>
      <div><h4>Important</h4><span>Not an official GeM service</span><span>Not a legal decision engine</span><span>Sample data only</span></div>
    </div>
    <div className="footer-bottom"><div className="container"><span>© 2026 Nirnay Prototype</span><span>Designed for demonstration and development</span></div></div>
  </footer>;
}

export default App;