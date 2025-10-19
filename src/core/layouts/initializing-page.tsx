import React from "react";

export const InitializingPage: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Initializing QuickMock viewer...</p>
    </div>
  );
};