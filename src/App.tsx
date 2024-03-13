import { useState } from "react";
import Bingo from "./components/Bingo";
import Calendar from "./components/Calendar";
import MemoApp from "./components/MemoApp";
import Slideshow from "./components/Slideshow";
import TodoApp from "./components/TodoApp";

const APP_NULL = '';
const APP_SLIDESHOW = 'slideshow';
const APP_MEMO_APP = 'memo-app';
const APP_BINGO = 'bingo';
const APP_CALENDAR = 'calendar';
const APP_TODO_APP = 'todo-app';

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

      case APP_TODO_APP:
        return <TodoApp />;

      default:
        return null;
    }
  })();

  return (
    <>
      <div>
        <button onClick={() => setCurrentApp(APP_SLIDESHOW)}>Slideshow</button>
        <button onClick={() => setCurrentApp(APP_MEMO_APP)}>MemoApp</button>
        <button onClick={() => setCurrentApp(APP_BINGO)}>Bingo</button>
        <button onClick={() => setCurrentApp(APP_CALENDAR)}>Calendar</button>
        <button onClick={() => setCurrentApp(APP_TODO_APP)}>TodoApp</button>
      </div>
      {app}
    </>
  );
};

export default App;
