import { useState } from "react";
import Slideshow from "./components/Slideshow";

const APP_NULL = "";
const APP_SLIDESHOW = "slideshow";

const App = () => {
  const [currentApp, setCurrentApp] = useState(APP_NULL);

  const app = (() => {
    switch (currentApp) {
      case APP_SLIDESHOW:
        return <Slideshow />;

      default:
        return null;
    }
  })();

  return (
    <>
      <div>
        <button onClick={() => setCurrentApp(APP_SLIDESHOW)}>Slideshow</button>
      </div>
      {app}
    </>
  );
};

export default App;
