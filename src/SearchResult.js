import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          You searched for: <strong>{state?.searchTerm}</strong>
        </p>
        <button onClick={() => navigate("/")}>Return to Home</button>
      </header>
    </div>
  );
}

export default SearchResult;
// 2301930@SIT.singaporetech.edu.sg