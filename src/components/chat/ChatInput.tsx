import { useChatInput } from '../../hooks/useChatInput';

export default function ChatInput() {
  const { value, setValue, doSend, handleKeyDown } = useChatInput();

  return (
    <div className="chat-input">
      <input
        aria-label="Type a message"
        placeholder="Type a message…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="send-btn" onClick={doSend} aria-label="Send message">
        Send
      </button>
    </div>
  );
}
