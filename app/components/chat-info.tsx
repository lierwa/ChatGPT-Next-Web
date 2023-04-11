import React from "react";
import classNames from "classnames";
import DeleteIcon from "../icons/delete.svg";
import Locale from "../locales";

export default function ChatItem(props: {
  onClick?: () => void;
  onDelete?: () => void;
  title: string;
  count: number;
  time: string;
  selected: boolean;
}) {
  return (
    <div
      className={classNames(
        "group px-[10px] py-[14px] rounded-[10px] mb-[10px] boxShadow-card-shadow transition-all cursor-pointer select-none relative overflow-hidden",
        "bg-white hover:bg-base-200 dark:bg-neutral dark:hover:bg-neutral-focus",
        "border-[2px]",
        props.selected ? "border-primary" : "border-[transparent]",
      )}
      onClick={props.onClick}
    >
      <div className="text-sm font-bold w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
        {props.title}
      </div>
      <div
        className={
          "flex justify-between dark:text-neutral-content text-neutral text-xs mt-2"
        }
      >
        <div>{Locale.ChatItem.ChatItemCount(props.count)}</div>
        <div>{props.time}</div>
      </div>
      <div
        className={
          "absolute top-[10px] -right-[20px] transition-all opacity-0 group-hover:opacity-50 group-hover:right-[10px] hover:opacity-100"
        }
        onClick={props.onDelete}
      >
        <DeleteIcon className={"fill-primary"} />
      </div>
    </div>
  );
}
