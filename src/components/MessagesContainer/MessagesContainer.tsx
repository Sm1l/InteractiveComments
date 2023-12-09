import React, { useRef, useEffect } from "react";
import { useUserStore } from "../../store/usersStore";

import styles from "./MessagesContainer.module.scss";
import { MessageFull } from "../MessageFull";

interface CardContainerProps {
  isNewMessage: boolean;
  setIsNewMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessagesContainer: React.FC<CardContainerProps> = ({ isNewMessage, setIsNewMessage }) => {
  const messages = useUserStore((state) => state.messages);
  // console.log(messages);

  const lastMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Прокручиваем к последнему сообщению при каждом изменении messages
    if (isNewMessage && lastMsgRef.current != null) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      setIsNewMessage(false);
    }
  }, [messages]);

  return (
    <div className={styles.messagesContainer}>
      {messages.map((m, i) => (
        <MessageFull key={m.id} forwardedRef={i === messages.length - 1 ? lastMsgRef : null} message={m} />
      ))}
    </div>
  );
};

export { MessagesContainer };
