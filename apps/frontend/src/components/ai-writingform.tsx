"use client";

import * as React from "react";
import useSWR from "swr";
import { cn } from "@/lib/utils";

type SuggestResponse = { suggestion: string };

function useDebounced<T>(value: T, delay = 600) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const fetcher = async ([_key, context]: [
  string,
  string,
]): Promise<SuggestResponse> => {
  const res = await fetch("/api/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ context }),
  });
  if (!res.ok) throw new Error("Failed to fetch suggestion");
  return res.json();
};

function getLastLinesUpToCaret(text: string, caret: number, lines = 2) {
  const prefix = text.slice(0, caret);
  const rows = prefix.split("\n");
  const slice = rows.slice(Math.max(0, rows.length - lines));
  return slice.join("\n").trimEnd();
}

export default function AIWritingForm() {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const ghostRef = React.useRef<HTMLPreElement | null>(null);
  const wsRef = React.useRef<WebSocket | null>(null);

  const [value, setValue] = React.useState("");
  const [caret, setCaret] = React.useState(0);
  const [suggestion, setSuggestion] = React.useState("");
  const [isConnected, setIsConnected] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const context = React.useMemo(
    () => getLastLinesUpToCaret(value, caret, 2),
    [value, caret]
  );
  const debouncedContext = useDebounced(context, 350);

  React.useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/api/ws");

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      setSuggestion(event.data);
      setIsProcessing(false);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = () => {
      setIsConnected(false);
      setIsProcessing(false);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  React.useEffect(() => {
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN &&
      debouncedContext &&
      debouncedContext.trim().length > 0
    ) {
      setIsProcessing(true);
      wsRef.current.send(debouncedContext);
    } else if (!debouncedContext || debouncedContext.trim().length === 0) {
      setSuggestion(" ");
      setIsProcessing(false);
    }
  }, [debouncedContext]);

  const syncScroll = React.useCallback(() => {
    if (!textareaRef.current || !ghostRef.current) return;
    ghostRef.current.scrollTop = textareaRef.current.scrollTop;
    ghostRef.current.scrollLeft = textareaRef.current.scrollLeft;
  }, []);

  const setCaretPosition = React.useCallback((pos: number) => {
    const el = textareaRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.selectionStart = pos;
      el.selectionEnd = pos;
    });
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      const before = value.slice(0, caret);
      const after = value.slice(caret);
      const next = before + suggestion + after;
      setValue(next);
      const nextCaret = before.length + suggestion.length;
      setCaret(nextCaret);
      setCaretPosition(nextCaret);
      return;
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    setValue(el.value);
    setCaret(el.selectionStart ?? el.value.length);
  };

  const onSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    setCaret(el.selectionStart ?? 0);
  };

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    setCaret(el.selectionStart ?? 0);
  };

  const prefix = React.useMemo(() => value.slice(0, caret), [value, caret]);

  return (
    <div className='w-full max-w-3xl mx-auto px-4 py-8'>
      <div className='mb-3 flex items-center justify-between'>
        <h1 className='text-pretty text-xl md:text-2xl font-semibold'>
          AI Writing Assistant
        </h1>
        <div className='flex items-center gap-2'>
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              isConnected ? "bg-green-500" : "bg-red-500"
            )}
          />
          <span
            className={cn(
              "text-xs md:text-sm rounded px-2 py-1 border",
              isProcessing ? "opacity-100" : "opacity-60"
            )}
            aria-live='polite'>
            {!isConnected
              ? "Disconnected"
              : isProcessing
                ? "Thinking..."
                : "Ready"}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "relative",

          "rounded-lg border bg-card",

          "focus-within:ring-2 ring-[var(--color-brand)] transition-shadow"
        )}>
        <pre
          ref={ghostRef}
          aria-hidden='true'
          className={cn(
            "pointer-events-none absolute inset-0",
            "m-0 whitespace-pre-wrap break-words",
            "text-[var(--color-brand)] opacity-50",

            "font-sans text-base leading-6",

            "p-4",

            "overflow-auto"
          )}>
          <span style={{ visibility: "hidden" }}>{prefix}</span>
          {suggestion}
        </pre>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onSelect={onSelect}
          onInput={onInput}
          onScroll={syncScroll}
          placeholder='Start writing here... Press Tab to accept suggestions.'
          className={cn(
            "block w-full min-h-[40vh] md:min-h-[50vh] resize-y",
            "bg-transparent text-foreground placeholder:text-muted-foreground",
            "font-sans text-base leading-6",
            "p-4 rounded-lg",
            "outline-none"
          )}
          aria-label='Writing area with AI suggestions'
        />
      </div>
    </div>
  );
}
