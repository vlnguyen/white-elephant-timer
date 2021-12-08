import { Recipients } from "../types/Recipients";

interface IRecipientQueue {
  recipients: Recipients;
}

export const RecipientQueue: React.FC<IRecipientQueue> = ({ recipients }) => {
  return (
    <div className="App-recipient-queue">
      {recipients.waiting.length > 0 && (
        <div>
          <label>Picking:</label>
          <div>{recipients.waiting[0]}</div>
        </div>
      )}
      {recipients.waiting.length > 1 && (
        <div>
          <label>On deck:</label>
          <div>{recipients.waiting[1]}</div>
        </div>
      )}
    </div>
  );
};
