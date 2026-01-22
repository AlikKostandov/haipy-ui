import React, { useRef, useState } from "react";
import { IconUpload, IconJson } from "./icons";

interface UploadCardProps {
  onPick: (file: File) => void;
}

export function UploadCard({ onPick }: UploadCardProps) {
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isIpynb = (file: File) =>
    file.name.toLowerCase().endsWith(".ipynb");

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHover(false);

    const file = e.dataTransfer.files?.[0];
    if (file && isIpynb(file)) {
      onPick(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.items?.[0];
    if (file?.kind === "file" && isIpynb(file.getAsFile()!)) {
      e.preventDefault();
      setHover(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isIpynb(file)) {
      onPick(file);
    }
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
        onDragOver={handleDragOver}
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
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".ipynb"
          className="hidden-input"
          onChange={handleFileSelect}
        />
      </div>
    </section>
  );
}
