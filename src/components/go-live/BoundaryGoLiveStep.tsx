import React from "react";
import { BoundarySetupWizard } from "@/components/boundary/BoundarySetupWizard";

const BoundaryGoLiveStep: React.FC<{ onComplete: () => void; onBack: () => void }> = ({ onComplete, onBack }) => {
  return (
    <BoundarySetupWizard
      mode="go-live"
      onBack={onBack}
      onComplete={onComplete}
    />
  );
};

export default BoundaryGoLiveStep;
