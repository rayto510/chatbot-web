import { useChatStore } from '../../store/chat';
import { useAutoScroll } from '../../hooks/useAutoScroll';

export default function ChatMessages() {
  const messages = useChatStore((s) => s.messages);
  const bottomRef = useAutoScroll(messages.length);

  const hasMessages = messages.length > 0;

  return (
    <div
      className={`chat-messages ${!hasMessages ? 'empty' : ''}`}
      role="list"
      aria-label="Messages"
    >
      {!hasMessages ? (
        <div className="chat-placeholder" role="note">
          👋 Hi there! Type a message below to start the conversation.
        </div>
      ) : (
        messages.map((m) => (
          <div
            key={m.id}
            role="listitem"
            className={`chat-bubble ${m.role === 'user' ? 'right' : 'left'}`}
          >
            <div className="chat-bubble-text">{m.text}</div>
          </div>
        ))
      )}
      <div ref={bottomRef} />
    </div>
  );
}
