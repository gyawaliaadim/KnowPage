"use client";
import { useNavigation } from "@/store/NavigationContext";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FileText, ChevronDown } from "lucide-react";
import { useState } from "react";

type Context = {
  chunk_id: string | number;
  page: number;
  score?: number;
};

type Message = {
  role: "user" | "ai" | "assistant";
  content: string;
  contexts: Context[] | null;
};

type Props = {
  messages: Message[];
};

function ContextBadges({ contexts }: { contexts: Context[] }) {
  const { setTargetPage } = useNavigation();
  const [open, setOpen] = useState(false);
  const handleClick = (page: number) => {
    console.log(page)
    setTargetPage(page);
  };
  if (!contexts || contexts.length === 0) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mt-2">
      <CollapsibleTrigger className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <FileText className="w-3 h-3" />
        <span>{contexts.length} source{contexts.length > 1 ? "s" : ""}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1.5 flex flex-col gap-1">
        {contexts.map((ctx, i) => (
          <div
            key={ctx.chunk_id}
            onClick={()=>handleClick(ctx.page)}
            className="flex cursor-pointer hover:bg-gray-900 items-center gap-2 text-xs bg-background border border-border rounded-md px-2.5 py-1.5 w-fit"
          >
            <span className="text-muted-foreground font-medium">
              Context {i + 1}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-foreground">Page {ctx.page}</span>
            {ctx.score !== undefined && (
              <>
                <span className="text-muted-foreground">·</span>
                <Badge
                  variant="secondary"
                  className="text-[10px] px-1.5 py-0 h-4 font-mono"
                >
                  score {ctx.score.toFixed(2)}
                </Badge>
              </>
            )}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function ChatHistory({ messages }: Props) {
  const { isResponding} = useNavigation();

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, i) => {
        const isUser = msg.role === "user";
        return (
          <div
            key={i}
            className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                isUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.content}
            </div>
            {!isUser && msg.contexts && msg.contexts.length > 0 && (
              <div className="max-w-[80%] mt-1 px-1">
                <ContextBadges contexts={msg.contexts} />
              </div>
            )}
          </div>
        );
      })}

      {isResponding && (
        <div className="flex justify-start">
          <div className="max-w-[80%] px-4 py-2 rounded-lg bg-gray-200 text-black animate-pulse">
            AI is typing...
          </div>
        </div>
      )}
    </div>
  );
}