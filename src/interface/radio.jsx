import { memo } from "react";
import "./interface.css";

export const Radio = memo(({ name, value, checked }) => {
  return (
    <div className="radio">
      <input
        aria-label="Выбрать"
        name={name}
        value={value}
        type="radio"
        defaultChecked={checked || false}
        hidden
      />
      <span></span>
    </div>
  );
});
