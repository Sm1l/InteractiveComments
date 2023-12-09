import { nanoid } from "nanoid";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TNames } from "../assets/images/avatarsArray";

export interface IMessage {
  id: string;
  username: TNames;
  date: string;
  message: string;
  rating: number;
  initialRating: number;
  reply: IMessage[] | [];
}

interface IUserState {
  messages: IMessage[];
  addNewMessage: (username: TNames, message: string) => void;
  addNewReplyMessage: (username: TNames, message: string, parentId: string) => void;
  deleteMessage: (id: string) => void;
  deleteReplyMessage: (id: string, parentId: string) => void;
  editMessage: (id: string, newMessage: string) => void;
  editReplyMessage: (id: string, parentId: string, newMessage: string) => void;
  incrementRating: (id: string) => void;
  incrementReplyRating: (id: string, parentId: string) => void;
  decrementRating: (id: string) => void;
  decrementReplyRating: (id: string, parentId: string) => void;
}

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        messages: [
          {
            id: nanoid(),
            username: "amyrobson",
            date: new Date("29 Oct 2023").toISOString(),
            message:
              "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            rating: 12,
            initialRating: 12,
            reply: [
              {
                id: nanoid(),
                username: "ramsesmiron",
                date: new Date("29 Nov 2023").toISOString(),
                message:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, nulla harum officia mollitia porro",
                rating: 2,
                initialRating: 2,
                reply: [],
              },
              {
                id: nanoid(),
                username: "juliusomo",
                date: new Date("30 Nov 2023").toISOString(),
                message: "It's my reply",
                rating: 1,
                initialRating: 1,
                reply: [],
              },
              {
                id: nanoid(),
                username: "maxblagun",
                date: new Date("30 Nov 2023").toISOString(),
                message:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, nulla harum officia mollitia porro",
                rating: 1,
                initialRating: 1,
                reply: [],
              },
            ],
          },
          {
            id: nanoid(),
            username: "ramsesmiron",
            date: new Date("3 Dec 2023").toISOString(),
            message:
              "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            rating: 5,
            initialRating: 5,
            reply: [
              {
                id: nanoid(),
                username: "ramsesmiron",
                date: new Date("5 Dec 2023").toISOString(),
                message:
                  "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                rating: 1,
                initialRating: 1,
                reply: [],
              },
              {
                id: nanoid(),
                username: "juliusomo",
                date: new Date().toISOString(),
                message:
                  "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                rating: 1,
                initialRating: 1,
                reply: [],
              },
            ],
          },
        ],

        addNewMessage: (username, message) =>
          set((state) => {
            const newMessage = {
              id: nanoid(),
              username: username,
              date: new Date().toISOString(),
              message,
              rating: 0,
              initialRating: 0,
              reply: [],
            };
            return { messages: [...state.messages, newMessage] };
          }),

        addNewReplyMessage: (username, message, parentId) =>
          set((state) => {
            const newReplyMessage = {
              id: nanoid(),
              username: username,
              date: new Date().toISOString(),
              message,
              rating: 0,
              initialRating: 0,
              reply: [],
            };
            const parentMsgIndex = state.messages.findIndex((msg) => msg.id === parentId);
            if (parentMsgIndex !== -1) {
              const updatedReplies = [...state.messages[parentMsgIndex].reply, newReplyMessage];
              const updatedParentMsg = { ...state.messages[parentMsgIndex], reply: updatedReplies };
              const updatedMessages = [...state.messages];
              updatedMessages[parentMsgIndex] = updatedParentMsg;
              return { messages: updatedMessages };
            }
            return state;
          }),

        deleteMessage: (id) =>
          set((state) => {
            return { messages: state.messages.filter((message) => message.id !== id) };
          }),

        deleteReplyMessage: (id: string, parentId: string) =>
          set((state) => {
            const parentMsgIndex = state.messages.findIndex((msg) => msg.id === parentId);
            // console.log(parentMsgIndex);

            if (parentMsgIndex !== -1) {
              const updatedReplies = state.messages[parentMsgIndex].reply?.filter((msg) => msg.id !== id) || [];
              const updatedParentMsg = { ...state.messages[parentMsgIndex], reply: updatedReplies };
              const updatedMessages = [...state.messages];
              updatedMessages[parentMsgIndex] = updatedParentMsg;
              return { messages: updatedMessages };
            }
            return state;
          }),

        editMessage: (id, newMessage) =>
          set((state) => ({
            messages: state.messages.map((m) =>
              m.id === id ? { ...m, message: newMessage, date: new Date().toISOString() } : m
            ),
          })),

        editReplyMessage: (id: string, parentId: string, newMessage: string) =>
          set((state) => {
            const parentMsgIndex = state.messages.findIndex((msg) => msg.id === parentId);
            if (parentMsgIndex !== -1) {
              const updatedReplies = state.messages[parentMsgIndex].reply?.map((msg) =>
                msg.id === id ? { ...msg, message: newMessage, date: new Date().toISOString() } : msg
              );
              const updatedParentMsg = { ...state.messages[parentMsgIndex], reply: updatedReplies };

              const updatedMessages = state.messages.map((msg, index) =>
                index === parentMsgIndex ? updatedParentMsg : msg
              );
              return { messages: updatedMessages };
            }
            return state;
          }),

        incrementRating: (id) =>
          set((state) => {
            const updatedMessages: IMessage[] = state.messages.map((message) =>
              message.id === id
                ? { ...message, rating: Math.min(message.rating + 1, message.initialRating + 1) }
                : message
            );
            return { messages: updatedMessages };
          }),

        incrementReplyRating: (id: string, parentId: string) =>
          set((state) => {
            const parentMsgIndex = state.messages.findIndex((msg) => msg.id === parentId);
            const updatedReplies = state.messages[parentMsgIndex].reply.map((msg) =>
              msg.id === id ? { ...msg, rating: Math.min(msg.rating + 1, msg.initialRating + 1) } : msg
            );
            const updatedParentMsg = { ...state.messages[parentMsgIndex], reply: updatedReplies };
            const updatedMessages = state.messages.map((msg, index) =>
              index === parentMsgIndex ? updatedParentMsg : msg
            );
            return { messages: updatedMessages };
          }),

        decrementRating: (id) =>
          set((state) => {
            const updatedMessages: IMessage[] = state.messages.map((message) =>
              message.id === id
                ? { ...message, rating: Math.max(message.rating - 1, message.initialRating - 1) }
                : message
            );
            return { messages: updatedMessages };
          }),

        decrementReplyRating: (id: string, parentId: string) =>
          set((state) => {
            const parentMsgIndex = state.messages.findIndex((msg) => msg.id === parentId);
            const updatedReplies = state.messages[parentMsgIndex].reply.map((msg) =>
              msg.id === id ? { ...msg, rating: Math.max(msg.rating - 1, msg.initialRating - 1) } : msg
            );
            const updatedParentMsg = { ...state.messages[parentMsgIndex], reply: updatedReplies };
            const updatedMessages = state.messages.map((msg, index) =>
              index === parentMsgIndex ? updatedParentMsg : msg
            );
            return { messages: updatedMessages };
          }),
      }),
      { name: "userStore" }
    )
  )
);
