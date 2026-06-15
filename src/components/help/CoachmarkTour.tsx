import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useHelp } from "@/contexts/HelpContext";
import { cn } from "@/lib/utils";

const PADDING = 8;

type Rect = { top: number; left: number; width: number; height: number };

const EMPTY_RECT: Rect = { top: 0, left: 0, width: 0, height: 0 };

function getTargetRect(targetId: string): Rect {
  const el = document.querySelector(`[data-tour-id="${targetId}"]`);
  if (!el) return EMPTY_RECT;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

interface PopoverPos {
  top: number;
  left: number;
  arrowSide: "top" | "bottom" | "left" | "right";
}

function computePopoverPos(
  targetRect: Rect,
  popoverW: number,
  popoverH: number,
  placement: "top" | "bottom" | "left" | "right",
): PopoverPos {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const gap = 12;

  const positions: Record<string, PopoverPos> = {
    bottom: {
      top: targetRect.top + targetRect.height + gap,
      left: Math.min(
        Math.max(targetRect.left + targetRect.width / 2 - popoverW / 2, PADDING),
        vw - popoverW - PADDING,
      ),
      arrowSide: "top",
    },
    top: {
      top: targetRect.top - popoverH - gap,
      left: Math.min(
        Math.max(targetRect.left + targetRect.width / 2 - popoverW / 2, PADDING),
        vw - popoverW - PADDING,
      ),
      arrowSide: "bottom",
    },
    right: {
      top: Math.min(
        Math.max(targetRect.top + targetRect.height / 2 - popoverH / 2, PADDING),
        vh - popoverH - PADDING,
      ),
      left: targetRect.left + targetRect.width + gap,
      arrowSide: "left",
    },
    left: {
      top: Math.min(
        Math.max(targetRect.top + targetRect.height / 2 - popoverH / 2, PADDING),
        vh - popoverH - PADDING,
      ),
      left: targetRect.left - popoverW - gap,
      arrowSide: "right",
    },
  };

  const desired = positions[placement];
  // Fallback: if desired overflows, try opposite
  if (placement === "bottom" && desired.top + popoverH > vh - PADDING) return positions.top;
  if (placement === "top" && desired.top < PADDING) return positions.bottom;
  if (placement === "right" && desired.left + popoverW > vw - PADDING) return positions.left;
  if (placement === "left" && desired.left < PADDING) return positions.right;
  return desired;
}

const CoachmarkTour: React.FC = () => {
  const {
    activeTourPageId,
    tourStepIndex,
    currentPageHelp,
    advanceTour,
    retreatTour,
    endTour,
  } = useHelp();

  const popoverRef = useRef<HTMLDivElement>(null);
  const [targetRect, setTargetRect] = useState<Rect>(EMPTY_RECT);
  const [popoverPos, setPopoverPos] = useState<PopoverPos>({ top: 0, left: 0, arrowSide: "top" });

  const tourSteps =
    activeTourPageId && currentPageHelp?.pageId === activeTourPageId
      ? (currentPageHelp.tourSteps ?? [])
      : [];

  const currentStep = tourSteps[tourStepIndex] ?? null;
  const isActive = !!currentStep;

  const reposition = useCallback(() => {
    if (!currentStep) return;
    const rect = getTargetRect(currentStep.targetId);
    setTargetRect(rect);
    const popover = popoverRef.current;
    if (!popover) return;
    const { offsetWidth: w, offsetHeight: h } = popover;
    setPopoverPos(computePopoverPos(rect, w || 280, h || 120, currentStep.placement));
  }, [currentStep]);

  // Reposition on step change and window resize
  useLayoutEffect(() => {
    if (!isActive) return;
    reposition();
  }, [isActive, reposition]);

  useEffect(() => {
    if (!isActive) return;
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [isActive, reposition]);

  // Keyboard: Esc to exit, Right/Space to advance, Left to retreat
  useEffect(() => {
    if (!isActive) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") endTour();
      else if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); advanceTour(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); retreatTour(); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isActive, advanceTour, retreatTour, endTour]);

  // Scroll target into view on step change
  useEffect(() => {
    if (!currentStep) return;
    const el = document.querySelector<HTMLElement>(`[data-tour-id="${currentStep.targetId}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentStep]);

  if (!isActive) return null;

  const spotlightPad = 6;
  const spotTop = targetRect.top - spotlightPad;
  const spotLeft = targetRect.left - spotlightPad;
  const spotW = targetRect.width + spotlightPad * 2;
  const spotH = targetRect.height + spotlightPad * 2;

  const arrowClasses: Record<string, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 border-b-[6px] border-b-popover border-x-[6px] border-x-transparent border-t-0 mb-0",
    bottom: "top-full left-1/2 -translate-x-1/2 border-t-[6px] border-t-popover border-x-[6px] border-x-transparent border-b-0",
    left: "right-full top-1/2 -translate-y-1/2 border-r-[6px] border-r-popover border-y-[6px] border-y-transparent border-l-0",
    right: "left-full top-1/2 -translate-y-1/2 border-l-[6px] border-l-popover border-y-[6px] border-y-transparent border-r-0",
  };

  return createPortal(
    <>
      {/* Spotlight overlay using box-shadow */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[60] pointer-events-none"
        style={{
          boxShadow: `0 0 0 9999px rgba(0,0,0,0.55)`,
          clipPath: `polygon(
            0% 0%,
            0% 100%,
            ${spotLeft}px 100%,
            ${spotLeft}px ${spotTop}px,
            ${spotLeft + spotW}px ${spotTop}px,
            ${spotLeft + spotW}px ${spotTop + spotH}px,
            ${spotLeft}px ${spotTop + spotH}px,
            ${spotLeft}px 100%,
            100% 100%,
            100% 0%
          )`,
          transition: "clip-path 250ms ease",
        }}
      />

      {/* Spotlight ring */}
      <div
        aria-hidden="true"
        className="fixed z-[61] pointer-events-none rounded-lg border-2 border-primary/80 transition-all duration-250"
        style={{
          top: spotTop,
          left: spotLeft,
          width: spotW,
          height: spotH,
        }}
      />

      {/* Popover */}
      <div
        ref={popoverRef}
        role="dialog"
        aria-modal="false"
        aria-label={`Tour step ${tourStepIndex + 1} of ${tourSteps.length}`}
        className="fixed z-[62] w-[280px] rounded-xl bg-popover border border-border shadow-xl p-4"
        style={{ top: popoverPos.top, left: popoverPos.left }}
      >
        {/* Arrow */}
        <div
          aria-hidden="true"
          className={cn("absolute w-0 h-0", arrowClasses[popoverPos.arrowSide])}
        />

        {/* Close */}
        <button
          type="button"
          onClick={endTour}
          aria-label="End tour"
          className="absolute top-3 right-3 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Step counter */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-primary mb-1">
          {tourStepIndex + 1} / {tourSteps.length}
        </p>

        <h3 className="text-sm font-semibold text-foreground mb-1 pr-5">
          {currentStep.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {currentStep.content}
        </p>

        {/* Nav */}
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={retreatTour}
            disabled={tourStepIndex === 0}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1">
            {tourSteps.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "rounded-full transition-all",
                  i === tourStepIndex
                    ? "w-4 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-muted-foreground/30",
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={advanceTour}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {tourStepIndex === tourSteps.length - 1 ? "Done" : "Next"}
            {tourStepIndex < tourSteps.length - 1 && (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default CoachmarkTour;
