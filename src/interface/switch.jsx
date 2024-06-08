import { memo } from "react";
import "./interface.css";

export const Switch = memo(({ name, value, checked = false }) => {
  return (
    <div className="switch">
      <input name={name} value={value} type="checkbox" hidden />
      <span className="active"></span>
      <i></i>
    </div>
  );
});
