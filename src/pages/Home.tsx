import { useState, useEffect } from "react";
import { UploadCard } from "../components/UploadCard.tsx";
import { Tabs } from "../components/Tabs.tsx";
import { ResultCard } from "../components/ResultCard.tsx";
import { JsonPreview } from "../components/JsonPreview.tsx";
import type { Rubric } from "../types.ts";
import { Header } from "../components/Header.tsx";
import { checkBackendHealth, evaluateNotebook, type BackendResponse } from "../api.ts";

import "../styles/core.css";
import "../styles/header.css";
import "../styles/layout.css";
import "../styles/components.css";

type MainTab = "report" | "issues" | "feedback" | "json";
type Page = "home" | "about";

interface HomeProps {
  onNavigate?: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [apiKey, setApiKey] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tab, setTab] = useState<MainTab>("report");
  const [result, setResult] = useState<BackendResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [backendOk, setBackendOk] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setBackendOk(null);

      const ok = await checkBackendHealth();
      if (cancelled) return;

      setBackendOk(ok);

      if (!ok) {
        setError("Сервис временно недоступен. Попробуйте обновить страницу позже.");
      } else {
        setError((prev) =>
          prev?.toLowerCase().includes("Сервис недоступен") ? null : prev
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);



  const onPick = async (file: File) => {
    if (backendOk === false) {
      setError("Сервис недоступен. Попробуйте позже.");
      return;
    }
    setSelectedFile(file);
    setTab("report");
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await evaluateNotebook(file, apiKey);
      setResult(data);
    } catch (e: any) {
      setError(e?.message ?? "Ошибка запроса");
    } finally {
      setLoading(false);
    }
  };

  const rubric: Rubric = result?.rubric ?? {
    correctness: 0,
    completeness: 0,
    analysis_quality: 0,
    structure: 0,
  };

  const score = result?.score_total ?? 0;
  const issues = result?.issues ?? [];
  const feedback = result?.feedback ?? [];

  return (
    <div className="page">
      <Header active="home" onNavigate={onNavigate!} />

      <main className="container">
        <div className="left">
          <UploadCard onPick={onPick} apiKey={apiKey} onApiKeyChange={setApiKey} />
        </div>

        <div className="right">
          <div className="card tabs-card">
            <div
              className="tabs-wrap"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tabs
                items={[
                  { key: "report", label: "Отчёт" },
                  { key: "issues", label: "Проблемы" },
                  { key: "feedback", label: "Рекомендации" },
                  { key: "json", label: "JSON" },
                ]}
                value={tab}
                onChange={(k) => setTab(k as MainTab)}
              />

              <button
                className="btn btn-ghost"
                disabled={!selectedFile}
                onClick={() => {
                  setSelectedFile(null);
                  setResult(null);
                  setError(null);
                  setTab("report");
                }}
                style={{
                  opacity: selectedFile ? 1 : 0.4,
                  cursor: selectedFile ? "pointer" : "not-allowed",
                }}
              >
                Сброс
              </button>
            </div>

            <div className="pad">
              {!selectedFile && !error && <div className="empty">Загрузите ноутбук</div>}

              {selectedFile && !error && loading && <div className="empty">Обработка... ⏳</div>}

              {error && (
                <div className="empty" style={{ color: "var(--danger)" }}>
                  {error}
                </div>
              )}


              {selectedFile && result && tab === "report" && (
                <ResultCard
                  mode="report"
                  filename={selectedFile.name}
                  score={score}
                  rubric={rubric}
                  issues={issues}
                  feedback={feedback}
                />
              )}

              {selectedFile && result && tab === "issues" && (
                <ResultCard
                  mode="issues"
                  filename={selectedFile.name}
                  score={score}
                  rubric={rubric}
                  issues={issues}
                  feedback={feedback}
                />
              )}

              {selectedFile && result && tab === "feedback" && (
                <ResultCard
                  mode="feedback"
                  filename={selectedFile.name}
                  score={score}
                  rubric={rubric}
                  issues={issues}
                  feedback={feedback}
                />
              )}

              {selectedFile && result && tab === "json" && (
                <JsonPreview
                  filename={selectedFile.name}
                  score={score}
                  rubric={rubric}
                  issues={issues}
                  feedback={feedback}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">© {new Date().getFullYear()} HAIPy — MVP UI</footer>
    </div>
  );
}
