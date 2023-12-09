import React, { useState } from "react";

import styles from "./Add.module.scss";
import { Container } from "../Container";
import { Button } from "../Button";
import { getAvatar } from "../../assets/images/avatarsArray";
import { useUserStore } from "../../store/usersStore";

interface AddProps {
  isReplyMessage: boolean;
  setIsNewMessage?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReply?: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  parentId?: string;
  username?: string;
}

const Add: React.FC<AddProps> = ({ isReplyMessage, setIsNewMessage, setShowReply, id, parentId, username }) => {
  const [text, setText] = useState(isReplyMessage ? `@${username}, ` : "");

  const addNewMessage = useUserStore((state) => state.addNewMessage);
  const addNewReplyMessage = useUserStore((state) => state.addNewReplyMessage);
  //?приходит либо id либо parentId

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const sendMessage = () => {
    if (text.trim()) {
      if (!isReplyMessage) {
        setIsNewMessage && setIsNewMessage(true);
        addNewMessage("juliusomo", text);
        setText("");
      } else {
        parentId && addNewReplyMessage("juliusomo", text, parentId);
        id && addNewReplyMessage("juliusomo", text, id);
        setShowReply && setShowReply(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Если нажата клавиша Enter и не удерживается Shift
    if (e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
  };

  return (
    <Container>
      <form className={styles.add} onSubmit={handleSubmit}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={getAvatar("juliusomo")} alt="avatar" />
        </div>
        <textarea
          className={styles.input}
          rows={4}
          placeholder="Add a comment..."
          value={text}
          onChange={handleChange}
          onKeyUp={handleKeyPress}
        ></textarea>
        <div className={styles.buttonContainer}>
          <Button type="submit" text="send"></Button>
        </div>
      </form>
    </Container>
  );
};

export { Add };
