import { Recipients } from "../types/Recipients";

interface IRecipientQueue {
  recipients: Recipients;
  onNext?: () => void;
  onShuffle?: () => void;
}

export const RecipientQueue: React.FC<IRecipientQueue> = ({
  recipients,
  onNext,
  onShuffle,
}) => {
  if (recipients.waiting.length === 0) {
    return null;
  }
  return (
    <div className="App-recipient-queue">
      <div>
        <label>Picking:</label>
        <div>{recipients.waiting[0]}</div>
      </div>
      {recipients.waiting.length > 1 && (
        <div>
          <label>On deck:</label>
          <div>{recipients.waiting[1]}</div>
        </div>
      )}
      <div>
        <label>Remaining:</label>
        <div>{recipients.waiting.length}</div>
      </div>
      <div className="App-button-container">
        <button className="App-button-next" onClick={onNext}>
          Next
        </button>
        <button className="App-button-next" onClick={onShuffle}>
          Shuffle
        </button>
      </div>
    </div>
  );
};
