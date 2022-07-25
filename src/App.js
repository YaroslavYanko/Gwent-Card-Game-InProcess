import BattleMap from "./page/BattleMap";
import "./index.css";
import { DeckCardProvider } from "./context/DeckCardContext";

function App() {
  return (
    <DeckCardProvider>
      <div className="App">
        <BattleMap />
      </div>
    </DeckCardProvider>
  );
}

export default App;
