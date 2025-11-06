import React, { useState, useEffect } from "react";
import { Canvas } from "./components/canvas.component";
import { Header } from "./components/header.component";
import { QuickMockDocument } from "@/core/model";

declare global {
  interface Window {
    acquireVsCodeApi: () => any;
  }
}

export const App: React.FC = () => {
  const [document, setDocument] = useState<QuickMockDocument | null>(null);
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [vscode] = useState(() => {
    try {
      return window.acquireVsCodeApi();
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (!vscode) return;

    // Signal that webview is ready
    vscode.postMessage({ type: "ready" });

    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      console.log("Received message:", message.type, message);
      switch (message.type) {
        case "documentUpdate":
          console.log("Setting document:", message.document);
          setDocument(message.document);
          setError(null);
          setIsLoading(false);
          break;
        case "pageChange":
          setSelectedPageIndex(message.pageIndex || 0);
          break;
        case "error":
          console.error("QuickMock Error:", message.message);
          setError(message.message);
          setIsLoading(false);
          break;
        default:
          console.warn("Unknown message type:", message.type);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [vscode]);

  const handleZoomChange = (newZoom: number) => {
    setZoom(Math.max(0.1, Math.min(5, newZoom)));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const handleFitToScreen = () => {
    if (!document || !canvasSize.width || !canvasSize.height) return;

    const availableWidth = canvasSize.width - 100; // padding
    const availableHeight = canvasSize.height - 100; // padding

    const scaleX = availableWidth / document.size.width;
    const scaleY = availableHeight / document.size.height;

    const fitZoom = Math.min(scaleX, scaleY, 1);
    setZoom(fitZoom);
  };

  const handleCanvasReady = (size: { width: number; height: number }) => {
    setCanvasSize(size);
  };

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "system-ui, sans-serif",
          color: "#d73a49",
          backgroundColor: "#f5f5f5",
          flexDirection: "column",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>
          Error loading QuickMock document
        </h3>
        <p style={{ margin: 0, fontSize: "14px" }}>{error}</p>
      </div>
    );
  }

  if (isLoading || !document) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontFamily: "system-ui, sans-serif",
          color: "#666",
          backgroundColor: "#f5f5f5",
        }}
      >
        Loading QuickMock document...
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Header
        document={document}
        selectedPageIndex={selectedPageIndex}
        onPageChange={setSelectedPageIndex}
        zoom={zoom}
        onZoomChange={handleZoomChange}
        onResetZoom={handleResetZoom}
        onFitToScreen={handleFitToScreen}
      />

      <Canvas
        document={document}
        selectedPageIndex={selectedPageIndex}
        zoom={zoom}
        onCanvasReady={handleCanvasReady}
      />
    </div>
  );
};
