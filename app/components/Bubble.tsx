import classNames from "classnames";
import React, { useMemo } from "react";

export interface IBubble {
  header?: React.ReactElement | string;
  footer?: React.ReactElement;
  content: React.ReactElement | string;
  avatar?: React.ReactElement;
  direction?: "left" | "right";
  type?: "neutral" | "primary";
  isLoading?: boolean;
}

export enum DIRECTION {
  Left = "left",
  Right = "right",
}

const COLOR_MAP = {
  neutral:
    "bg-neutral/10 text-neutral dark:bg-neutral-content/10 dark:text-neutral-content",
  primary:
    "bg-primary/10 text-neutral dark:bg-primary/50 dark:text-neutral-content",
};

export default function Bubble(props: IBubble) {
  const {
    header,
    content,
    avatar,
    footer,
    type = "neutral",
    direction = DIRECTION.Left,
  } = props;
  const isRight = useMemo(() => direction === DIRECTION.Right, [direction]);

  return (
    <div
      className={classNames(
        "flex mt-6 first:mt-0 flex-col sm:flex-row ",
        isRight && "flex-row-reverse sm:flex-row-reverse",
      )}
    >
      <div
        className={classNames(
          "flex items-end sm:items-start mb-2",
          isRight && "flex-row-reverse",
        )}
      >
        {avatar && (
          <div
            className={classNames(
              "avatar w-6 h-6 sm:w-8 sm:h-8 rounded-full",
              isRight ? "ml-3" : "mr-3",
            )}
          >
            {avatar}
          </div>
        )}
        {header && <div className="text-xs opacity-50 sm:hidden">{header}</div>}
      </div>

      <div
        className={classNames(
          "max-w-[100%] sm:max-w-[90%] flex flex-col",
          isRight ? "items-end" : "items-start",
        )}
      >
        {header && (
          <div className="text-xs mb-2 opacity-50 invisible absolute sm:visible sm:relative">
            {header}
          </div>
        )}
        <div
          className={classNames(
            "rounded-md min-h-1 inline-flex min-w-[2.75rem] max-w-full px-4 py-2 relative group",
            isRight ? "rounded-tr-[0]" : "rounded-tl-[0]",
            // isLoading && "pr-[38px]",
            COLOR_MAP[type],
          )}
        >
          {content}
          {footer && !!content && (
            <div className="absolute -bottom-5 right-0 text-xs mt-[5px] flex justify-end">
              <div className="text-neutral dark:text-neutral-content cursor-pointer flex relative transition-all opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-50 -right-[20px] group-hover:right-0">
                {footer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
