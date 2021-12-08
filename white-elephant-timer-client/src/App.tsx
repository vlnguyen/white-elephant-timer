import React, { useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import moment from "moment";
import classNames from "classnames";
import { Recipients } from "./types/Recipients";
import { RecipientQueue } from "./components/RecipientQueue";
import "./App.css";

function App() {
  const [recipients, setRecipients] = useState<Recipients>(
    new Recipients([], [])
  );

  React.useEffect(() => {
    fetch("/recipients")
      .then((resp) => resp.json())
      .then((data) =>
        setRecipients(new Recipients(data.waiting, data.received))
      );
  }, []);

  const handleCountdownRender = (props: CountdownRenderProps) => {
    const { minutes, seconds } = props.formatted;
    const { pause, start, stop, isPaused, isStopped, isStarted, isCompleted } =
      props.api;

    const isActive =
      isStarted() && !isCompleted() && (!isPaused() || !isStopped());

    const playPauseStyle = classNames({
      "App-button-play": !isActive,
      "App-button-pause": isActive,
    });

    return (
      <div>
        {minutes}:{seconds}
        <div>
          <div className="App-button-container">
            <button
              className={playPauseStyle}
              onClick={() => (isActive ? pause() : start())}
            >
              {isActive ? "Pause" : "Start"}
            </button>
            <button className="App-button-stop" onClick={() => stop()}>
              Stop
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleNext = () => {
    fetch("/next", { method: "POST" })
      .then((resp) => resp.json())
      .then((data) => {
        setRecipients(new Recipients(data.waiting, data.received));
      });
  };

  const handleShuffle = () => {
    fetch("/shuffle", { method: "POST" })
      .then((resp) => resp.json())
      .then((data) => {
        setRecipients(new Recipients(data.waiting, data.received));
      });
  };

  return (
    <div className="App">
      <div className="App-content">
        <RecipientQueue
          recipients={recipients}
          onNext={handleNext}
          onShuffle={handleShuffle}
        />
        <Countdown
          date={moment().add(60, "seconds").toDate()}
          autoStart={false}
          renderer={handleCountdownRender}
        />
      </div>
    </div>
  );
}

export default App;
