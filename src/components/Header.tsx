import miemLogo from "../assets/miem-logo-rectangle.svg";

type Page = "home" | "about";

interface Header {
  active: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ active, onNavigate }: Header) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-main brand-title">
          <strong>HAIPy</strong>
        </span>
        <span className="brand-x">×</span>
        <img src={miemLogo} alt="МИЭМ" className="miem-logo" />
      </div>

      <nav className="main-nav">
        <button
          type="button"
          className={`nav-link ${active === "home" ? "is-active" : ""}`}
          onClick={() => onNavigate("home")}
        >
          Проверка
        </button>

        <button
          type="button"
          className={`nav-link ${active === "about" ? "is-active" : ""}`}
          onClick={() => onNavigate("about")}
        >
          О нас
        </button>
      </nav>
    </header>
  );
}
