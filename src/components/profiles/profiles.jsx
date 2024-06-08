import React, { Fragment, memo, useState, useRef } from "react";
import "./profiles.css";
import { LuFilter } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { PiPlusBold } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Switch } from "../../interface";
import { Mousedown } from "../../utility/mousedown";

export const Profiles = memo(() => {
  const [select, setSelect] = useState(false);
  const [profile, setProfile] = useState(null);
  const [filterSlc, setFilterSlc] = useState(filterSelect[0]);
  const [addHashtag, setAddHashtag] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(null);
  const [deleteHashtag, setDeleteHashtag] = useState(null);
  const [filter, setFilter] = useState(false);

  const lists = Array.from({ length: 5 }, (_, i = 1) => i + 1);
  const addHashtagRef = useRef(null);
  const selectFilterRef = useRef(null);
  const listRef = useRef(null);
  const delProfileRef = useRef(null);
  const delHashtagRef = useRef(null);
  const filterRef = useRef(null);

  Mousedown({ modalRef: addHashtagRef, onClose: () => setAddHashtag(false) });
  Mousedown({ modalRef: selectFilterRef, onClose: () => setSelect(false) });
  Mousedown({ modalRef: listRef, onClose: () => setProfile(null) });
  Mousedown({ modalRef: delProfileRef, onClose: () => setDeleteProfile(null) });
  Mousedown({ modalRef: delHashtagRef, onClose: () => setDeleteHashtag(null) });
  Mousedown({ modalRef: filterRef, onClose: () => setFilter(false) });

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Object.fromEntries(new FormData(e.target));
    console.log(value);
  };

  const handleProfile = (item) => {
    if (profile === item) return setProfile(null);
    setProfile(item);
  };

  return (
    <Fragment>
      <div className="profiles">
        <div className="profiles__header">
          <button
            type="button"
            aria-label="Фильтр"
            onClick={() => setFilter(true)}
          >
            <LuFilter />
            <span>Фильтр</span>
          </button>

          <div className="profiles__header__select" ref={selectFilterRef}>
            <label
              className="input"
              onClick={() => {
                setSelect(!select);
                setProfile(null);
              }}
            >
              <input
                aria-label="Выбор"
                type="text"
                name="select"
                value={filterSlc?.title || ""}
                readOnly
                autoComplete="off"
              />
              {select ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </label>

            <ul
              className={
                "profiles__header__select__list" + (select ? " active" : "")
              }
            >
              {filterSelect.map((item) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      setFilterSlc(item);
                      setSelect(false);
                    }}
                    className={filterSlc.id === item.id ? "active" : ""}
                  >
                    <span>{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <label>
            <input
              aria-label="Поиск"
              type="text"
              name="search"
              placeholder="Поиск"
              autoComplete="off"
            />
            <button type="button" aria-label="Поиск">
              <FiSearch />
            </button>
          </label>
        </div>

        <ol className="profiles__list" ref={listRef}>
          {lists?.map((item) => {
            return (
              <li
                key={item}
                className={
                  "profiles__list__item" + (profile === item ? " active" : "")
                }
              >
                <div className="profiles__list__item__header">
                  <p onClick={() => handleProfile(item)}>
                    <FiUser />
                    <span>+7 903 837-74-93</span>
                    {profile === item ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )}
                  </p>

                  <div className="profiles__list__item__header__ac">
                    <div className="profiles__list__item_recommendation">
                      <div>
                        <span>demo</span>
                        <button
                          type="button"
                          aria-label="Удалить хештег"
                          onClick={() => setDeleteHashtag(item)}
                        >
                          <CgClose />
                        </button>
                      </div>

                      <div>
                        <span>test</span>
                        <button
                          type="button"
                          aria-label="Удалить хештег"
                          onClick={() => setDeleteHashtag(item)}
                        >
                          <CgClose />
                        </button>
                      </div>
                    </div>
                    <div className="profiles__list__item_hashtag">
                      <span>#с_историей</span>
                      <span>#не_рекомендуем</span>
                    </div>

                    <button
                      type="button"
                      aria-label="Добавить хештег"
                      onClick={() => setAddHashtag(true)}
                    >
                      <PiPlusBold />
                    </button>
                  </div>
                </div>

                <div
                  className={
                    "profiles__list__item__body" +
                    (profile === item ? " active" : "")
                  }
                >
                  <div className="profiles__list__item__body__dr">
                    <p>Сейчас в доставке:</p>
                    <span>123456</span>
                    <span>789456</span>
                    <span>756241</span>
                    <span>486568</span>
                    <span>123456</span>
                  </div>
                  <div className="profiles__list__item__body__dr">
                    <p>Оставить отзыв:</p>
                    <span>123456</span>
                    <span>789456</span>
                    <span>756241</span>
                    <span>756241</span>
                  </div>
                  <div className="profiles__list__item__body__ac">
                    <p>
                      <span>Баланс аккаунта: 0 р</span>
                      <i>Осталось дней: 9</i>
                    </p>
                    <div>
                      <button
                        type="button"
                        aria-label="Открыть"
                        className="btn"
                      >
                        Открыть
                      </button>
                      <button
                        type="button"
                        aria-label="Удалить аккаунт"
                        className="btn"
                        onClick={() => setDeleteProfile(item)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={`centr modal ${addHashtag ? "active" : ""}`}>
        <form
          className="add_hashtag"
          ref={addHashtagRef}
          onSubmit={handleSubmit}
        >
          <button
            className="close__modal_hashtag"
            type="button"
            aria-label="Закрыть"
            onClick={() => setAddHashtag(false)}
          >
            <CgClose />
          </button>
          <div className="add_hashtag__header">
            <h3>Добавление хештэгов</h3>
            <code></code>
          </div>

          <label>
            <span>Вы можете добавить аккаунту до шести хештегов</span>
            <input
              aria-label="Хештег"
              type="text"
              name="hashtag"
              placeholder="Введите хештег"
              className="input"
              autoComplete="off"
            />
          </label>

          <button type="submit" aria-label="Добавить">
            <span>Добавить</span>
          </button>
        </form>
      </div>

      <div className={"modal" + (deleteProfile ? " active" : "")}>
        <div
          className={"delete__profile" + (deleteProfile ? " active" : "")}
          ref={delProfileRef}
        >
          <button
            className="close__modal"
            type="button"
            aria-label="Закрыть"
            onClick={() => setDeleteProfile(null)}
          >
            <CgClose />
          </button>
          <div className="delete__profile__header">
            <p>
              <span>Вы действительно хотите удалить аккаунт?</span>
              <code></code>
            </p>
            <p>Подтвердите удаление</p>

            <i>
              *Выбранный аккаунт будет удалён. Восстановить его будет
              невозможно.
            </i>
          </div>
          <div className="delete__profile__body">
            <button
              className="btn"
              aria-label="Отмена"
              onClick={() => setDeleteProfile(null)}
            >
              Отмена
            </button>
            <button aria-label="Удалить" className="btn">
              Удалить
            </button>
          </div>
        </div>
      </div>

      <div className={"modal" + (deleteHashtag ? " active" : "")}>
        <div
          className={"delete__profile" + (deleteHashtag ? " active" : "")}
          ref={delHashtagRef}
        >
          <button
            className="close__modal"
            type="button"
            aria-label="Закрыть"
            onClick={() => setDeleteHashtag(null)}
          >
            <CgClose />
          </button>
          <div className="delete__profile__header">
            <p>
              <span>Вы действительно хотите удалить хештег?</span>
              <code></code>
            </p>
            <p>Подтвердите удаление</p>

            <i>
              *Выбранный хештег будет удалён. Восстановить его будет невозможно
            </i>
          </div>
          <div className="delete__profile__body">
            <button
              className="btn"
              aria-label="Отмена"
              onClick={() => setDeleteHashtag(null)}
            >
              Отмена
            </button>
            <button
            aria-label="Удалить"
            className="btn">Удалить</button>
          </div>
        </div>
      </div>

      <div className={"modal" + (filter ? " active" : "")}>
        <div
          className={"filter_profiles" + (filter ? " active" : "")}
          ref={filterRef}
        >
          <button
            className="close__modal"
            type="button"
            aria-label="Закрыть"
            onClick={() => setFilter(false)}
          >
            <CgClose />
          </button>

          <h3>Фильтр аккаунтов</h3>

          {filterSwitch.map((item) => {
            return (
              <label key={item.id}>
                <Switch name={item.name} />
                <span>{item.title}</span>
              </label>
            );
          })}
          <p>
            <span>Количество найденных аккаунтов:</span>
            <span>0</span>
          </p>
          <div className="filter_profiles__btn">
            <button type="button" aria-label="Сбросить">
              Сбросить
            </button>
            <button type="button" aria-label="Применить">
              Применить
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
});

const filterSelect = [
  {
    id: 1,
    title: "Все",
  },
  {
    id: 2,
    title: "Аккаунты, которые НЕ делали выкупы данного артикула",
  },
  {
    id: 3,
    title: "Аккаунты, которые делали выкупы данного артикула",
  },
  {
    id: 4,
    title: "Аккаунты, с которых можно оставить отзыв на данный артикул",
  },
];

const filterSwitch = [
  {
    id: 1,
    title: "Показать все аккаунты кроме чистых",
    name: "all",
    active: false,
  },
  {
    id: 2,
    title: "Показать чистые аккаунты",
    name: "not",
    active: false,
  },
  {
    id: 3,
    title: "Показать аккаунты, с которых можно что-то забрать",
    name: "yes",
    active: false,
  },
  {
    id: 4,
    title: "Показать аккаунты, где можно оставить отзыв",
    name: "review",
    active: false,
  },
  {
    id: 5,
    title: "Показать аккаунты с балансом",
    name: "balance",
    active: false,
  },
];
