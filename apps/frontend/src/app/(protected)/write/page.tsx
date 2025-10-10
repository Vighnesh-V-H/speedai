"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WritePage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/api/ws");

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN &&
      message.trim()
    ) {
      wsRef.current.send(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <div className='max-w-4xl mx-auto space-y-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Write</h1>
          <div className='flex items-center gap-2'>
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className='text-sm'>
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>

        <Card className='bg-zinc-900 border-zinc-800 p-6'>
          <div className='flex gap-3'>
            <Input
              type='text'
              placeholder='Type your message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className='flex-1 bg-black border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-zinc-600'
            />
            <Button
              onClick={sendMessage}
              disabled={!isConnected || !message.trim()}
              className='bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500'>
              Send
            </Button>
          </div>
        </Card>

        <Card className='bg-zinc-900 border-zinc-800 p-6'>
          <h2 className='text-xl font-semibold mb-4'>Messages</h2>
          <div className='space-y-3 max-h-96 overflow-y-auto'>
            {messages.length === 0 ? (
              <p className='text-zinc-500'>No messages yet</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className='bg-black border border-zinc-800 rounded-lg p-3'>
                  <p className='text-sm break-words'>{msg}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
