export async function fetchPDFsFromAPI() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/pdfs`,
    { cache: "no-store" } // always fresh
  );

  if (!res.ok) {
    throw new Error("Failed to fetch PDFs");
  }

  return res.json();
}

export async function uploadPDFsFROMAPI(formdata: FormData) {


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/pdfs`, {
    method: "POST",
    body: formdata,
  })
  return res.json();
}

export const deletePDFFromAPI = async (pdf_id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/pdfs/${pdf_id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.detail || "Failed to delete PDF");
  }

  return await res.json();
};