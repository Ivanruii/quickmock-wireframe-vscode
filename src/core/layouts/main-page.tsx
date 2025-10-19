import React from "react";

interface MainPageProps {
  rootId?: string;
}

export const MainPage: React.FC<MainPageProps> = ({ 
  rootId = "root" 
}) => {
  return (
    <div id={rootId}>
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading QuickMock diagram...</p>
      </div>
    </div>
  );
};