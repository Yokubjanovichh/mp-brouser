import React, { useState, useRef, Fragment } from "react";
import "./home.css";
import { LuRefreshCw, LuFootprints, LuLoader } from "react-icons/lu";
import { RiRobot2Line } from "react-icons/ri";
import { PiPlusBold } from "react-icons/pi";
import { CgPushDown } from "react-icons/cg";
import { Radio } from "../../interface/index";
import { useDispatch } from "react-redux";
import { Group } from "../../components/group/group";
import { Profiles } from "../../components/profiles/profiles";
import { Mousedown } from "../../utility/mousedown";

export const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openInstall, setOpenInstall] = useState(false);
  const openAlgorithm = () => dispatch({ type: "OPEN_ALGORITHM" });
  // const [open, setOpen] = useState(false);

  const installRef = useRef(null);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const toggleInstall = () => setOpenInstall(!openInstall);
  Mousedown({ modalRef: installRef, onClose: () => setOpenInstall(false) });
  const openRegistation = () => dispatch({ type: "OPEN_REGISTRATION" });

  return (
    <Fragment>
      <div className="home">
        <div className="home__left">
          <div className="home__left__header">
            <div>
              <button
                aria-label="Обновить"
                onClick={handleRefresh}
                className={loading ? "home__refresh" : ""}
              >
                {loading ? <LuLoader /> : <LuRefreshCw />}
              </button>
              <div className="home__left__header__install" ref={installRef}>
                <button aria-label="Установить" onClick={toggleInstall}>
                  <CgPushDown />
                </button>

                <div
                  className={
                    "home__left__header__install__methods" +
                    (openInstall ? " active" : "")
                  }
                >
                  <label>
                    <Radio name="install" value="install" checked />
                    <span>Коды для ПВЗ</span>
                  </label>
                  <label>
                    <Radio name="install" value="install" />
                    <span>Все покупки за всё время</span>
                  </label>

                  <button aria-label="Скачать" onClick={toggleInstall}>
                    Скачать
                  </button>
                </div>
              </div>
              <button aria-label="Добавить аккаунт" onClick={openRegistation}>
                <PiPlusBold />
              </button>
            </div>
            <div>
              <button aria-label="Алгоритм" onClick={() => openAlgorithm()}>
                <RiRobot2Line />
              </button>
              <button aria-label="Следы">
                <LuFootprints />
              </button>
            </div>
          </div>

          <div className="home__left__body">
            <Profiles />
          </div>
        </div>
        <div className="home__right">
          <Group />
        </div>
      </div>
    </Fragment>
  );
};
