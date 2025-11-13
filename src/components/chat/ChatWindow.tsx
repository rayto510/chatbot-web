import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChatStore } from '../../store/chat';

export default function ChatWindow() {
  const { isOpen, open } = useChatStore();

  if (!isOpen) {
    return (
      <button className="chat-launcher" onClick={open} aria-label="Open chat">
        Open Chat
      </button>
    );
  }

  return (
    <div
      className="chat-container"
      role="dialog"
      aria-label="Chatbot"
      aria-modal={false}
    >
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
