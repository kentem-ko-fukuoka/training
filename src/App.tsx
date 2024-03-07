import { useState } from "react";
import Slideshow from "./components/Slideshow";
import MemoApp from "./components/MemoApp";

const APP_NULL = '';
const APP_MEMO_APP = 'memo-app';
const APP_SLIDESHOW = 'slideshow';

const App = () => {

  const [currentApp, setCurrentApp] = useState(APP_NULL);

  const app = (() => {

    switch (currentApp) {

      case APP_MEMO_APP:
        return <MemoApp />;

      case APP_SLIDESHOW:
        return <Slideshow />;

      default:
        return null;
    }
  })();

  return (
    <>
      <div>
        <button onClick={() => setCurrentApp(APP_MEMO_APP)}>MemoApp</button>
        <button onClick={() => setCurrentApp(APP_SLIDESHOW)}>Slideshow</button>
      </div>
      {app}
    </>
  );
}

export default App;
