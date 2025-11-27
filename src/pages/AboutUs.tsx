import { Header } from "../components/Header";
import "../styles/core.css";
import "../styles/header.css";
import "../styles/layout.css";
import "../styles/components.css";
import "../styles/about_us.css";

type Page = "home" | "about";

interface AboutProps {
  onNavigate?: (page: Page) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const year = new Date().getFullYear();

  return (
    <div className="page">

    <Header active="about" onNavigate={onNavigate!} />

      <main className="container about-container">
        <section className="card about-main">
          <header className="card-head">
            <h2>О проекте</h2>
          </header>
          <div className="pad about-text">
            <h3>Актуальность</h3>
            <p>
              Рост числа студентов и практических заданий по ML и Data Science
              приводит к высокой нагрузке на преподавателей и ассистентов.
              <strong> HAIPy</strong> помогает автоматизировать проверку
              ноутбуков и ускорять выдачу обратной связи, сохраняя при этом
              прозрачность и объективность оценки.
            </p>

            <h3>Новизна</h3>
            <p>
              HAIPy объединяет автоматическую проверку Jupyter-ноутбуков
              с интеллектуальным анализом решений по задачам машинного
              обучения. Сервис не только выставляет балл, но и формирует
              комментарии по каждому пункту задания и может выявлять
              сходство работ между студентами.
            </p>

            <h3>Цель</h3>
            <p>
              Создать сервис, способный проверять файлы домашних заданий
              формата <code>.ipynb</code>, выставлять оценку по нескольким
              критериям и давать персонализированную обратную связь студентам.
            </p>

            <h3>Планы применения</h3>
            <p>
              На первом этапе система будет апробирована на курсах
              дополнительного профессионального образования ВШЭ. В ходе пилота
              мы собираем отзывы преподавателей и студентов, а также статистику
              по точности и удобству сервиса.
            </p>
            <p>
              При успешных результатах планируется масштабирование HAIPy на
              другие образовательные программы и, потенциально, коммерческое
              использование.
            </p>
          </div>
        </section>

        {/* Команда */}
        <section className="card about-team">
          <header className="card-head">
            <h2>Команда</h2>
          </header>
          <div className="pad">
            <div className="team-grid">
              <div className="person-card">
                <div className="avatar-circle">
                    <img src="src\assets\avatars\alexander.png" alt="Андреев Александр"/>
                </div>
                <div className="person-meta">
                  <div className="person-name">Андреев Александр</div>
                  <div className="person-role">Python разработчик / MLOps</div>
                </div>
              </div>

              <div className="person-card">
                <div className="avatar-circle">
                    <img src="src\assets\avatars\radomir.png" alt="Ткачев Радомир"/>
                </div>
                <div className="person-meta">
                  <div className="person-name">Ткачев Радомир</div>
                  <div className="person-role">Инженер глубинного обучения</div>
                </div>
              </div>

              <div className="person-card">
                <div className="avatar-circle">
                    <img src="src\assets\avatars\david.png" alt="Кочарян Давид"/>
                </div>
                <div className="person-meta">
                  <div className="person-name">Кочарян Давид</div>
                  <div className="person-role">Руководитель проекта / MLOPs</div>
                </div>
              </div>

              <div className="person-card">
                <div className="avatar-circle">
                    <img src="src\assets\avatars\gayane.png" alt="Власенко Гаянэ"/>
                </div>
                <div className="person-meta">
                  <div className="person-name">Власенко Гаянэ</div>
                  <div className="person-role">Python разработчик / MLOps</div>
                </div>
              </div>

              <div className="person-card">
                <div className="avatar-circle">
                    <img src="src\assets\avatars\alik.png" alt="Костандов Александр"/>
                </div>
                <div className="person-meta">
                  <div className="person-name">Костандов Александр</div>
                  <div className="person-role">Full Stack Разработчик</div>
                </div>
              </div>
            </div>

            <p className="about-note">
              Проект реализуется в рамках МИЭМ НИУ ВШЭ, {year} год.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        © {year} HAIPy — MVP UI
      </footer>
    </div>
  );
}
