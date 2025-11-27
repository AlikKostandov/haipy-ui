import { useMemo } from "react";
import "../styles/json_style.css";
import type { Rubric } from "../types";

interface Props {
  filename: string | null;
  score: number;
  rubric: Rubric;
  issues: string[];
  feedback: string[];
}

export function JsonPreview({ filename, score, rubric, issues, feedback }: Props) {
  const payload = useMemo(
    () => ({
      id: "run_demo",
      filename,
      score_total: score,
      rubric,
      issues,
      feedback,
    }),
    [filename, score, rubric, issues, feedback]
  );

  const formatted = useMemo(() => {
    const json = JSON.stringify(payload, null, 2);

    // сначала экранируем HTML
    let html = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 1) все строки — как значения (оранжевые)
    html = html.replace(/"([^"]*)"/g, '<span class="json-val">"$1"</span>');

    // 2) те строки, которые являются ключами ("key":), перекрашиваем в основной цвет
    html = html.replace(
      /<span class="json-val">"([^"]*)"<\/span>(\s*:)/g,
      '<span class="json-key">"$1"</span>$2'
    );

    // 3) числа, true/false/null — тоже как значения
    html = html.replace(
      /(:\s*)(-?\d+(?:\.\d+)?|true|false|null)/g,
      '$1<span class="json-val">$2</span>'
    );

    // 4) пунктуация — отдельный класс
    html = html.replace(/([{}\[\],:])/g, '<span class="json-punct">$1</span>');

    return html;
  }, [payload]);

  return (
    <section className="card">
      <header className="card-head">
        <h2>JSON</h2>
        <div className="spacer" />
        <span className="badge">{filename || "no file"}</span>
      </header>

      <pre
        className="json-block"
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    </section>
  );
}