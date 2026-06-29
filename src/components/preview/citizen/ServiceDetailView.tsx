import React from "react";
import { usePreview } from "../PreviewContext";
import CitizenScreenShell from "./_shell/CitizenScreenShell";
import { FileText, Clock, CheckCircle2, AlertCircle, Banknote } from "lucide-react";

const ELIGIBILITY = [
  "Must be operating or intending to operate within the municipality's jurisdiction",
  "Applicant must be 18 years of age or older",
  "Business must comply with local zoning and land-use regulations",
  "All required documentation must be valid and up to date",
];

const ServiceDetailView: React.FC = () => {
  const { setScreen, serviceName, formSections, workflowStates, isAuthenticated, signIn } = usePreview();

  // Extract document upload fields from form config
  const docFields = formSections
    .flatMap(s => s.fields)
    .filter(f => f.type === "file");

  const docList = docFields.length > 0
    ? docFields.map(f => ({ label: f.label, hint: f.helpText || "PDF / JPG / PNG · max 5 MB" }))
    : [
        { label: "Identity Proof", hint: "Aadhaar / Passport / Driving License" },
        { label: "Address Proof",  hint: "Utility bill / Bank statement" },
        { label: "Business Proof", hint: "Registration certificate / GST certificate" },
      ];

  const stepCount = workflowStates.length;
  const estimatedDays = stepCount <= 3 ? "3–5 working days" : stepCount <= 5 ? "5–10 working days" : "7–15 working days";

  return (
    <CitizenScreenShell
      onBack={() => setScreen({ type: "catalogue" })}
      backLabel="All Services"
      footer={
        <button
          onClick={() => isAuthenticated ? setScreen({ type: "apply_intro" }) : signIn()}
          className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90 active:opacity-80"
          style={{ backgroundColor: "#F4A261" }}
        >
          {isAuthenticated ? "Apply Now" : "Sign In to Apply"}
        </button>
      }
    >
      {/* Service name + badge */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-3" style={{ border: "1px solid #E0E0E0" }}>
        <span
          className="inline-block text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full mb-2"
          style={{ color: "#1D3557", backgroundColor: "#EAF2FB" }}
        >
          Licensing Service
        </span>
        <h1 className="text-lg font-bold leading-tight mb-1" style={{ color: "#1D3557" }}>
          {serviceName}
        </h1>
        <p className="text-[12px] leading-relaxed" style={{ color: "#363636" }}>
          This service allows businesses and individuals to apply for, renew, and manage their{" "}
          {serviceName.toLowerCase()} within the municipal jurisdiction. Your application will be
          reviewed by the relevant department and a license will be issued upon approval.
        </p>
      </div>

      {/* Processing time */}
      <div className="flex items-center gap-3 bg-white rounded-xl p-3.5 mb-3 shadow-sm" style={{ border: "1px solid #E0E0E0" }}>
        <span className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EAF2FB" }}>
          <Clock className="h-4.5 w-4.5" style={{ color: "#1D3557" }} />
        </span>
        <div>
          <p className="text-[11px] font-semibold" style={{ color: "#1D3557" }}>Estimated processing time</p>
          <p className="text-[12px] font-bold" style={{ color: "#F4A261" }}>{estimatedDays}</p>
        </div>
      </div>

      {/* Required documents */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-3" style={{ border: "1px solid #E0E0E0" }}>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-4 w-4 shrink-0" style={{ color: "#1D3557" }} />
          <p className="text-[12px] font-semibold" style={{ color: "#1D3557" }}>Documents required</p>
        </div>
        <div className="space-y-2">
          {docList.map((doc, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span
                className="h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                style={{ backgroundColor: "#EAF2FB", color: "#1D3557" }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-[12px] font-medium" style={{ color: "#1D3557" }}>{doc.label}</p>
                <p className="text-[10px]" style={{ color: "#6B7280" }}>{doc.hint}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] mt-3 pt-3 border-t" style={{ color: "#6B7280", borderColor: "#F0F0F0" }}>
          You can upload new documents or reuse ones already saved in My Documents.
        </p>
      </div>

      {/* Fees */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-3" style={{ border: "1px solid #E0E0E0" }}>
        <div className="flex items-center gap-2 mb-3">
          <Banknote className="h-4 w-4 shrink-0" style={{ color: "#1D3557" }} />
          <p className="text-[12px] font-semibold" style={{ color: "#1D3557" }}>Fee structure</p>
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between">
            <span style={{ color: "#363636" }}>Base license fee</span>
            <span className="font-medium" style={{ color: "#1D3557" }}>Configured per service</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#363636" }}>Area-based fee</span>
            <span style={{ color: "#6B7280" }}>Varies by shop area (sq ft)</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#363636" }}>Hazard surcharge</span>
            <span style={{ color: "#6B7280" }}>Applies if hazardous activity</span>
          </div>
          <div className="flex justify-between border-t pt-1.5 mt-1" style={{ borderColor: "#F0F0F0" }}>
            <span style={{ color: "#363636" }}>Tax</span>
            <span style={{ color: "#6B7280" }}>10% on total</span>
          </div>
        </div>
        <div
          className="flex items-start gap-2 mt-3 p-2.5 rounded-lg text-[10px]"
          style={{ backgroundColor: "#FFF3E5", color: "#92400E" }}
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          <span>Final fee is confirmed at the payment stage based on your application details.</span>
        </div>
      </div>

      {/* Eligibility */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4" style={{ border: "1px solid #E0E0E0" }}>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#1D3557" }} />
          <p className="text-[12px] font-semibold" style={{ color: "#1D3557" }}>Eligibility criteria</p>
        </div>
        <div className="space-y-2">
          {ELIGIBILITY.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="h-1.5 w-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "#1D3557" }} />
              <p className="text-[11px] leading-snug" style={{ color: "#363636" }}>{item}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] mt-3 pt-3 border-t italic" style={{ color: "#6B7280", borderColor: "#F0F0F0" }}>
          By applying, you confirm you meet the above criteria.
        </p>
      </div>
    </CitizenScreenShell>
  );
};

export default ServiceDetailView;
