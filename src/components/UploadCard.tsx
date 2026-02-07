import React, { useRef, useState } from "react";
import { IconUpload, IconJson } from "./icons";

interface UploadCardProps {
  onPick: (file: File) => void;
  apiKey: string;
  onApiKeyChange: (value: string) => void;
}

export function UploadCard({ onPick, apiKey, onApiKeyChange }: UploadCardProps) {
  const [hover, setHover] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const keyOk = apiKey.trim().length > 0;

  const isIpynb = (file: File) => file.name.toLowerCase().endsWith(".ipynb");

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!keyOk) return;

    e.preventDefault();
    e.stopPropagation();
    setHover(false);

    const file = e.dataTransfer.files?.[0];
    if (file && isIpynb(file)) onPick(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!keyOk) return;

    const item = e.dataTransfer.items?.[0];
    const f = item?.kind === "file" ? item.getAsFile() : null;

    if (f && isIpynb(f)) {
      e.preventDefault();
      setHover(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isIpynb(file)) onPick(file);

    e.target.value = "";
  };

  return (
    <section className="card">
      <header className="card-head">
        <span className="icon ac">
          <IconUpload />
        </span>
        <h2>Загрузка работы</h2>
      </header>

      <div
        className={`dropzone${hover ? " is-hover" : ""}${keyOk ? "" : " is-disabled"}`}
        onDragOver={handleDragOver}
        onDragLeave={() => setHover(false)}
        onDrop={handleDrop}
        title={keyOk ? "" : "Сначала введите Groq API Key"}
        style={{
          opacity: keyOk ? 1 : 0.6,
          cursor: keyOk ? "default" : "not-allowed",
        }}
      >
        <div className="dz-icon">
          <IconJson />
        </div>
        <p className="muted">
          Перетащите сюда <code>.ipynb</code> или выберите файл
        </p>

        <div className="row">
          <button
            className="btn btn-primary"
            type="button"
            disabled={!keyOk}
            onClick={() => inputRef.current?.click()}
            style={{
              opacity: keyOk ? 1 : 0.5,
              cursor: keyOk ? "pointer" : "not-allowed",
            }}
          >
            Выбрать файл
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".ipynb"
          className="hidden-input"
          onChange={handleFileSelect}
          disabled={!keyOk}
        />
      </div>

      <div className="pad" style={{ paddingTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <strong>Groq API Key</strong>
        </div>

        <div className="row" style={{ marginTop: 10, gap: 8 }}>
          <input
            className="input"
            type={showKey ? "text" : "password"}
            placeholder="gsk_..."
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            style={{ flex: 1 }}
          />
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => setShowKey((v) => !v)}
            style={{ whiteSpace: "nowrap" }}
          >
            {showKey ? "Скрыть" : "Показать"}
          </button>
        </div>

        {!keyOk && (
          <div className="muted" style={{ marginTop: 8, fontSize: 12 }}>
            Введите ключ, чтобы разблокировать загрузку файла
          </div>
        )}
      </div>
    </section>
  );
}
