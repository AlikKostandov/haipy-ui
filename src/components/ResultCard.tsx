import type { Rubric } from "../types";
import { Gauge } from "./Gauge";
import { IconJson, IconWarn } from "./icons";

export type ResultMode = "report" | "issues" | "feedback";

interface ResultCardProps {
  filename: string;
  score: number;
  rubric: Rubric;
  issues: string[];
  feedback: string[];
  mode: ResultMode;
}

export function ResultCard({
  filename,
  score,
  rubric,
  issues,
  feedback,
  mode,
}: ResultCardProps) {
  const keys: { key: keyof Rubric; label: string }[] = [
    { key: "correctness", label: "Correctness" },
    { key: "completeness", label: "Completeness" },
    { key: "analysis_quality", label: "Quality of Analysis" },
    { key: "structure", label: "Structure" },
  ];

  return (
    <section className="card">
      <header className="card-head">
        <span className="dot ok" />
        <h2>Отчёт по работе</h2>
        <div className="spacer" />
        <span className="badge">{filename}</span>
      </header>

      {mode === "report" && (
        <div className="report-top">
          <div className="report-score">
            <Gauge value={score} />
            <div className="muted sm-center">Итоговый балл</div>
          </div>

          <div className="metrics-grid">
            {keys.map(({ key, label }) => (
              <div className="metric" key={String(key)}>
                <div className="metric-label">{label}</div>
                <div className="metric-value">{rubric[key] ?? 0}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === "issues" && (
        <div className="subtab-panel">
          <div className="subhead">
            <span className="icon warn">
              <IconWarn />
            </span>
            Обнаруженные проблемы (demo)
          </div>
          <ul className="list">
            {issues.length ? (
              issues.map((x, i) => <li key={i}>{x}</li>)
            ) : (
              <li className="muted">Проблем нет</li>
            )}
          </ul>
        </div>
      )}

      {mode === "feedback" && (
        <div className="subtab-panel">
          <div className="subhead">
            <span className="icon ac">
              <IconJson />
            </span>
            Рекомендации (demo)
          </div>
          <ul className="list">
            {feedback.length ? (
              feedback.map((x, i) => <li key={i}>{x}</li>)
            ) : (
              <li className="muted">Рекомендаций нет</li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
}
