import React, { useState } from "react";
import "./login.css";
import { Input, Button, Checkbox } from "../../interface/index";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../context/services/auth.service";
import { enqueueSnackbar as EnSn } from "notistack";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let msg, value, storage;
    value = Object.fromEntries(new FormData(e.target));
    const { data, error } = await login(value);
    msg = error ? "Неверный логин или пароль" : "Добро пожаловать в систему";
    EnSn(msg, { variant: error ? "error" : "success" });
    if (error) return e.target.reset();
    storage = e.target.remember.checked ? localStorage : sessionStorage;
    localStorage.setItem("remember", e.target.remember.checked);
    storage.setItem("access_token", data.access_token);
    storage.setItem("refresh_token", data.refresh_token);
    storage.setItem("session_state", data.session_state);
    return navigate("/");
  };

  return (
    <div className="login-page">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__title">
          <p>Вход в систему</p>
          <i></i>
        </div>
        <p className="login__error activ">Неверный логин или пароль</p>
        <Input aria-label="Ввод" type="text" name="username" ph="Логин" focus />
        <div className="login__password">
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            ph="Пароль"
          />
          <button
            aria-label="Показать/скрыть пароль"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <Button type="submit">Войти</Button>
        <div className="login__checkbox">
          <label>
            <Checkbox name="remember" />
            <span>Сохранить вход</span>
          </label>

          <a href="/">Забыли пароль?</a>
        </div>
        <p className="login__telegram">
          Если вы зарегистрировались через Telegram Bot, для восстановления
          пароля перейдите в{" "}
          <a
            href="https://t.me/MPrating_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram bot
          </a>
        </p>
      </form>

      <div className="login__signup">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          Зарегистрироваться
        </a>
        <p>
          *После регистрации вы получите доступ ко всем возможностям системы
        </p>
      </div>
    </div>
  );
};
