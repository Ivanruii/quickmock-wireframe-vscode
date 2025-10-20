import React from "react";
import { Stage, Layer } from "react-konva";
import { QuickMockDocument, ShapeModel } from "@/core/model";
import { renderShapeComponent } from "../../pods/canvas/shape-renderer";
import { ShapeRendererProps } from "../../pods/canvas/shape-renderer/model";

interface CanvasProps {
  document: QuickMockDocument;
  selectedPageIndex?: number;
  zoom?: number;
  onCanvasReady?: (canvasSize: { width: number; height: number }) => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  document,
  selectedPageIndex = 0,
  zoom = 1,
  onCanvasReady,
}) => {
  const page = document.pages[selectedPageIndex];
  const canvasRef = React.useRef<any>(null);

  const canvasWidth = Math.max(
    window.innerWidth,
    document.size.width * zoom + 100
  );
  const canvasHeight = Math.max(
    window.innerHeight - 48,
    document.size.height * zoom + 100
  );

  const offsetX = Math.max(0, (canvasWidth - document.size.width * zoom) / 2);
  const offsetY = Math.max(0, (canvasHeight - document.size.height * zoom) / 2);

  React.useEffect(() => {
    if (onCanvasReady) {
      onCanvasReady({ width: canvasWidth, height: canvasHeight });
    }
  }, [canvasWidth, canvasHeight, onCanvasReady]);

  if (!page) {
    return (
      <div
        style={{
          width: "100%",
          height: "calc(100vh - 48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--vscode-editor-background)",
          color: "var(--vscode-descriptionForeground)",
        }}
      >
        No page found
      </div>
    );
  }

  const renderShape = (shape: ShapeModel) => {
    try {
      const shapeRendererProps: ShapeRendererProps = {
        handleSelected: undefined,
        shapeRefs: undefined,
        handleDragEnd: undefined,
        handleTransform: undefined,
      };

      return renderShapeComponent(shape, shapeRendererProps);
    } catch (error) {
      console.error(`Error rendering shape ${shape.id} of type ${shape.type}:`, error);
      return null;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 48px)",
        backgroundColor: "var(--vscode-editor-background)",
        overflow: "auto",
        position: "relative",
      }}
    >
      {/* Document bounds visualization */}
      <div
        style={{
          position: "absolute",
          left: offsetX,
          top: offsetY,
          width: document.size.width * zoom,
          height: document.size.height * zoom,
          border: "1px solid var(--vscode-panel-border)",
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 0,
        }}
      />

      <Stage
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        scaleX={zoom}
        scaleY={zoom}
        offsetX={-offsetX / zoom}
        offsetY={-offsetY / zoom}
        style={{ zIndex: 1 }}
      >
        <Layer>{page.shapes.map(renderShape)}</Layer>
      </Stage>
    </div>
  );
};
