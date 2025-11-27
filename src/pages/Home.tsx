import { useState } from "react";
import { UploadCard } from "../components/UploadCard.tsx";
import { Tabs } from "../components/Tabs.tsx";
import { ResultCard } from "../components/ResultCard.tsx";
import { JsonPreview } from "../components/JsonPreview.tsx";
import type { Rubric } from "../types.ts";
import { Header } from "../components/Header.tsx"

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
  const [file, setFile] = useState<string | null>(null);
  const [tab, setTab] = useState<MainTab>("report");

  const rubric: Rubric = {
    correctness: 48,
    completeness: 16,
    analysis_quality: 8,
    structure: 3,
  };
  const score = Object.values(rubric).reduce((a, b) => a + b, 0);
  const issues = [
    "failed_test: test_sum_negative",
    "lint: E302 expected 2 blank lines",
    "timeout: cell_12 > 10s",
  ];
  const feedback = [
    "Добавьте обработку пустого ввода в predict().",
    "Опишите в Markdown источник данных и методику.",
    "Сократите время fit: ограничьте признаки или используйте кэш.",
  ];

  return (
    <div className="page">

      <Header active="home" onNavigate={onNavigate!} />

      <main className="container">
        <div className="left">
          <UploadCard onPick={(name) => setFile(name)} />
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
                disabled={!file}
                onClick={() => {
                  setFile(null);
                  setTab("report");
                }}
                style={{
                  opacity: file ? 1 : 0.4,
                  cursor: file ? "pointer" : "not-allowed",
                }}
              >
                Сброс
              </button>
            </div>

            <div className="pad">
              {!file && <div className="empty">Загрузите ноутбук</div>}

              {file && tab === "report" && (
                <ResultCard
                  mode="report"
                  filename={file}
                  score={score}
                  rubric={rubric}
                  issues={issues}
                  feedback={feedback}
                />
              )}

              {file && tab === "issues" && (
                <ResultCard
                  mode="issues"
                  filename={file}
                  score={score}
                  rubric={rubric}
                  issues={issues}
                  feedback={feedback}
                />
              )}

              {file && tab === "feedback" && (
                <ResultCard
                  mode="feedback"
                  filename={file}
                  score={score}
                  rubric={rubric}
                  issues={issues}
                  feedback={feedback}
                />
              )}

              {file && tab === "json" && (
                <JsonPreview
                  filename={file}
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

      <footer className="footer">
        © {new Date().getFullYear()} HAIPy — MVP UI
      </footer>
    </div>
  );
}
