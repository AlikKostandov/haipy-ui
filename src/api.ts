export type BackendResponse = {
  id: string;
  filename: string;
  score_total: number;
  rubric: Record<string, number>;
  issues: string[];
  feedback: string[];
};

const API_BASE = import.meta.env.VITE_API_BASE;
const base = API_BASE ? API_BASE.replace(/\/+$/, "") : "";

export async function evaluateNotebook(file: File): Promise<BackendResponse> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${base}/api/v1/evaluate-notebook`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Backend error ${res.status}: ${text}`);
  }

  return res.json();
}
