import React, { useState } from "react";

import styles from "./Main.module.scss";
import { Add } from "../Add";
import { MessagesContainer } from "../MessagesContainer";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  // Состояние, отслеживающее, было ли создано новое сообщение
  const [isNewMessage, setIsNewMessage] = useState<boolean>(true);
  return (
    <main className={styles.main}>
      <MessagesContainer isNewMessage={isNewMessage} setIsNewMessage={setIsNewMessage} />
      <Add isReplyMessage={false} setIsNewMessage={setIsNewMessage} />
    </main>
  );
};

export { Main };
