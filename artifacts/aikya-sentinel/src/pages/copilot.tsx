import React, { useState, useRef, useEffect } from "react";
import { useCopilotChat } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Link as LinkIcon, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  suggestedActions?: string[];
};

export default function Copilot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "I'm Sentinel Copilot. I can help you analyze entities, summarize investigations, or query risk data. What do you need help with?"
    }
  ]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const chat = useCopilotChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chat.isPending]);

  const handleSend = () => {
    if (!input.trim() || chat.isPending) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    chat.mutate(
      { data: { message: input, sessionId } },
      {
        onSuccess: (data) => {
          setSessionId(data.sessionId);
          const aiMsg: Message = {
            id: Date.now().toString(),
            role: "assistant",
            content: data.response,
            sources: data.sources,
            suggestedActions: data.suggestedActions
          };
          setMessages(prev => [...prev, aiMsg]);
        }
      }
    );
  };

  return (
    <div className="p-8 space-y-6 h-full flex flex-col max-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Investigator Copilot (M16)</h2>
          <p className="text-muted-foreground">AI-assisted analysis and query resolution</p>
        </div>
      </div>
      
      <Card className="flex-1 flex flex-col bg-card/50 backdrop-blur overflow-hidden">
        <CardHeader className="border-b border-border bg-muted/20">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" /> Sentinel AI
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-lg prose prose-sm dark:prose-invert max-w-none ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 border border-border'}`}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {msg.sources.map((src, i) => (
                          <div key={i} className="flex items-center gap-1 text-[10px] px-2 py-1 bg-background border border-border rounded text-muted-foreground">
                            <LinkIcon className="h-3 w-3" /> {src}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {msg.suggestedActions.map((action, i) => (
                          <Button key={i} variant="outline" size="sm" className="text-xs h-7" onClick={() => setInput(action)}>
                            {action}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {chat.isPending && (
                <div className="flex gap-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Analyzing...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t border-border bg-background/50">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <Input 
                placeholder="Ask Copilot..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-background"
                disabled={chat.isPending}
              />
              <Button type="submit" disabled={!input.trim() || chat.isPending}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
