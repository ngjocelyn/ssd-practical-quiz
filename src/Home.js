import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import logo from "./logo.svg";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // SQL injection validation - detects common SQL injection patterns
  const validateSqlInjection = (input) => {
    const sqlPatterns = [
      /(\bOR\b.*=.*)|(\bAND\b.*=.*)/gi,
      /\bUNION\b\s+\bSELECT\b/i,
      /(--|#|\/\*)/,
      /['"`]\s*(OR|AND)\s+['"`]?\d+=\d+/i,
      /["';]\s*\b(DROP|DELETE|INSERT|UPDATE)\b/i,
      /\b(WAITFOR|DELAY)\b/gi,
      /\bEXEC(\s+|\()/i,
    ];
    return sqlPatterns.some((pattern) => pattern.test(input));
  };

  const validateXSS = (input) => {
    const sanitized = DOMPurify.sanitize(input);
    return sanitized !== input; // true if input had XSS
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSqlInjection(searchTerm)) {
      setErrorMessage(
        "SQL Injection detected! Please enter a safe search term."
      );
      return;
    }
    if (validateXSS(searchTerm)) {
      setErrorMessage("Please enter a safe search term.");
      return;
    }
    navigate("/result", { state: { searchTerm } });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter search term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* Conditionally show error */}
        {errorMessage && (
          <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
        )}
      </header>
    </div>
  );
}

export default Home;
