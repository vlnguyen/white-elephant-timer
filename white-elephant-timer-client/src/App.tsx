import Countdown, { CountdownRenderProps }  from 'react-countdown';
import './App.css';

function App() {
  
  function handleCountdownRender(props: CountdownRenderProps) {
    const { minutes, seconds } = props.formatted;
    return <div>{minutes}:{seconds}</div>;
  }

  return (
    <div className="App">
      <div className="App-content">
          <Countdown date={Date.now() + 60000} renderer={handleCountdownRender} />
      </div>
    </div>
  );
}

export default App;
