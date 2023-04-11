import { useState, useRef, useEffect, useLayoutEffect } from "react";
import styles from "./home.module.scss";

import { useChatStore } from "../store";

import Locale from "../locales";
import { isMobileScreen } from "../utils";
import ChatItem from "./chat-info";

export function ChatList() {
  const [sessions, selectedIndex, selectSession, removeSession] = useChatStore(
    (state) => [
      state.sessions,
      state.currentSessionIndex,
      state.selectSession,
      state.removeSession,
    ],
  );

  return (
    <div className={styles["chat-list"]}>
      {sessions.map((item, i) => (
        <ChatItem
          title={item.topic}
          time={item.lastUpdate}
          count={item.messages.length}
          key={i}
          selected={i === selectedIndex}
          onClick={() => selectSession(i)}
          onDelete={() =>
            (!isMobileScreen() || confirm(Locale.Home.DeleteChat)) &&
            removeSession(i)
          }
        />
      ))}
    </div>
  );
}
