"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, FileText, X } from "lucide-react";
import { uploadPDFsFROMAPI, fetchPDFsFromAPI } from "@/lib/api";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "@/store/NavigationContext";
export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const { setIsUploading, navigate } = useNavigation();
  const { data: pdfs } = useQuery({
    queryKey: ["pdfs"],
    queryFn: fetchPDFsFromAPI,
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const f = e.target.files?.[0] ?? null;
    setFile(f);
  };
  const removeFile = () => {
    setFile(null);
  };

  const uploadFile = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  setIsUploading(true);

  try {
    const res = await uploadPDFsFROMAPI(formData);

    // optional: ensure cache sync
    await queryClient.invalidateQueries({ queryKey: ["pdfs"] });

    navigate(`/dashboard/${res.pdf_id}`);
    setFile(null);
  } finally {
    setIsUploading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-6">
      <Card className="w-full max-w-lg shadow-xl border-dashed border-2">
        <CardHeader>
          <CardTitle className="text-center text-xl flex items-center justify-center gap-2">
            <UploadCloud className="w-5 h-5" />
            Upload PDF
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Upload Box */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer hover:bg-muted transition">
            <UploadCloud className="w-10 h-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">
              Click or drag & drop your PDF
            </p>
            <Input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* File Preview */}
          {file && (
            <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="text-sm truncate max-w-50">
                  {file.name}
                </span>
              </div>

              <button 
              className="cursor-pointer rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-900 transition"
              onClick={removeFile}>
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}

          {/* Upload Button */}
          <Button
            className="w-full cursor-pointer"
            onClick={uploadFile}
            disabled={!file}
          >
            Upload PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}