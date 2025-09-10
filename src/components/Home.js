import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="jumbotron text-center">
      <h1 className="display-4">Welcome to Problem Solution App</h1>
      <p className="lead">
        A platform to store and search programming problems and their solutions in different languages.
      </p>
      <hr className="my-4" />
      <p>
        You can add new problems, search for existing ones, and contribute solutions in various programming languages.
      </p>
      <Link to="/problems" className="btn btn-primary btn-lg me-2">
        Browse Problems
      </Link>
      <Link to="/add-problem" className="btn btn-success btn-lg">
        Add New Problem
      </Link>
    </div>
  );
};

export default Home;