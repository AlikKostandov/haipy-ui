import { useState } from "react";
import { UploadCard } from "../components/UploadCard.tsx";
import { Tabs } from "../components/Tabs.tsx";
import { ResultCard } from "../components/ResultCard.tsx";
import { JsonPreview } from "../components/JsonPreview.tsx";
import type { Rubric } from "../types.ts";
import { Header } from "../components/Header.tsx";
import { evaluateNotebook, type BackendResponse } from "../api.ts";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tab, setTab] = useState<MainTab>("report");
  const [result, setResult] = useState<BackendResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onPick = async (file: File) => {
    console.log("Sending file to backend:", file.name, file.size);

    setSelectedFile(file);
    setTab("report");
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await evaluateNotebook(file);
      setResult(data);
    } catch (e: any) {
      setError(e?.message ?? "Ошибка запроса");
    } finally {
      setLoading(false);
    }
  };

  const filename = selectedFile?.name ?? null;

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
          <UploadCard onPick={onPick} />
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
              {!selectedFile && <div className="empty">Загрузите ноутбук</div>}

              {selectedFile && loading && <div className="empty">Обработка... ⏳</div>}

              {selectedFile && error && (
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
