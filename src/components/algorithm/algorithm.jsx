import React, { memo, useRef, useState } from "react";
import "./algorithm.css";
import { CgClose } from "react-icons/cg";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { NumericFormat } from "react-number-format";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Mousedown } from "../../utility/mousedown";
import { Checkbox } from "../../interface/index";
import { useDispatch, useSelector } from "react-redux";

export const Algorithm = memo(() => {
  // const { open, setOpen } = props;
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [step, setStep] = useState(true);
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const close = () => dispatch({ type: "CLOSE_ALGORITHM" });
  const open = useSelector((state) => state.algorithm);
  Mousedown({ modalRef, onClose: () => close() });

  // Toggle Step
  const toggleStep = (st) => {
    setStep(st);
    const stepactive = document?.querySelector(".algorithm__select");
    const reg = document?.querySelector(".algorithm__body");
    stepactive?.setAttribute("style", `--active-step: ${st ? 0 : 1}`);
    reg?.setAttribute("style", `--step: ${st ? 0 : 1}`);
  };

  return (
    <div className={"modal " + (open ? "active" : "")}>
      <div className={"algorithm " + (open ? "active" : "")} ref={modalRef}>
        <button
          aria-label="Закрыть окно алгоритмов"
          className="close__modal"
          onClick={() => close()}
        >
          <CgClose />
        </button>
        <div className="algorithm__header">
          <p>Алгоритмы</p>
          <span></span>
        </div>

        <div className="algorithm__select">
          <button
            aria-label="Добавление в карзину"
            onClick={() => toggleStep(true)}
            className={step ? "active" : ""}
          >
            {step ? <IoCheckmarkCircleOutline /> : <IoCloseCircleOutline />}
            <span>Добавление в карзину</span>
          </button>
          <button
            aria-label="Авто-выкуп"
            onClick={() => toggleStep(false)}
            className={!step ? "active" : ""}
          >
            {step ? <IoCloseCircleOutline /> : <IoCheckmarkCircleOutline />}
            <span>Авто-выкуп</span>
          </button>
        </div>

        <div className="algorithm__body">
          <div className="algorithm__cart">
            <label>
              <Checkbox name="algorithm" value="algorithm" checked />
              <span>Инструкция</span>
            </label>

            <div className="algorithm__action">
              <input
                aria-label="Скачать шаблон"
                type="button"
                value="Скачать шаблон"
              />
              <label>
                <input
                  aria-label="Загрузить Excel"
                  type="file"
                  hidden
                  accept=".xls, .xlsx"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <span>Загрузить Excel</span>
              </label>
              <div
                className="algorithm__excel__file"
                style={{ display: file ? "flex" : "none" }}
              >
                <span>{file?.name}</span>
                <button aria-label="Удалить файл" onClick={() => setFile(null)}>
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
            <div className="algorithm__action__button">
              <button aria-label="Скачать отчет по работе">
                Скачать отчет по работе
              </button>
              <button aria-label="Запустить" disabled={!file ? true : false}>
                Запустить
              </button>
            </div>
          </div>
          <div className="algorithm__buy">
            <div className="algorithm__buy__left">
              <div className="algorithm__buy__select">
                <label>
                  <div>
                    <input
                      aria-label="Чистые"
                      type="radio"
                      name="value1"
                      hidden
                    />
                    <span></span>
                  </div>
                  <span>Чистые</span>
                </label>
                <label>
                  <div>
                    <input
                      aria-label="Задержка в карточке"
                      type="radio"
                      name="value1"
                      hidden
                    />
                    <span></span>
                  </div>
                  <span>Задержка в карточке</span>
                </label>
                <label>
                  <div>
                    <input
                      aria-label="Уникальные"
                      type="radio"
                      name="value1"
                      hidden
                    />
                    <span></span>
                  </div>
                  <span>Уникальные</span>
                </label>
              </div>

              <label className="algorithm__buy__select__group">
                <span>Выберите группу</span>
                <button aria-label="Выбрать">Выбрать</button>
              </label>

              <div className="algorithm__buy__select__quantity">
                <p>Кол-во потоков</p>
                <div>
                  <NumericFormat
                    allowLeadingZeros={false}
                    thousandSeparator=" "
                    value={quantity}
                    placeholder="Кол-во потоков"
                    onValueChange={({ value }) => {
                      setQuantity(value <= 0 ? 1 : value);
                    }}
                  />

                  <div>
                    <button
                      aria-label="Увеличить"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <MdOutlineKeyboardArrowUp />
                    </button>
                    <button
                      aria-label="Уменьшить"
                      onClick={() => {
                        if (quantity > 1) setQuantity(quantity - 1);
                      }}
                    >
                      <MdOutlineKeyboardArrowDown />
                    </button>
                  </div>
                </div>
              </div>

              <div className="algorithm__buy__select__file">
                <button aria-label="Скачать шаблон">Скачать шаблон</button>
                <label>
                  <input
                    aria-label="Загрузить Excel"
                    type="file"
                    hidden
                    accept=".xls, .xlsx"
                    onChange={(e) => setFile1(e.target.files[0])}
                  />
                  <span>Загрузить Excel</span>
                </label>
                <div style={{ display: file1 ? "flex" : "none" }}>
                  <span>{file1?.name}</span>
                  <button
                    aria-label="Удалить файл"
                    onClick={() => setFile1(null)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            </div>

            <div className="algorithm__buy__right">
              <div>
                <span>Арт. 1234567</span>
                <NumericFormat
                  value="476"
                  allowLeadingZeros
                  thousandSeparator=" "
                  displayType="text"
                  suffix=" ₽"
                />
              </div>
              <img
                src="https://cdn.ttgtmedia.com/rms/misc/qr_code_barcode.jpg"
                alt="qr code"
                width="210"
                height="210"
              />

              <div>
                <i>Не оплачивать</i>
                <p>
                  <span>Поток 1</span>
                  <MdOutlineKeyboardArrowRight />
                </p>
              </div>
            </div>

            <div className="algorithm__buy__action">
              <p>Инструкция</p>
              <button aria-label="Скачать отчет по работе">Запустить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
