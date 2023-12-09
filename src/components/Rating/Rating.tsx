import React from "react";

import styles from "./Rating.module.scss";
import { useUserStore } from "../../store/usersStore";
import { IMessage } from "../../store/usersStore";

// type RatingProps = Pick<IMessage, "id" | "rating">;
interface RatingProps extends Pick<IMessage, "id" | "rating"> {
  disabled?: boolean;
  isReply: boolean;
  parentId?: string;
}
// interface RatingProps {
//   rating: number;
//   id?: string;
// }

const Rating: React.FC<RatingProps> = ({ id, rating, disabled, isReply, parentId }) => {
  const incrementRating = useUserStore((store) => store.incrementRating);
  const decrementRating = useUserStore((store) => store.decrementRating);
  const incrementReplyRating = useUserStore((store) => store.incrementReplyRating);
  const decrementReplyRating = useUserStore((store) => store.decrementReplyRating);

  const handleIncrementRating = () => {
    if (!isReply) {
      incrementRating(id);
    } else {
      parentId && incrementReplyRating(id, parentId);
    }
  };

  const handleDecrementRating = () => {
    if (!isReply) {
      decrementRating(id);
    } else {
      parentId && decrementReplyRating(id, parentId);
    }
  };

  return (
    <div className={styles.rating}>
      <button className={styles.button} onClick={handleIncrementRating} disabled={disabled}>
        +
      </button>
      <div className={styles.text}>{rating}</div>

      <button className={styles.button} onClick={handleDecrementRating} disabled={disabled}>
        -
      </button>
    </div>
  );
};

export { Rating };
