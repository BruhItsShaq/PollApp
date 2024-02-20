import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VotingPage from "./components/VotingPage";
import ConfirmationPage from "./components/ConfirmationPage";

function App() {
  const pollId = 1; //pollId set to be passed as a prop
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<VotingPage />} />
          <Route path="/confirmation" element={<ConfirmationPage pollId={pollId} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
