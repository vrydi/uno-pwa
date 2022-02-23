import './App.css';
import { DeckProvider } from "./contexts/DeckContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GameProvider } from "./contexts/GameContext";
import { GameField } from "./components/GameField";
import { HashRouter, Route, Switch } from "react-router-dom";
import { NavbarBase } from "./components/Navigation";
import { PlayerProvider } from "./contexts/PlayersContext";
import { HomePage } from "./components/HomePage";

function App() {
  return (
    <HashRouter>
      <DeckProvider>
        <PlayerProvider>
          <GameProvider>
            <div className="App bg-dark" style={{ minHeight: '100vh' }}>
              <Switch>
                <Route exact path={'/'}>
                  <NavbarBase />
                  <HomePage />
                </Route>
                <Route exact path={'/game'}>
                  <NavbarBase />
                  <GameField />
                </Route>
              </Switch>
            </div>
          </GameProvider>
        </PlayerProvider>
      </DeckProvider>
    </HashRouter>
  );
}

export default App;
