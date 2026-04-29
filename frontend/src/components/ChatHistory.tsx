"use client";
import { useNavigation } from "@/store/NavigationContext";
type Message = {
  role: "user" | "ai";
  content: string;
};

type Props = {
  messages: Message[];
};

export default function ChatHistory({ messages }: Props) {
   const { isResponding, navigate } = useNavigation();
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
            {msg.content}
          </div>
        </div>
      ))}
      {
        isResponding && (
          <div className={`flex justify-start`}>
          <div
            className={`max-w-[80%] px-4 py-2 rounded-lg bg-gray-200 text-black animate-pulse`}
          >
            AI is typing...
          </div>
        </div>
        )
      }
    </div>
  );
}