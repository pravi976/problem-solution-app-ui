import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/problems/${id}`);
        setProblem(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem details:', error);
        setError('Failed to load problem details');
        setLoading(false);
      }
    };

    fetchProblem();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!problem) {
    return <div className="alert alert-warning">Problem not found</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{problem.title}</h2>
        <Link to={`/problems/${problem.id}/add-solution`} className="btn btn-success">
          Add Solution
        </Link>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-light">Problem Description</div>
        <div className="card-body">
          <p className="card-text">{problem.description}</p>
        </div>
      </div>

      <h3 className="mb-3">Solutions ({problem.solutions.length})</h3>

      {problem.solutions.length === 0 ? (
        <div className="alert alert-info">No solutions available yet. Be the first to add one!</div>
      ) : (
        problem.solutions.map((solution) => (
          <div className="card solution-card" key={solution.id}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>Language: <strong>{solution.language}</strong></span>
            </div>
            <div className="card-body p-0">
              <SyntaxHighlighter
                language={solution.language.toLowerCase()}
                style={vscDarkPlus}
                className="code-block"
                showLineNumbers
              >
                {solution.code}
              </SyntaxHighlighter>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProblemDetail;