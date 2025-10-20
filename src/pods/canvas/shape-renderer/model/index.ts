import React from "react";
import { ShapeModel } from "@/core/model";

export interface ShapeRendererProps {
  handleSelected?: (shapeId: string) => void;
  shapeRefs?: React.MutableRefObject<Record<string, React.RefObject<any>>>;
  handleDragEnd?: (shapeId: string) => void;
  handleTransform?: () => void;
}

export type ShapeRenderer = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => React.JSX.Element;
