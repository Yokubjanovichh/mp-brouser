import React, { memo, useState, useRef } from "react";
import "./registration.css";
import { CgClose } from "react-icons/cg";
import { IoCheckmarkCircleOutline, IoArrowBackOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FiEye, FiEyeOff, FiSave } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Radio } from "../../interface";
import { PiPlusBold } from "react-icons/pi";
import { Mousedown } from "../../utility/mousedown";

export const Registration = memo(() => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const status = useSelector((state) => state.registration);
  const [step, setStep] = useState(true);
  const [eye, setEye] = useState({ vak: true, online: true, sms: true });
  const [addGroup, setAddGroup] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const eyeHandler = (e) => setEye({ ...eye, [e]: !eye[e] });
  const stepactive = document?.querySelector(".registration__step__box");
  const reg = document?.querySelector(".registration__box");

  // Toggle Step
  const toggleStep = (st) => {
    setStep(st);
    stepactive?.setAttribute("style", `--active-step: ${st ? 0 : 1}`);
    reg?.setAttribute("style", `--registration-box: ${st ? 0 : 1}`);
  };

  // Close modal
  const closeRegistration = () => {
    stepactive?.setAttribute("style", "--active-step: 0");
    reg?.setAttribute("style", "--registration-box: 0");
    if (addGroup) return setAddGroup(false);
    dispatch({ type: "CLOSE_REGISTRATION" });
  };

  Mousedown({ modalRef, onClose: closeRegistration });

  // Add class active to registration
  function activeGroup() {
    let activeReg = `registration ${status ? "active" : ""}`;
    let addGroups = `${activeReg} ${addGroup ? "group_active" : ""}`;
    return addGroups;
  }

  return (
    <div className={"modal " + (status ? "active" : "")}>
      <div
        ref={modalRef}
        className={"modal__content " + (!addGroup ? "active" : "")}
      >
        <div className={activeGroup()}>
          <button
            aria-label="Закрыть окно регистрации"
            className={"registration__close " + (!addGroup ? "active" : "")}
            onClick={closeRegistration}
          >
            <CgClose />
          </button>
          <div className="registration__header">
            <h3>Регистрация аккаунтов</h3>
            <span></span>
          </div>
          <div className="registration__step">
            <p>Выберите тип регистрации</p>
            <div className="registration__step__box">
              <button
                aria-label="Автоматическая"
                onClick={() => toggleStep(true)}
                className={step ? "active" : ""}
              >
                {step ? <IoCheckmarkCircleOutline /> : <IoCloseCircleOutline />}
                <span>Автоматическая</span>
              </button>
              <button
                aria-label="Ручная"
                onClick={() => toggleStep(false)}
                className={!step ? "active" : ""}
              >
                {step ? <IoCloseCircleOutline /> : <IoCheckmarkCircleOutline />}
                <span>Ручная</span>
              </button>
            </div>
          </div>
          <div className="registration__group">
            <p>Выберите группу, куда будет помещен аккаунт после регистрации</p>
            <button
              aria-label="Добавить группу"
              onClick={() => setAddGroup(!addGroup)}
            >
              {status ? status?.group || "Без группы" : "Без группы"}
            </button>
          </div>
          <code></code>
          <div className="registration__box">
            <div className="registration__amount__accounts">
              <p>Количество покупаемых аккаунтов</p>

              <div className="registration__amount__accounts__box">
                <label>
                  <span>М</span>
                  <input
                    aria-label="Количество аккаунтов"
                    type="number"
                    name="m"
                    defaultValue="0"
                  />
                </label>
                <div>
                  <button aria-label="Увеличить">
                    <BiSolidUpArrow />
                  </button>
                  <button aria-label="Уменьшить">
                    <BiSolidDownArrow />
                  </button>
                </div>
              </div>

              <div className="registration__amount__accounts__box">
                <label>
                  <span>Ж</span>
                  <input
                    aria-label="Количество аккаунтов"
                    type="number"
                    name="w"
                    defaultValue="0"
                  />
                </label>
                <div>
                  <button aria-label="Увеличить">
                    <BiSolidUpArrow />
                  </button>
                  <button aria-label="Уменьшить">
                    <BiSolidDownArrow />
                  </button>
                </div>
              </div>
            </div>

            <div className="registration__amount__tariff">
              <div>
                <label>
                  <Radio name="registration" value="vak-sms" />
                  <span>VAK-SMS</span>
                </label>
                <div>
                  <input
                    aria-label="API-ключ"
                    type={eye.vak ? "password" : "text"}
                    autoComplete="off"
                    placeholder="Введите API-ключ"
                  />
                  <button
                    aria-label="Показать/скрыть пароль"
                    onClick={() => eyeHandler("vak")}
                  >
                    {eye.vak ? <FiEye /> : <FiEyeOff />}
                  </button>
                  <button aria-label="Сохранить">
                    <FiSave />
                  </button>
                </div>
                <p>Итого: 799 р</p>
              </div>

              <div>
                <label>
                  <Radio name="registration" value="online-sim" />
                  <span>OnlineSim</span>
                </label>
                <div>
                  <input
                    aria-label="API-ключ"
                    type={eye.online ? "password" : "text"}
                    autoComplete="off"
                    placeholder="Введите API-ключ"
                  />
                  <button
                    aria-label="Показать/скрыть пароль"
                    onClick={() => eyeHandler("online")}
                  >
                    {eye.online ? <FiEye /> : <FiEyeOff />}
                  </button>
                  <button aria-label="Сохранить">
                    <FiSave />
                  </button>
                </div>
                <p>Итого: 799 р</p>
              </div>

              <div>
                <label>
                  <Radio name="registration" value="sms-activate" />
                  <span>SmsActivate</span>
                </label>
                <div>
                  <input
                    aria-label="API-ключ"
                    type={eye.sms ? "password" : "text"}
                    autoComplete="off"
                    placeholder="Введите API-ключ"
                  />
                  <button
                    aria-label="Показать/скрыть пароль"
                    onClick={() => eyeHandler("sms")}
                  >
                    {eye.sms ? <FiEye /> : <FiEyeOff />}
                  </button>
                  <button aria-label="Сохранить">
                    <FiSave />
                  </button>
                </div>
                <p>Итого: 799 р</p>
              </div>
            </div>
          </div>
          <div className="registration__button__box">
            <button
              aria-label="Зарегистрировать"
              className="registration__button"
            >
              Зарегистрировать
            </button>
          </div>
        </div>

        <div className="add__group">
          <div className="group__header">
            <h3>Создать группу</h3>
            <button
              aria-label="Закрыть окно регистрации"
              onClick={() => setCreateGroup(!createGroup)}
            >
              {createGroup ? <CgClose /> : <PiPlusBold />}
            </button>
          </div>

          <form className={"group__form " + (createGroup ? "active" : "")}>
            <input
              aria-label="Название группы"
              type="text"
              name="name_group"
              autoComplete="off"
              placeholder="Название группы"
            />
            <button aria-label="Создать группу">Создать</button>
          </form>

          <div className="group__lists">
            <p>Выбрать существующую группу:</p>
            <ol>
              <li>
                <p>Без группы</p>
              </li>
              <li>
                <p>Без группы</p>
              </li>
              <li>
                <p>Без группы</p>
              </li>
              <li>
                <p>Без группы</p>
              </li>
              <li>
                <p>Без группы</p>
              </li>
              <li>
                <p>Без группы</p>
              </li>
              <li>
                <p>Без группы</p>
              </li>
            </ol>
          </div>

          <div className="group__button__box">
            <button
              aria-label="Закрыть окно регистрации"
              onClick={() => setAddGroup(false)}
            >
              <IoArrowBackOutline />
            </button>
            <button aria-label="Применить">Применить</button>
          </div>
        </div>
      </div>
    </div>
  );
});
