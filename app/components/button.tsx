import classNames from "classnames";
import React, { useMemo, useCallback } from "react";

const textColor = (disabled = false) => ({
  default: disabled ? "text-disabled" : "text-black dark:text-d-black",
  primary: "text-white dark:text-d-white",
});

const bgColor = (disabled = false) => ({
  default: "bg-white dark:bg-d-white",
  primary: disabled ? "bg-primary/30" : "bg-primary",
});

const border = () => ({
  default: "border-line",
  primary: "",
});

export function IconButton(props: {
  onClick?: () => void;
  icon: JSX.Element;
  text?: string;
  bordered?: boolean;
  shadow?: boolean;
  noDark?: boolean;
  className?: string;
  title?: string;
  type?: "default" | "primary";
  disabled?: boolean;
}) {
  const {
    type = "default",
    disabled = false,
    bordered,
    shadow,
    onClick,
  } = props;

  const buttonClass = useMemo(() => {
    return classNames(
      textColor(disabled)[type],
      bgColor(disabled)[type],
      bordered && border()[type],
    );
  }, [type, disabled, bordered]);

  const _onClick = useCallback(() => {
    !disabled && onClick?.();
  }, [onClick, disabled]);

  return (
    <div
      className={classNames(
        "rounded-[10px] flex-center p-[10px] cursor-pointer transition-all overflow-hidden select-none",
        buttonClass,
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
