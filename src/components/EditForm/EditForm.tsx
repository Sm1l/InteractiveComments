import React, { useState } from "react";

import styles from "./EditForm.module.scss";
import { Button } from "../Button";
import { useUserStore } from "../../store/usersStore";

interface EditFormProps {
  message: string;
  id: string;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  isReply: boolean;
  parentId?: string; //!чтобы он был обязательным в зависимости от isReply
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

// type EditFormPropsWithParentId = EditFormProps & (EditFormProps["isReply"] extends true ? { parentId: string } : {});

const EditForm: React.FC<EditFormProps> = ({ message, id, setIsEditable, isReply, parentId, setIsChanged }) => {
  const [editedMessage, setEditedMessage] = useState(message);

  const editMessage = useUserStore((state) => state.editMessage);
  const editReplyMessage = useUserStore((state) => state.editReplyMessage);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isReply) {
      editMessage(id, editedMessage);
    } else {
      parentId && editReplyMessage(id, parentId, editedMessage);
    }
    setIsEditable(false);
    setIsChanged(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedMessage(e.target.value);
  };

  return (
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <textarea
        className={styles.edit}
        rows={4}
        placeholder="Add a comment..."
        value={editedMessage}
        onChange={handleChange}
        // onKeyUp={handleKeyPress}
      ></textarea>
      <div className={styles.butttonsContainer}>
        <Button type="button" text="cancel" color="red" onClick={() => setIsEditable(false)}></Button>
        <Button type="submit" text="edit"></Button>
      </div>
    </form>
  );
};

export { EditForm };
