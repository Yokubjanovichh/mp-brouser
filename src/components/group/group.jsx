import React, { memo, useState, useEffect, useRef, Fragment } from "react";
import "./group.css";
import { PiPlusBold, PiMinusBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { MdOutlineCheckBox, MdDeleteOutline } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { CgClose } from "react-icons/cg";
import { Mousedown } from "../../utility/mousedown";

export const Group = memo(() => {
  const dispatch = useDispatch();
  const [createGroup, setCreateGroup] = useState(false);
  const [editGroup, setEditGroup] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [deleteGroup, setDeleteGroup] = useState(null);
  const [saveChanges, setSaveChanges] = useState(null);
  const [searchGroup, setSearchGroup] = useState("");

  const groups = Array.from({ length: 4 }, (_, i) => {
    return {
      id: i,
      group: `Группа ${i + 1}`,
      count: 12,
    };
  });

  const editGroupRef = useRef(null);
  const delGroupRef = useRef(null);
  const saveChangesRef = useRef(null);

  const handleEditGroup = (e) => {
    setEditGroup({ ...editGroup, group: e.target.value });
  };

  const cancelEditGroup = () => {
    setEditGroup(null);
    setSaveChanges(false);
  };

  Mousedown({ modalRef: delGroupRef, onClose: () => setDeleteGroup(null) });

  useEffect(() => {
    // Close modal by click outside the modal
    const heandlerMouse = (e) => {
      if (editGroupRef?.current?.contains(e.target)) return;
      // Save changes
      if (editGroup?.group?.length) return setSaveChanges(true);
      return cancelEditGroup();
    };

    // Add event listeners
    document.addEventListener("mousedown", heandlerMouse);

    // Remove event listeners
    return () => {
      document.removeEventListener("mousedown", heandlerMouse);
    };
  }, [editGroup]);

  // Open registration modal
  const addtoGroup = (group) => {
    return dispatch({ type: "OPEN_REGISTRATION", payload: group });
  };

  // handleCreateGroup
  const handleCreateGroup = (e) => {
    e.preventDefault();
    const value = Object.fromEntries(new FormData(e.target));
    console.log(value);
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  const groupsFilter = groups.filter((group) => {
    return group.group.toLowerCase().includes(searchGroup.toLowerCase());
  });

  return (
    <Fragment>
      <div className={`groups ${createGroup ? "active" : ""}`}>
        <div className="groups__header">
          <button
            aria-label="Создать группу"
            onClick={() => setCreateGroup(!createGroup)}
          >
            <span>Создать группу</span>
            {createGroup ? <PiMinusBold /> : <PiPlusBold />}
          </button>

          <label className="groups__header__search input">
            <input
              aria-label="Поиск группы"
              type="text"
              placeholder="Найти"
              onChange={(e) => setSearchGroup(e.target.value)}
            />
            <button aria-label="Поиск">
              <FiSearch />
            </button>
          </label>
        </div>

        <form
          className={`group__create ${createGroup ? "active" : ""}`}
          onSubmit={handleCreateGroup}
        >
          <input
            aria-label="Создать группу"
            type="text"
            name=""
            className="input"
            placeholder="Создать группу"
          />
          <button aria-label="Создать группу">Создать</button>
        </form>

        <div
          className={`groups__table__wrapper ${createGroup ? "active" : ""}`}
        >
          <table className="groups__table" border="1">
            <thead>
              <tr>
                <th>Существующие группы:</th>
                <th>Кол-во аккаунтов:</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="groups__table__body">
              <tr className={selectedGroup === "all" ? "selected" : ""}>
                <td>
                  <div className={selectedGroup === "all" ? "selected" : ""}>
                    <p onClick={() => handleSelectGroup("all")}>
                      {selectedGroup !== "all" ? (
                        <MdOutlineCheckBoxOutlineBlank />
                      ) : (
                        <MdOutlineCheckBox />
                      )}
                      <span>Все аккаунты</span>
                    </p>
                  </div>
                </td>
                <td>
                  <p>200</p>
                </td>
                <td></td>
              </tr>
              <tr className={selectedGroup === "noroup" ? "selected" : ""}>
                <td>
                  <div className={selectedGroup === "noroup" ? "selected" : ""}>
                    <p onClick={() => handleSelectGroup("noroup")}>
                      {selectedGroup !== "noroup" ? (
                        <MdOutlineCheckBoxOutlineBlank />
                      ) : (
                        <MdOutlineCheckBox />
                      )}
                      <span>Без группы</span>
                    </p>
                  </div>
                </td>
                <td>
                  <p>300</p>
                </td>
                <td>
                  <div>
                    <button
                      aria-label="Добавить в группу"
                      onClick={() => addtoGroup(null)}
                    >
                      <PiPlusBold />
                    </button>
                  </div>
                </td>
              </tr>
              {groupsFilter?.map((group, index) => {
                return (
                  <tr
                    key={index}
                    className={selectedGroup?.id === group.id ? "selected" : ""}
                  >
                    <td onClick={() => handleSelectGroup(group)}>
                      <div
                        ref={editGroup?.id === group.id ? editGroupRef : null}
                      >
                        <p
                          style={{
                            display:
                              editGroup?.id === group.id ? "none" : "flex",
                          }}
                        >
                          {selectedGroup?.id === group.id ? (
                            <MdOutlineCheckBox />
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank />
                          )}
                          <span>{group?.group}</span>
                        </p>
                        <input
                          aria-label="Редактировать группу"
                          className="input"
                          name="group"
                          type={editGroup?.id === group.id ? "text" : "hidden"}
                          readOnly={editGroup?.id !== group.id}
                          defaultValue={group?.group}
                          onChange={handleEditGroup}
                          placeholder="Название группы"
                        />
                      </div>
                    </td>
                    <td>
                      <p>{group?.count}</p>
                    </td>
                    <td>
                      <div>
                        <button
                          aria-label="Редактировать группу"
                          onClick={() => setEditGroup(group)}
                        >
                          <BiSolidEditAlt />
                        </button>
                        <button
                          aria-label="Добавить в группу"
                          onClick={() => addtoGroup(group)}
                        >
                          <PiPlusBold />
                        </button>
                        <button
                          aria-label="Удалить группу"
                          onClick={() => setDeleteGroup(group)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={"modal" + (deleteGroup ? " active" : "")}>
        <div
          className={"delete__profile" + (deleteGroup ? " active" : "")}
          ref={delGroupRef}
        >
          <button
            aria-label="Закрыть окно удаления группы"
            className="close__modal"
            type="button"
            onClick={() => setDeleteGroup(null)}
          >
            <CgClose />
          </button>
          <div className="delete__profile__header">
            <p>
              <span>Вы действительно хотите удалить группу?</span>
              <code></code>
            </p>
            <p>Подтвердите удаление</p>

            <i>
              *Группа будет удалена. Аккаунты этой группы попадут в раздел "Без
              группы"
            </i>
          </div>
          <div className="delete__profile__body">
            <button
              aria-label="Отменить удаление группы"
              className="btn"
              onClick={() => setDeleteGroup(null)}
            >
              Отмена
            </button>
            <button aria-label="Подтвердить удаление группы" className="btn">
              Удалить
            </button>
          </div>
        </div>
      </div>

      <div className={"modal" + (saveChanges ? " active" : "")}>
        <div
          className={"delete__profile" + (saveChanges ? " active" : "")}
          ref={saveChangesRef}
        >
          <button
            aria-label="Закрыть окно сохранения изменений"
            className="close__modal"
            type="button"
            onClick={cancelEditGroup}
          >
            <CgClose />
          </button>
          <div className="delete__profile__header">
            <p>
              <span>Вы действительно хотите изменить группу?</span>
              <code></code>
            </p>
            <p>Подтвердите изменения</p>

            <i>
              *Группа будет изменена. Аккаунты этой группы попадут в измененную
            </i>
          </div>
          <div className="delete__profile__body">
            <button
              aria-label="Отменить изменения группы"
              className="btn"
              onClick={cancelEditGroup}
            >
              Отмена
            </button>
            <button
              aria-label="Подтвердить изменения группы"
              className="btn save"
              onClick={cancelEditGroup}
            >
              Применить
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
});
