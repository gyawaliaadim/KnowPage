"use client";

import { useState } from "react";
import ChatHistory from "./ChatHistory";
import UserQueryBox from "./UserQueryBox";
import path from "path";
import { useQuery } from "@tanstack/react-query";
import { fetchChatMessages } from "@/lib/api";



export default function RightPanel({ pdf_id }: { pdf_id: string }) {
      const { data: messages, isLoading } = useQuery({
    queryKey: ["chat", pdf_id],
    queryFn: () => fetchChatMessages(pdf_id),
    enabled: !!pdf_id, // only run when pdf_id exists
  });
  
  const handleSend = (query: string) => {
    // Add user message
    

    // Placeholder for AI response (you’ll replace this later)
    // DO NOT implement logic yet as per your instruction
  };

  return (
    <div className={`h-screen overflow-y-auto flex flex-col border-l `}>
      {/* Chat messages */}
      <ChatHistory messages={messages} />

      {/* Input box */}
      <UserQueryBox onSend={handleSend} />
    </div>
  );
}