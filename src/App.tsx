import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Bingo from "./components/Bingo";
import Calendar from "./components/Calendar";
import MemoApp from "./components/MemoApp";
import Slideshow from "./components/Slideshow";
import SlotMachine from "./components/SlotMachine";
import Stopwatch from "./components/Stopwatch";

const APP_NULL = '';
const APP_SLIDESHOW = 'slideshow';
const APP_STOPWATCH = 'stopwatch';
const APP_MEMO_APP = 'memo-app';
const APP_BINGO = 'bingo';
const APP_CALENDAR = 'calendar';
const APP_SLOT_MACHINE = 'slot-machine';

const App = () => {

  const [currentApp, setCurrentApp] = useState(APP_NULL);

  const app = (() => {

    switch (currentApp) {

      case APP_SLIDESHOW:
        return <Slideshow />;

      case APP_MEMO_APP:
        return <MemoApp />;

      case APP_BINGO:
        return <Bingo />;

      case APP_CALENDAR:
        return <Calendar />;

      case APP_SLOT_MACHINE:
        return <SlotMachine />;

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
        <button onClick={() => setCurrentApp(APP_MEMO_APP)}>MemoApp</button>
        <button onClick={() => setCurrentApp(APP_BINGO)}>Bingo</button>
        <button onClick={() => setCurrentApp(APP_CALENDAR)}>Calendar</button>
        <button onClick={() => setCurrentApp(APP_SLOT_MACHINE)}>SlotMachine</button>
        <button onClick={() => setCurrentApp(APP_STOPWATCH)}>Stopwatch</button>
      </div>
      {app}
    </>
  );
};

export default App;

const Global = createGlobalStyle<{ $isStopwach: boolean }>`
  body {
    background-color: ${(props) => props.$isStopwach ? '#eee' : 'white'};
    margin: 0;
  }
`;