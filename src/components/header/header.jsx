import { memo, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo.svg";
import { GoArrowUpRight } from "react-icons/go";
import { FaTelegram, FaRegCircleUser } from "react-icons/fa6";
import { GoLinkExternal, GoChecklist } from "react-icons/go";
import { useDispatch } from "react-redux";

export const Header = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const toggleMenu = () => setIsOpened(!isOpened);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const menuRef = useRef(null);

  useEffect(() => {
    // Close modal by click outside the modal
    const heandlerMouse = (event) => {
      if (!menuRef.current?.contains(event.target)) setIsOpened(false);
    };

    // Close modal by click on the ESC button
    const heandlerKey = (e) => {
      if (e.keyCode === 27) return setIsOpened(false);
    };

    document.addEventListener("mousedown", heandlerMouse);
    document.addEventListener("keydown", heandlerKey);
    return () => {
      document.removeEventListener("mousedown", heandlerMouse);
      document.removeEventListener("keydown", heandlerKey);
    };
  });

  const handleToggleTariff = () => dispatch({ type: "OPEN_TARIFF" });

  return (
    <header className="header">
      <Link to="/">
        <img
          fetchpriorities="low"
          src={logo}
          alt="logo"
          width="135"
          height="100"
        />
      </Link>
      <nav className="navbar">
        <button aria-label="Репрайсер" disabled>
          <span>Репрайсер</span>
          <GoArrowUpRight />
        </button>
        <button aria-label="Биржа выкупов" disabled>
          <span>Биржа выкупов</span>
          <GoArrowUpRight />
        </button>
        <button aria-label="Тарифы" onClick={handleToggleTariff}>
          <span>Тарифы</span>
          <GoArrowUpRight />
        </button>
        <a
          href="https://support.mprating.ru/article/14473"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Безопасность</span>
          <GoArrowUpRight />
        </a>
        <a
          href="https://support.mprating.ru/category/2963"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Инструкция по работе</span>
          <GoArrowUpRight />
        </a>

        <a
          className="navbar__telegram"
          href="https://t.me/+QMera8Q0mYkzMWRi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <FaTelegram />
        </a>
        <div className="navbar__profile" ref={menuRef}>
          <button aria-label="Профиль" onClick={toggleMenu}>
            <FaRegCircleUser />
          </button>

          <div className={"profile__dropdown " + (isOpened ? "active" : "")}>
            <button aria-label="Выйти" onClick={handleLogout}>
              <GoLinkExternal />
              <span>Выйти</span>
            </button>
            <button aria-label="Системный отчет">
              <GoChecklist />
              <span>Системный отчет</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
});
