import { Fragment, memo } from 'react';
import './interface.css';

export const Input = memo(({ type, name, ph, focus }) => {
  return (
    <Fragment>
      <input
        aria-label="Ввод"
        name={name}
        autoFocus={focus || false}
        autoComplete="off"
        autoCapitalize="off"
        className={"input"}
        type={type}
        placeholder={ph}
      />
    </Fragment>
  );
});
