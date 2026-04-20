"use client";

import { useState } from "react";
import ChatHistory from "./ChatHistory";
import UserQueryBox from "./UserQueryBox";

type Message = {
  role: "user" | "ai";
  text: string;
};

const dummyMessages = [
  {
    role: "user",
    text: "What is data science?"
  },
  {
    role: "ai",
    text: "Data science is a field that uses statistics, programming, and domain knowledge to extract meaningful insights from data. It involves collecting, cleaning, analyzing, and interpreting data to help make better decisions."
  },
  {
    role: "user",
    text: "What tools are used in data science?"
  },
  {
    role: "ai",
    text: "Common tools in data science include Python, R, SQL, and libraries like Pandas, NumPy, and Scikit-learn. Visualization tools like Matplotlib and Tableau are also widely used."
  },
  {
    role: "user",
    text: "Is data science different from machine learning?"
  },
  {
    role: "ai",
    text: "Yes. Data science is a broader field that includes data collection, cleaning, analysis, and visualization. Machine learning is a subset of data science focused specifically on building models that learn patterns from data."
  }
] as const;

export default function RightPanel() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (query: string) => {
    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: query }]);

    // Placeholder for AI response (you’ll replace this later)
    // DO NOT implement logic yet as per your instruction
  };

  return (
    <div className="h-screen overflow-y-auto flex flex-col border-l">
      {/* Chat messages */}
      <ChatHistory messages={dummyMessages} />

      {/* Input box */}
      <UserQueryBox onSend={handleSend} />
    </div>
  );
}