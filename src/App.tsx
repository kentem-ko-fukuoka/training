import { useState } from "react";
import Slideshow from "./components/Slideshow";
import Stopwatch from "./components/Stopwatch";
import { createGlobalStyle } from "styled-components";

const APP_NULL = '';
const APP_SLIDESHOW = 'slideshow';
const APP_STOPWATCH = 'stopwatch';

const App = () => {

  const [currentApp, setCurrentApp] = useState(APP_NULL);

  const app = (() => {

    switch (currentApp) {

      case APP_SLIDESHOW:
        return <Slideshow />;

      case APP_STOPWATCH:
        return <Stopwatch />;

      default:
        return null;
    }
  })();

  return (
    <>
      <Global $isStopwach={currentApp === APP_STOPWATCH} />
      <div>
        <button onClick={() => setCurrentApp(APP_SLIDESHOW)}>Slideshow</button>
        <button onClick={() => setCurrentApp(APP_STOPWATCH)}>Stopwatch</button>
      </div>
      {app}
    </>
  );
}

export default App;

const Global = createGlobalStyle<{ $isStopwach: boolean }>`
  body {
    background-color: ${(props) => props.$isStopwach ? '#eee' : 'white'};
    margin: 0;
  }
`;