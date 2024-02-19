import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VotingPage from "./components/VotingPage";
import ConfirmationPage from "./components/ConfirmationPage";

function App() {
  const pollId = 1; //pollId set to be passed as a prop
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <VotingPage pollId={pollId} />
          </Route>
          <Route path="/confirmation">
            <ConfirmationPage pollId={pollId} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
