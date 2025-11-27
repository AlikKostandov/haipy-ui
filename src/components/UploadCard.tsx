import React, { useRef, useState } from "react";
import { IconUpload, IconJson } from "./icons";

interface UploadCardProps {
  onPick: (filename: string) => void;
}

export function UploadCard({ onPick }: UploadCardProps) {
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHover(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onPick(file.name);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onPick(file.name);
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
        className={`dropzone${hover ? " is-hover" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        onDrop={handleDrop}
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
            onClick={() => inputRef.current?.click()}
          >
            Выбрать файл
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => onPick("demo_notebook.ipynb")}
          >
            Демо
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".ipynb"
          className="hidden-input"
          onChange={handleFileSelect}
        />
      </div>

      <p className="hint">
        Пока без отправки на сервер — чистый дизайн. Прогресс/очередь добавим
        позже.
      </p>
    </section>
  );
}
