import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHelp } from "@/contexts/HelpContext";
import { cn } from "@/lib/utils";

const AssistantChat: React.FC = () => {
  const { chatThread, isTyping, sendMessage, closeAssistant } = useHelp();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatThread, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    const t = input.trim();
    if (!t) return;
    sendMessage(t);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Sub-header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border shrink-0">
        <button
          type="button"
          onClick={closeAssistant}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          aria-label="Back to help menu"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <Bot className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">Ask the assistant</span>
        </div>
      </div>

      {/* Thread */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {chatThread.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-2.5",
              msg.role === "user" ? "flex-row-reverse" : "flex-row",
            )}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="h-3.5 w-3.5 text-primary" />
              </div>
            )}
            <div
              className={cn(
                "max-w-[84%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted text-foreground rounded-tl-sm",
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border shrink-0">
        <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about templates, forms, workflows…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <Button
            type="button"
            size="icon"
            className="h-7 w-7 shrink-0 rounded-lg"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
          Responses are pre-loaded for this prototype
        </p>
      </div>
    </div>
  );
};

export default AssistantChat;
