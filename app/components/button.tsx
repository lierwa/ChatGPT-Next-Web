import classNames from "classnames";
import React, { useMemo, useCallback } from "react";

const btnType = {
  default: "btn btn-ghost dark:btn",
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  outline: "btn btn-outline",
};

export function IconButton(props: {
  onClick?: () => void;
  icon: JSX.Element;
  text?: string;
  shadow?: boolean;
  noDark?: boolean;
  className?: string;
  title?: string;
  type?: "default" | "primary" | "ghost" | "outline";
  disabled?: boolean;
}) {
  const { type = "default", disabled = false, shadow, onClick } = props;

  const _onClick = useCallback(() => {
    !disabled && onClick?.();
  }, [onClick, disabled]);

  return (
    <div
      className={classNames(
        btnType[type],
        shadow && "shadow-card-shadow",
        "clickable",
        props.className,
      )}
      onClick={_onClick}
      title={props.title}
      role="button"
    >
      <div
        className={classNames("w-4 h-4 flex-center", props.noDark && "no-dark")}
      >
        {props.icon}
      </div>
      {props.text && <div className="ml-[5px] text-xs">{props.text}</div>}
    </div>
  );
}
