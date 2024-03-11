import { useState } from "react";
import Slideshow from "./components/Slideshow";
import MemoApp from "./components/MemoApp";
import Bingo from "./components/Bingo";

const APP_NULL = '';
const APP_SLIDESHOW = 'slideshow';
const APP_MEMO_APP = 'memo-app';
const APP_BINGO = 'bingo';

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
      </div>
      {app}
    </>
  );
};

export default App;
