// import { motion } from "framer-motion";
import React, { useEffect } from "react";

import styles from "./Modal.module.scss";

import CrossRound from "../../assets/images/icons/cross-round.svg";
import { Button } from "../Button";
import { useUserStore } from "../../store/usersStore";

interface ModalProps {
  modalIsVisible: boolean;
  setModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  isReply: boolean;
  parentId?: string;
}

const Modal: React.FC<ModalProps> = ({ modalIsVisible, setModalIsVisible, id, parentId, isReply }) => {
  const closeModalHandleClick = () => {
    setModalIsVisible(false);
  };

  //*disable scroll
  useEffect(() => {
    if (modalIsVisible) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalIsVisible]);

  //*close modal "Escape"
  useEffect(() => {
    const escCloseModal = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        closeModalHandleClick();
      }
    };
    if (modalIsVisible) {
      window.addEventListener("keydown", escCloseModal);
    }
    return () => {
      window.removeEventListener("keydown", escCloseModal);
    };
  }, [modalIsVisible]);

  //*delete

  const deleteMessage = useUserStore((state) => state.deleteMessage);
  const deleteReplyMessage = useUserStore((state) => state.deleteReplyMessage);

  const deleteHandleCLick = () => {
    if (!isReply) {
      deleteMessage(id);
    } else {
      parentId && deleteReplyMessage(id, parentId);
    }
  };

  return (
    <div className={styles.overlay} onClick={closeModalHandleClick}>
      <div className={styles.container} onClick={(e: React.SyntheticEvent<EventTarget>) => e.stopPropagation()}>
        <h2 className={styles.title}>Delete comment</h2>
        <p className={styles.text}>
          Are you shure to want to delete this comment?
          <br /> This will remove the comment and can't be undone.
        </p>
        <button className={styles.close} onClick={closeModalHandleClick}>
          <img className={styles.svg} src={CrossRound} alt="close button" />
        </button>
        <div className={styles.buttonsContainer}>
          <Button text="no,cancel" type="button" color="grey" onClick={closeModalHandleClick} />
          <Button text="yes,delete" type="button" color="red" onClick={deleteHandleCLick} />
        </div>
      </div>
    </div>
  );
};

export { Modal };
