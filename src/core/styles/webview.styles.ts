/**
 * Base styles for VS Code theming and common elements
 */
export const baseStyles = `
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: var(--vscode-font-family);
    font-size: var(--vscode-font-size);
    background-color: var(--vscode-editor-background);
    color: var(--vscode-editor-foreground);
    overflow: hidden;
  }
`;

/**
 * Loading spinner animations and container styles
 */
export const loadingStyles = `
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--vscode-progressBar-background, #333);
    border-top: 4px solid var(--vscode-progressBar-foreground, #007acc);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

/**
 * Error page styles
 */
export const errorStyles = `
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    padding: 2rem;
  }
  
  .error-icon {
    font-size: 3rem;
    color: var(--vscode-errorForeground);
    margin-bottom: 1rem;
  }
  
  .error-title {
    color: var(--vscode-errorForeground);
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  .error-message {
    color: var(--vscode-foreground);
    margin-bottom: 2rem;
    max-width: 600px;
  }
  
  .error-message pre {
    background: var(--vscode-textCodeBlock-background);
    padding: 1rem;
    border-radius: 4px;
    text-align: left;
    overflow-x: auto;
    white-space: pre-wrap;
    border: 1px solid var(--vscode-widget-border);
  }
  
  .error-actions button {
    background: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
  }
  
  .error-actions button:hover {
    background: var(--vscode-button-hoverBackground);
  }
`;

/**
 * Combine all styles
 */
export const getAllStyles = (): string => {
  return [baseStyles, loadingStyles, errorStyles].join("\n");
};
