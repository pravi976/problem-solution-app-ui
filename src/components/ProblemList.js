import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/problems');
      setProblems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching problems:', error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      fetchProblems();
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/problems/search?keyword=${searchTerm}`);
      setProblems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error searching problems:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Programming Problems</h2>
      
      <div className="row search-bar">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : problems.length === 0 ? (
        <div className="alert alert-info">No problems found. Try a different search term or add a new problem.</div>
      ) : (
        <div className="row">
          {problems.map((problem) => (
            <div className="col-md-6" key={problem.id}>
              <div className="card problem-card">
                <div className="card-body">
                  <h5 className="card-title">{problem.title}</h5>
                  <p className="card-text">
                    {problem.description.length > 150
                      ? `${problem.description.substring(0, 150)}...`
                      : problem.description}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/problems/${problem.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    <span className="badge bg-info">{problem.solutions.length} solutions</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemList;