import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOnboarding, type ServiceItem } from "@/contexts/OnboardingContext";
import SetupShell, { type SetupStepKey } from "@/components/template-setup/SetupShell";
import Step1Identity from "@/components/template-setup/Step1Identity";
import Step2Modules from "@/components/template-setup/Step2Modules";
import Step3Structure from "@/components/template-setup/Step3Structure";
import Step4Initializing from "@/components/template-setup/Step4Initializing";
import type { RenewalPolicyState } from "@/components/template-setup/Step4RenewalPolicy";
import { allTemplates } from "@/data/serviceTemplates";

const VISIBLE_STEPS: SetupStepKey[] = ["identity", "structure", "modules", "initialize"];

const TemplateSetup: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { state, addService } = useOnboarding();

  const template = useMemo(
    () => allTemplates.find((t) => t.id === templateId),
    [templateId],
  );

  useEffect(() => {
    if (!template || template.comingSoon) {
      navigate("/services", { replace: true });
    }
  }, [template, navigate]);

  const [step, setStep] = useState<SetupStepKey>("identity");
  const [name, setName] = useState(template?.name ?? "");
  const [renewalEnabled, setRenewalEnabled] = useState(true);
  const [hasCategories, setHasCategories] = useState<boolean | null>(null);
  const [hasSubcategories, setHasSubcategories] = useState<boolean | null>(null);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [subcategoriesList, setSubcategoriesList] = useState<{ name: string; parent: string }[]>(
    [],
  );
  const [renewalPolicy, setRenewalPolicy] = useState<RenewalPolicyState>({
    mode: "global",
    globalMonths: 12,
    perCategory: {},
    perSubcategory: {},
  });

  if (!template) return null;

  const trimmed = name.trim();
  const duplicate = state.services.some(
    (s) => s.name.trim().toLowerCase() === trimmed.toLowerCase(),
  );

  const handleBack = () => {
    if (step === "identity") navigate("/services");
    else if (step === "structure") setStep("identity");
    else if (step === "modules") setStep("structure");
    // initialize has no back
  };

  const finalize = () => {
    const customModules = ["Issuance", ...(renewalEnabled ? ["Renewal"] : [])];
    const newService: ServiceItem = {
      id: `${template.id}-${Date.now().toString(36)}`,
      name: trimmed,
      templateId: template.id,
      status: "draft",
      customModules,
      isPublished: false,
      isLive: false,
      deployment: { availabilityScope: "entire_state", selectedItems: [] },
      teamMembers: [],
      authMethod: "email",
      templateSetup: {
        hasCategories: hasCategories === true,
        hasSubcategories: hasSubcategories === true,
        categoriesList,
        subcategoriesList,
      },
      renewalPolicy: renewalEnabled ? renewalPolicy : undefined,
      workflowScope: "shared",
    };
    addService(newService);
    navigate(`/service/${newService.id}/configure`, { state: { mode: "overview" } });
  };

  return (
    <SetupShell
      current={step}
      onBack={step === "initialize" ? undefined : handleBack}
      backLabel={step === "identity" ? "Back to templates" : "Back"}
      visibleSteps={VISIBLE_STEPS}
    >
      {step === "identity" && (
        <Step1Identity
          templateName={template.name}
          value={name}
          onChange={setName}
          duplicate={duplicate}
          onContinue={() => setStep("structure")}
        />
      )}
      {step === "structure" && (
        <Step3Structure
          hasCategories={hasCategories}
          setHasCategories={setHasCategories}
          hasSubcategories={hasSubcategories}
          setHasSubcategories={setHasSubcategories}
          categoriesList={categoriesList}
          setCategoriesList={setCategoriesList}
          subcategoriesList={subcategoriesList}
          setSubcategoriesList={setSubcategoriesList}
          onContinue={() => setStep("modules")}
        />
      )}
      {step === "modules" && (
        <Step2Modules
          renewalEnabled={renewalEnabled}
          onRenewalChange={setRenewalEnabled}
          renewalPolicy={renewalPolicy}
          setRenewalPolicy={setRenewalPolicy}
          categories={categoriesList}
          subcategories={subcategoriesList}
          onContinue={() => setStep("initialize")}
        />
      )}
      {step === "initialize" && (
        <Step4Initializing
          serviceName={trimmed}
          renewalEnabled={renewalEnabled}
          hasCategories={hasCategories === true}
          onComplete={finalize}
        />
      )}
    </SetupShell>
  );
};

export default TemplateSetup;
