import { useState } from "react";
import Slideshow from "./components/Slideshow";
import TypingGame from "./components/TypingGame";

const APP_NULL = "";
const APP_SLIDESHOW = "slideshow";
const APP_TYPING_GAME = 'typing-game';

const App = () => {
  const [currentApp, setCurrentApp] = useState(APP_NULL);

  const app = (() => {
    switch (currentApp) {
      case APP_SLIDESHOW:
        return <Slideshow />;

      case APP_TYPING_GAME:
        return <TypingGame />;

      default:
        return null;
    }
  })();

  return (
    <>
      <div>
        <button onClick={() => setCurrentApp(APP_SLIDESHOW)}>Slideshow</button>
        <button onClick={() => setCurrentApp(APP_TYPING_GAME)}>TypingGame</button>
      </div>
      {app}
    </>
  );
};

export default App;
