import Countdown, { CountdownRenderProps } from "react-countdown";
import moment from "moment";
import classNames from "classnames";
import "./App.css";

function App() {
  function handleCountdownRender(props: CountdownRenderProps) {
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
  }

  return (
    <div className="App">
      <div className="App-content">
        <div className="App-recipient-queue">Hello, World!</div>
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
