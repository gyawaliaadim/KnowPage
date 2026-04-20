"use client";

import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
};

export default function UserQueryBox({ onSend }: Props) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="p-3 border-t flex gap-2">
      <input
        className="flex-1 border rounded-lg px-3 py-2 outline-none"
        placeholder="Ask something about the PDF..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-black text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
}