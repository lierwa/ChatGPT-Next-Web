/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import LoadingIcon from "../icons/three-dots.svg";
import React, { useState, useEffect, useRef, useMemo } from "react";

interface Props {
  text: string;
  offset?: [number, number];
  isLoading?: boolean;
}

const LoadingAfterLastChar = ({ text, offset = [42, 0], isLoading }: Props) => {
  const [loadingPos, setLoadingPos] = useState<{
    loadingLeft: number;
    loadingTop: number;
  }>({
    loadingLeft: 0,
    loadingTop: 0,
  });

  const [left, top] = offset;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const textRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const loadingAndPos =
    isLoading && loadingPos.loadingLeft && loadingPos.loadingTop && text;

  useEffect(() => {
    if (
      !containerRef.current ||
      !textRef.current ||
      !loadingRef.current ||
      !text
    )
      return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const textEl = textRef.current as HTMLElement;
    const textHeight = textEl.offsetHeight;
    const textRect = textEl.getBoundingClientRect();
    const lastCharRect = getCharRectAtEnd(textEl);

    // if(lastCharRect && !lastCharRect?.right || !lastCharRect?.left) {
    //     return
    // }
    const lastCharRight = lastCharRect.right - textRect.left;

    const loadingEl = loadingRef.current;

    const loadingWidth = loadingEl.offsetWidth;
    const loadingHeight = loadingEl.offsetHeight;

    const loadingLeft =
      lastCharRight + loadingWidth / 2 <= containerWidth
        ? lastCharRight
        : containerWidth - loadingWidth / 2;

    console.log("lastCharRect", lastCharRect);
    console.log("textRect", textRect);
    const loadingTop =
      lastCharRect.top - textRect.top + lastCharRect.height / 2;

    setLoadingPos({
      loadingTop: loadingTop + top,
      loadingLeft: loadingLeft + left,
    });
  }, [text]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <div ref={textRef}>{text}</div>
      <span
        ref={loadingRef}
        className={classNames(
          "absolute",
          loadingAndPos ? "visible" : "invisible",
        )}
        style={{ left: loadingPos.loadingLeft, top: loadingPos.loadingTop }}
      >
        <LoadingIcon />
      </span>
    </div>
  );
};

function getCharRectAtEnd(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rect = range.getClientRects();
  range.detach();
  return rect[rect.length - 1];
}

export interface IBubble {
  header?: string;
  footer?: React.ReactElement;
  content: string;
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
    isLoading = true,
  } = props;
  const isRight = useMemo(() => direction === DIRECTION.Right, [direction]);

  return (
    <div
      className={classNames(
        "flex mt-6 first:mt-0",
        isRight && "flex-row-reverse",
      )}
    >
      {avatar && (
        <div
          className={classNames(
            "avatar w-10 h-10 rounded-full",
            isRight ? "ml-3" : "mr-3",
          )}
        >
          {avatar}
        </div>
      )}
      <div className={classNames("flex-1", isRight && "text-right")}>
        {header && <div className="text-xs mb-[5px] opacity-50">{header}</div>}
        <div
          className={classNames(
            "rounded-md min-h-[2.75rem] inline-flex min-w-[2.75rem] px-4 py-2 max-w-[90%] relative group",
            isRight ? "rounded-tr-[0]" : "rounded-tl-[0]",
            isLoading && "pr-[38px]",
            COLOR_MAP[type],
          )}
        >
          <LoadingAfterLastChar text={content} isLoading={isLoading} />
          {footer && (
            <div className="absolute -bottom-5 right-0 text-xs mt-[5px] w-[90%] flex justify-end">
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
