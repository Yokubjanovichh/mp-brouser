import { memo } from "react";
import "./interface.css";
import { FaCheck } from "react-icons/fa6";

export const Checkbox = memo(({ name }) => {
  return (
    <div className="checkbox">
      <input aria-label="Выбрать" name={name} type="checkbox" hidden />
      <span></span>
      <FaCheck />
    </div>
  );
});
