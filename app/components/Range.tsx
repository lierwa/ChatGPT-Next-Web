import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";

interface IRange extends InputHTMLAttributes<HTMLInputElement> {
  appearValue?: boolean;
}

export default function Range(props: IRange) {
  const { title, value, appearValue = true, className, ...rest } = props;
  return (
    <div className="flex-center">
      {(title || value) && appearValue && (
        <span className="text-xs mr-[6px]">{title || value}</span>
      )}
      <input
        title={title}
        {...rest}
        type="range"
        value={value}
        className={classNames("range range-primary w-auto range-xs", className)}
      />
    </div>
  );
}
