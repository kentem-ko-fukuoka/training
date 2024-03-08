import { useState } from "react";
import Slideshow from "./components/Slideshow";
import Calendar from "./components/Calendar";

const APP_NULL = '';
const APP_SLIDESHOW = 'slideshow';
const APP_CALENDAR = 'calendar';

const App = () => {

  const [currentApp, setCurrentApp] = useState(APP_NULL);

  const app = (() => {

    switch (currentApp) {

      case APP_SLIDESHOW:
        return <Slideshow />;

      case APP_CALENDAR:
        return <Calendar />;

      default:
        return null;
    }
  })();

  return (
    <>
      <div>
        <button onClick={() => setCurrentApp(APP_SLIDESHOW)}>Slideshow</button>
        <button onClick={() => setCurrentApp(APP_CALENDAR)}>Calendar</button>
      </div>
      {app}
    </>
  );
}

export default App;
