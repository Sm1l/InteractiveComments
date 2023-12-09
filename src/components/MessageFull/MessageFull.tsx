import React from "react";

import { IMessage } from "../../store/usersStore";

import styles from "./MessageFull.module.scss";

import { Message } from "../Message";

interface MessageFull {
  message: IMessage;
  forwardedRef?: React.RefObject<HTMLDivElement> | null;
}

const MessageFull: React.FC<MessageFull> = ({ message, forwardedRef }) => {
  return (
    <div className={styles.messageFull} ref={forwardedRef}>
      <Message
        message={message.message}
        username={message.username}
        date={message.date}
        rating={message.rating}
        id={message.id}
        reply={message.reply}
        isReply={false}
      />
      {message.reply.length !== 0 && (
        <div className={styles.replyContainer}>
          <div className={styles.replyMessagesContainer}>
            {message.reply.map((r) => (
              <Message
                key={r.id}
                message={r.message}
                username={r.username}
                date={r.date}
                rating={r.rating}
                id={r.id}
                isReply={true}
                parentId={message.id}
                reply={r.reply}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { MessageFull };
