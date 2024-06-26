import { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Bingo from "./components/Bingo";
import Calendar from "./components/Calendar";
import MemoApp from "./components/MemoApp";
import NumbersGame from "./components/NumbersGame";
import Slideshow from "./components/Slideshow";
import SlotMachine from "./components/SlotMachine";
import Stopwatch from "./components/Stopwatch";
import TodoApp from "./components/TodoApp";
import TypingGame from "./components/TypingGame";
import BingoMachine from "./components/BingoMachine";
import TreeView from "./components/Tree";

const APP_NULL          = '';
const APP_BINGO         = 'bingo';
const APP_BINGO_MACHINE = 'bing-machine';
const APP_CALENDAR      = 'calendar';
const APP_MEMO_APP      = 'memo-app';
const APP_NUMBERS_GAME  = 'numbers-game';
const APP_SLIDESHOW     = 'slideshow';
const APP_SLOT_MACHINE  = 'slot-machine';
const APP_STOPWATCH     = 'stopwatch';
const APP_TODO_APP      = 'todo-app';
const APP_TREE          = 'tree';
const APP_TYPING_GAME   = 'typing-game';

const App = () => {

  const [currentApp, setCurrentApp] = useState(APP_NULL);

  const app = (() => {

    switch (currentApp) {

      case APP_BINGO:
        return <Bingo />;

      case APP_BINGO_MACHINE:
        return <BingoMachine />;

      case APP_CALENDAR:
        return <Calendar />;

      case APP_MEMO_APP:
        return <MemoApp />;

      case APP_NUMBERS_GAME:
        return <NumbersGame />;

      case APP_SLIDESHOW:
        return <Slideshow />;

      case APP_SLOT_MACHINE:
        return <SlotMachine />;

      case APP_STOPWATCH:
        return <Stopwatch />;

      case APP_TODO_APP:
        return <TodoApp />;

      case APP_TREE:
        return <TreeView />;

      case APP_TYPING_GAME:
        return <TypingGame />;

      default:
        // return null;
        return <TreeView />;
    }
  })();

  return (
    <>
      <Global $isStopwach={currentApp === APP_STOPWATCH} />
      <div>
        <button onClick={() => setCurrentApp(APP_BINGO)}>Bingo</button>
        <button onClick={() => setCurrentApp(APP_BINGO_MACHINE)}>BingoMachine</button>
        <button onClick={() => setCurrentApp(APP_CALENDAR)}>Calendar</button>
        <button onClick={() => setCurrentApp(APP_MEMO_APP)}>MemoApp</button>
        <button onClick={() => setCurrentApp(APP_NUMBERS_GAME)}>NumbersGame</button>
        <button onClick={() => setCurrentApp(APP_SLIDESHOW)}>Slideshow</button>
        <button onClick={() => setCurrentApp(APP_SLOT_MACHINE)}>SlotMachine</button>
        <button onClick={() => setCurrentApp(APP_STOPWATCH)}>Stopwatch</button>
        <button onClick={() => setCurrentApp(APP_TODO_APP)}>TodoApp</button>
        <button onClick={() => setCurrentApp(APP_TREE)}>TreeView</button>
        <button onClick={() => setCurrentApp(APP_TYPING_GAME)}>TypingGame</button>
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