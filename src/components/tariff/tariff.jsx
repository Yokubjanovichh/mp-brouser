import React, { memo, useRef } from "react";
import "./tariff.css";
import { HiBookmark } from "react-icons/hi2";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { CgClose } from "react-icons/cg";
import { Mousedown } from "../../utility/mousedown";

export const Tariff = memo(() => {
  const status = useSelector((state) => state.tariff);
  const tariffRef = useRef();
  const dispatch = useDispatch();

  const closeTariff = () => dispatch({ type: "CLOSE_TARIFF" });
  Mousedown({ modalRef: tariffRef, onClose: closeTariff });

  return (
    <div className={"modal " + (status ? "active" : "")}>
      <div
        className={"tariff__content " + (status ? "active" : "")}
        ref={tariffRef}
      >
        <button
          aria-label="Закрыть окно тарифа"
          className="tariff__content__close"
          onClick={() => dispatch({ type: "CLOSE_TARIFF" })}
        >
          <CgClose />
        </button>

        <div className="tariff__body">
          <code></code>
          <div className="tariff__content__title">
            <h3>Подключено</h3>
            <HiBookmark />
          </div>
          <p>Тариф действителен до 03.02.2024</p>
          <b>Тариф "Единый"</b>
          <div className="tariff__content__price">
            <p>4900 ₽</p>
            <span>В месяц</span>
          </div>

          <ol className="tariff__content__features">
            <li>
              <IoCheckmarkCircleOutline />
              <p>Отзывы - неограниченное кол-во</p>
            </li>
            <li>
              <IoCheckmarkCircleOutline />
              <p>Выкупы - неограниченное кол-во</p>
            </li>
            <li>
              <IoCheckmarkCircleOutline />
              <p>Любые действия на Wildberries</p>
            </li>
            <li className="disabled">
              <IoCheckmarkCircleOutline />
              <p>Репрайсер (скоро)</p>
            </li>
            <li className="disabled">
              <IoCheckmarkCircleOutline />
              <p>Биржа органических выкупов (скоро)</p>
            </li>
          </ol>
        </div>

        <button
          aria-label="Подключить тариф"
          className="tariff__content__subscribe"
        >
          Подключить
        </button>
      </div>
    </div>
  );
});
