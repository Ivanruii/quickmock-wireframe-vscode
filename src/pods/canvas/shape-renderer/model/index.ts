import React from "react";
import { Shape } from "@/core/model";

export interface ShapeRendererProps {
  handleSelected?: (shapeId: string) => void;
  shapeRefs?: React.MutableRefObject<Record<string, React.RefObject<any>>>;
  handleDragEnd?: (shapeId: string) => void;
  handleTransform?: () => void;
}

export type ShapeRenderer = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => React.JSX.Element;
