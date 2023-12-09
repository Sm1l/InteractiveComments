import React, { useState } from "react";

import { getAvatar } from "../../assets/images/avatarsArray";
import { ButtonTwo } from "../ButtonTwo";
import { Container } from "../Container";
import { EditForm } from "../EditForm";
import { Rating } from "../Rating";

import iconDelete from "../../assets/images/icons/icon-delete.svg";
import iconEdit from "../../assets/images/icons/icon-edit.svg";
import iconReplyArrow from "../../assets/images/icons/icon-reply.svg";

import { formatDate } from "../../helpers/formatDate";
import { IMessage } from "../../store/usersStore";

import { Add } from "../Add";
import { Modal } from "../Modal";
import styles from "./Message.module.scss";

// type TMessage = Omit<IMessage, "initialRating">;
// interface IMessageProps extends Omit<IMessage, "initialRating"> {
//   isReply: false;
// }
// interface IMessageReplyProps extends Omit<IMessage, "initialRating"> {
//   isReply: true;
//   parentId: string;
// }

// type MessageProps = IMessageProps | IMessageReplyProps;
interface MessageProps extends Omit<IMessage, "initialRating"> {
  isReply: boolean;
  parentId?: string;
}
// type MessageProps = Omit<IMessage, "initialRating">;

// const isMessageReply = (msg: any): msg is IMessageReplyProps => parentId in msg;

const Message: React.FC<MessageProps> = ({ id, date, message, username, rating, isReply, parentId }) => {
  const you: boolean = username === "juliusomo";
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [showReply, setShowReply] = useState<boolean>(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const replyHandleCLick = () => {
    setShowReply(!showReply);
  };

  const deleteHandleCLick = () => {
    setModalIsVisible(true);
  };

  const editHandleCLick = () => {
    setIsEditable(!isEditable);
  };

  return (
    <>
      <div className={styles.messageAll}>
        <Container>
          <div className={styles.message}>
            <div className={styles.ratingContainer}>
              {you ? (
                <Rating rating={rating} id="" disabled={true} isReply={isReply} />
              ) : (
                <Rating rating={rating} id={id} isReply={isReply} parentId={parentId} />
              )}
            </div>
            <div className={styles.messageInfo}>
              {/* <div className={styles.messageHeader}> */}
              <div className={styles.nameContainer}>
                <img className={styles.image} src={getAvatar(username)} alt={username} />
                <h2 className={styles.username}>
                  {username}
                  {you && <span className={styles.you}>you</span>}
                </h2>
                <p className={styles.date}>{isChanged ? `Изменено ${formatDate(date)}` : formatDate(date)}</p>
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              {you ? (
                <>
                  <ButtonTwo text="delete" img={iconDelete} handleClick={deleteHandleCLick} color="red" />
                  <ButtonTwo text="edit" img={iconEdit} handleClick={editHandleCLick} />{" "}
                </>
              ) : (
                <ButtonTwo text="reply" img={iconReplyArrow} handleClick={replyHandleCLick} />
              )}
            </div>
            <div className={styles.messageText}>
              {isEditable ? (
                <EditForm
                  message={message}
                  id={id}
                  setIsEditable={setIsEditable}
                  isReply={isReply}
                  parentId={parentId}
                  setIsChanged={setIsChanged}
                />
              ) : (
                <p className={styles.text}>{message}</p>
              )}
            </div>
          </div>
        </Container>
        {showReply && (
          <Add isReplyMessage={true} setShowReply={setShowReply} id={id} parentId={parentId} username={username} />
        )}
      </div>
      {modalIsVisible && (
        <Modal
          modalIsVisible={modalIsVisible}
          setModalIsVisible={setModalIsVisible}
          id={id}
          parentId={parentId}
          isReply={isReply}
        />
      )}
    </>
  );
};

export { Message };
