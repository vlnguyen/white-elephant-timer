import Countdown, { CountdownRenderProps } from "react-countdown";
import moment from "moment";
import "./App.css";

function App() {
  function handleCountdownRender(props: CountdownRenderProps) {
    const { minutes, seconds } = props.formatted;
    return (
      <div>
        {minutes}:{seconds}
      </div>
    );
  }

  return (
    <div className="App">
      <div className="App-content">
        <Countdown
          date={moment().add(60, "seconds").toDate()}
          renderer={handleCountdownRender}
        />
      </div>
    </div>
  );
}

export default App;
