import { createContext, useContext } from "react";
import styled from "styled-components";
const RadioContext = createContext({});

const FieldSet = styled.fieldset`
  width: 100%;
  .radio_option{
    input {
      margin-right: 10px;
    }
    margin-right: 10%;
  }
`;

export function Radio({ children, value, name, defaultChecked, disabled }) {
  const group = useContext(RadioContext);
  return (
    <label className="radio_option">
      <input
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled || group.disabled}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={(e) => group.onChange && group.onChange(e.target.value)}
      />
      {children}
    </label>
  );
}

export function RadioGroup({ label, children, ...rest }) {
  return (
    <FieldSet>
      <legend>{label}</legend>
      <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
    </FieldSet>
  );
}

const CheckBoxInput = styled.input`
  margin-right: 10px;
`;

export function Checkbox({ children, disabled, checked, onChange }) {
  return (
    <label>
      <CheckBoxInput
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
      {children}
    </label>
  );
}