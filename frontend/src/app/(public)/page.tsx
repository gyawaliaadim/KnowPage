"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/store/NavigationContext";
import Image from "next/image";

const Home = () => {
  const { navigate } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[url('/svgs/background.svg')] bg-repeat bg-contain">
      
      {/* Hero Section */}
      <div className="w-[75%] min-h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-500 text-center leading-tight">
          Talk to Your PDFs, <br /> Not Your Search Bar
        </h1>
        <p className="text-center text-xl sm:text-2xl text-black dark:text-white max-w-3xl">
          Upload PDFs and turn static data into a conversation. Our RAG-powered AI extracts context-aware answers directly from your files in seconds.
        </p>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-2xl py-6 px-16 rounded-full shadow-lg transition-all"
          onClick={() => navigate("/signin")}
        >
          Chat with your PDF
        </Button>
      </div>

      {/* Process Section - How it Works */}
      <div className="w-[75%] min-h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-blue-500">
          From Raw Text to Smart Answers
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-10">
            <div className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold mb-2">1. Upload</h3>
                <p>Drop your PDFs. We extract and chunk the text instantly.</p>
            </div>
            <div className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold mb-2">2. Embed</h3>
                <p>Vectorize data into PostgreSQL for lightning-fast semantic search.</p>
            </div>
            <div className="p-6 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold mb-2">3. Chat</h3>
                <p>Ask anything. AI generates answers based strictly on your content.</p>
            </div>
        </div>
        <Image
        loading="eager"
          src="/image1.png" // Update this path to your new asset
          alt="Interface showing PDF upload and AI chat response"
          width={750}
          height={500}
          className="w-full max-w-[900px] object-contain rounded-xl shadow-2xl mt-8"
        />  
      </div>

      {/* Analogy / Final CTA Section */}
      <div className="w-[75%] min-h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center text-blue-500">
          Your Data, Your Context
        </h1>
        <p className="text-center text-xl sm:text-2xl text-black dark:text-white max-w-2xl italic">
          "It's like giving an AI a textbook and saying: 'Only answer from this book, not the internet.'"
        </p>
        <div className="flex px-4 dark:bg-gray-800 bg-gray-200 flex-wrap justify-center gap-4 text-sm font-mono text-blue-600 dark:text-blue-300">
            <span>Next.js</span> • <span>FastAPI</span> • <span>SQLite</span>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-2xl py-6 px-16 rounded-full shadow-lg"
          onClick={() => navigate("/signin")}
        >
          Start Analyzing
        </Button>
      </div>
    </div>
  );
};

export default Home;