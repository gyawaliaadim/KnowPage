  "use client";

  import ChatHistory from "./ChatHistory";
  import UserQueryBox from "./UserQueryBox";
  import { useQuery, useQueryClient } from "@tanstack/react-query";
  import { fetchChatMessages } from "@/lib/api";
  import { sendQuestion } from "@/lib/api";
  import { useNavigation } from "@/store/NavigationContext";


  export default function RightPanel({ pdf_id }: { pdf_id: string }) {
      const queryClient = useQueryClient();  
        const { setIsUploading, navigate } = useNavigation();
    const { data: messages, isLoading } = useQuery({
      queryKey: ["chat", pdf_id],
      queryFn: () => fetchChatMessages(pdf_id),
      enabled: !!pdf_id, // only run when pdf_id exists
    });
    
  const handleSend = async (question: string) => {
  try {
    setIsUploading(true);

    const data = await sendQuestion(pdf_id, question);

    await queryClient.invalidateQueries({ queryKey: ["chat", pdf_id] });

    console.log("AI response:", data);
  } catch (err) {
    console.error(err);
  } finally {
    setIsUploading(false);
  }
};
    return (
      <div className={`h-screen overflow-y-auto flex flex-col border-l `}>
        {/* Chat messages */}
        
          {messages?.length ? (
  <ChatHistory messages={messages} />
) : (
  <div className="flex-1 flex items-center justify-center">
    Start a conversation by asking a question about the PDF!
  </div>
)}
        

        {/* Input box */}
        <UserQueryBox onSend={handleSend} />
      </div>
    );
  }