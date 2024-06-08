import { Fragment, memo } from "react";
import "./interface.css";

export const Button = memo(({ type, children }) => {
  return (
    <Fragment>
      <button aria-label="Кнопка" type={type || "button"} className={"button"}>
        {children}
      </button>
    </Fragment>
  );
});
