import { copy } from "@/copy";
import { copy_pt } from "@/copy_pt";
import { useLanguage } from "@/contexts/LanguageContext";

export function useCopy() {
  const { language } = useLanguage();
  return language === "pt" ? copy_pt : copy;
}
