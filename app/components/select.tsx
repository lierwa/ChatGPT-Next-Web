import React, { ChangeEvent } from "react";
import classNames from "classnames";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface ISelect {
  lists: string[] | Option[];
  className?: string | undefined;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export default function Select(props: ISelect) {
  const { value, className, lists = [], onChange, ...rest } = props;
  return (
    <select
      value={value}
      className={classNames(
        "select max-w-xs select-primary select-sm w-auto",
        className,
      )}
      {...rest}
      onChange={(e) => onChange?.(e)}
    >
      {lists.map((r: string | Option) => {
        const _label = typeof r === "string" ? r : r.label;
        const _value = typeof r === "string" ? r : r.value;
        const _isDisabled = typeof r === "string" ? false : r?.disabled;
        return (
          <option key={_value} value={_value} disabled={_isDisabled}>
            {_label}
          </option>
        );
      })}
    </select>
  );
}
