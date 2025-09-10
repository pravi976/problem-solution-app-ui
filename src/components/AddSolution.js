import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddSolution = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const languages = [
    'Java', 'Python', 'JavaScript', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Go', 'Kotlin', 'TypeScript', 'Rust'
  ];

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/problems/${id}`);
        setProblem(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setError('Failed to load problem details');
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!language || !code.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      await axios.post(`http://localhost:8080/api/solutions/problem/${id}`, {
        language,
        code
      });

      setSubmitting(false);
      navigate(`/problems/${id}`);
    } catch (error) {
      console.error('Error adding solution:', error);
      setError('Failed to add solution. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !submitting) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!problem) {
    return <div className="alert alert-warning">Problem not found</div>;
  }

  return (
    <div>
      <h2 className="mb-4">Add Solution</h2>
      <div className="card mb-4">
        <div className="card-header">Problem: {problem.title}</div>
        <div className="card-body">
          <p>{problem.description}</p>
        </div>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">Programming Language</label>
          <select
            className="form-select"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          >
            <option value="">Select a language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-3">
          <label htmlFor="code" className="form-label">Solution Code</label>
          <textarea
            className="form-control font-monospace"
            id="code"
            rows="15"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          ></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : (
            'Add Solution'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddSolution;