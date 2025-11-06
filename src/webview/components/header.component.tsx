import React from "react";
import { QuickMockDocument } from "@/core/model";

interface HeaderProps {
  document: QuickMockDocument;
  selectedPageIndex: number;
  onPageChange: (pageIndex: number) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onResetZoom: () => void;
  onFitToScreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  document,
  selectedPageIndex,
  onPageChange,
  zoom,
  onZoomChange,
  onResetZoom,
  onFitToScreen,
}) => {
  const currentPage = document.pages[selectedPageIndex];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "48px",
        backgroundColor: "var(--vscode-editor-background)",
        borderBottom: "1px solid var(--vscode-panel-border)",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: "16px",
        zIndex: 1000,
        fontFamily: "var(--vscode-font-family)",
        fontSize: "13px",
        color: "var(--vscode-editor-foreground)",
      }}
    >
      {/* Page Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "var(--vscode-descriptionForeground)" }}>
          Page:
        </span>
        {document.pages.length > 1 ? (
          <select
            value={selectedPageIndex}
            onChange={(e) => onPageChange(Number(e.target.value))}
            style={{
              backgroundColor: "var(--vscode-dropdown-background)",
              color: "var(--vscode-dropdown-foreground)",
              border: "1px solid var(--vscode-dropdown-border)",
              borderRadius: "2px",
              padding: "4px 8px",
              fontSize: "13px",
              minWidth: "120px",
            }}
          >
            {document.pages.map((page, index) => (
              <option key={page.id} value={index}>
                {page.name || `Page ${index + 1}`}
              </option>
            ))}
          </select>
        ) : (
          <span style={{ fontWeight: 500 }}>
            {currentPage?.name || "Page 1"}
          </span>
        )}
      </div>

      {/* Divider */}
      <div
        style={{
          width: "1px",
          height: "24px",
          backgroundColor: "var(--vscode-panel-border)",
        }}
      />

      {/* Zoom Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "var(--vscode-descriptionForeground)" }}>
          Zoom:
        </span>

        <button
          onClick={() => onZoomChange(Math.max(0.1, zoom - 0.1))}
          style={{
            backgroundColor: "var(--vscode-button-secondaryBackground)",
            color: "var(--vscode-button-secondaryForeground)",
            border: "1px solid var(--vscode-button-border)",
            borderRadius: "2px",
            padding: "4px 8px",
            fontSize: "13px",
            cursor: "pointer",
            minWidth: "24px",
          }}
          title="Zoom Out (10%)"
        >
          −
        </button>

        <span
          style={{
            minWidth: "60px",
            textAlign: "center",
            fontFamily: "var(--vscode-editor-font-family)",
            fontSize: "12px",
          }}
        >
          {Math.round(zoom * 100)}%
        </span>

        <button
          onClick={() => onZoomChange(Math.min(5, zoom + 0.1))}
          style={{
            backgroundColor: "var(--vscode-button-secondaryBackground)",
            color: "var(--vscode-button-secondaryForeground)",
            border: "1px solid var(--vscode-button-border)",
            borderRadius: "2px",
            padding: "4px 8px",
            fontSize: "13px",
            cursor: "pointer",
            minWidth: "24px",
          }}
          title="Zoom In (10%)"
        >
          +
        </button>

        <button
          onClick={onResetZoom}
          style={{
            backgroundColor: "var(--vscode-button-secondaryBackground)",
            color: "var(--vscode-button-secondaryForeground)",
            border: "1px solid var(--vscode-button-border)",
            borderRadius: "2px",
            padding: "4px 8px",
            fontSize: "13px",
            cursor: "pointer",
          }}
          title="Reset Zoom (100%)"
        >
          100%
        </button>

        <button
          onClick={onFitToScreen}
          style={{
            backgroundColor: "var(--vscode-button-secondaryBackground)",
            color: "var(--vscode-button-secondaryForeground)",
            border: "1px solid var(--vscode-button-border)",
            borderRadius: "2px",
            padding: "4px 8px",
            fontSize: "13px",
            cursor: "pointer",
          }}
          title="Fit to Screen"
        >
          Fit
        </button>
      </div>

      {/* Document Info */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          color: "var(--vscode-descriptionForeground)",
          fontSize: "12px",
        }}
      >
        <span>
          {document.size.width} × {document.size.height}
        </span>
        <span>
          {document.pages.length} page{document.pages.length !== 1 ? "s" : ""}
        </span>
        {currentPage && (
          <span>
            {currentPage.shapes.length} shape
            {currentPage.shapes.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>
    </div>
  );
};
