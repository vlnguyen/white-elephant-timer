import React, { useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import moment from "moment";
import classNames from "classnames";
import { Recipients } from "./types/Recipients";
import { RecipientQueue } from "./components/RecipientQueue";
import { TIME_TOTAL, TIME_WARNING, TIME_DANGER } from "./App.constants";
import daBoi from "./res/charliebrown.png";
import "./App.css";

function App() {
  const [recipients, setRecipients] = useState<Recipients>(
    new Recipients([], [])
  );

  const countdownRef = React.useRef<Countdown>(null);

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
    const timeRemainingSeconds = props.total / 1000;

    const playPauseStyle = classNames({
      "App-button-play": !isActive,
      "App-button-pause": isActive,
    });

    const timerStyle = classNames("App-timer-container", {
      "App-timer-warning": timeRemainingSeconds <= TIME_WARNING,
      "App-timer-danger": timeRemainingSeconds <= TIME_DANGER,
      "App-timer-zero": timeRemainingSeconds === 0,
    });

    return (
      <div>
        <div className={timerStyle}>
          {minutes}:{seconds}
        </div>
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
        countdownRef?.current?.api?.start();
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
        {recipients.waiting.length > 0 && (
          <>
            <RecipientQueue
              recipients={recipients}
              onNext={handleNext}
              onShuffle={handleShuffle}
            />
            <div>
              <img src={daBoi} />
              <Countdown
                ref={countdownRef}
                date={moment().add(TIME_TOTAL, "seconds").toDate()}
                autoStart={false}
                renderer={handleCountdownRender}
              />
            </div>
          </>
        )}
        {recipients.waiting.length === 0 && <div>Merry Christmas!</div>}
      </div>
    </div>
  );
}

export default App;
