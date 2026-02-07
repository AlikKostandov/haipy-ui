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

export async function evaluateNotebook(file: File, groqKey: string): Promise<BackendResponse> {
  const key = (groqKey ?? "").trim();
  if (!key) {
    throw new Error("Укажите Groq API Key");
  }

  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${base}/api/v1/evaluate-notebook`, {
    method: "POST",
    body: fd,
    headers: {
      "X-Groq-Api-Key": key,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${text}`);
  }

  return res.json();
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${base}/health`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}