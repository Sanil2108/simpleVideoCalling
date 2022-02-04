import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Host from './pages/Host/Host';
import Participant from './pages/Participant/Participant';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Host />} />
            <Route path="/:meetingId" element={<Participant />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
