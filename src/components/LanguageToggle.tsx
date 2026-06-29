import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-md border border-border bg-muted/40 p-0.5 text-xs">
      <button
        onClick={() => setLanguage("en")}
        className={`rounded px-2 py-0.5 font-medium transition-colors ${
          language === "en"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("pt")}
        className={`rounded px-2 py-0.5 font-medium transition-colors ${
          language === "pt"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        PT
      </button>
    </div>
  );
}
