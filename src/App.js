import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import ProblemList from './components/ProblemList';
import ProblemDetail from './components/ProblemDetail';
import AddProblem from './components/AddProblem';
import AddSolution from './components/AddSolution';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problems" element={<ProblemList />} />
            <Route path="/problems/:id" element={<ProblemDetail />} />
            <Route path="/add-problem" element={<AddProblem />} />
            <Route path="/problems/:id/add-solution" element={<AddSolution />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;