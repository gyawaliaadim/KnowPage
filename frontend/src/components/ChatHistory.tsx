"use client";

type Message = {
  role: "user" | "ai";
  text: string;
};

type Props = {
  messages: Message[];
};

export default function ChatHistory({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] px-4 py-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}