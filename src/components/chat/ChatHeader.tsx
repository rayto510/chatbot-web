import { useChatStore } from '../../store/chat';
import { useElapsedTimer } from '../../hooks/useElapsedTimer';

export default function ChatHeader() {
  const { reset, close } = useChatStore();
  const { elapsed, reset: resetTimer } = useElapsedTimer();

  const onReset = () => {
    reset();
    resetTimer();
  };

  const onClose = () => {
    // per requirements, reset timer when closing
    resetTimer();
    close();
  };

  return (
    <div className="chat-header" role="toolbar" aria-label="Chat header">
      <div className="chat-header-left">Chatbot</div>
      <div className="chat-header-center" aria-live="polite" aria-atomic>
        Elapsed: {elapsed}s
      </div>
      <div className="chat-header-right">
        <button className="chat-btn" onClick={onReset} aria-label="Reset chat">
          Reset
        </button>
        <button className="chat-btn" onClick={onClose} aria-label="Close chat">
          Close
        </button>
      </div>
    </div>
  );
}
