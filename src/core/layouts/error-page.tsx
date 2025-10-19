import React from "react";

interface ErrorPageProps {
  errorMessage: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h1 className="error-title">Error loading QuickMock</h1>
      <div className="error-message">
        <p>Something went wrong while loading the diagram:</p>
        <pre>{errorMessage}</pre>
      </div>
      <div className="error-actions">
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    </div>
  );
};
