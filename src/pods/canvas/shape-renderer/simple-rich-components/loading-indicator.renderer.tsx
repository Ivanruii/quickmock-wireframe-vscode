import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { LoadIndicator } from "@/common/mock-components/front-rich-components/loading-indicator-readonly";

export const renderLoadingIndicator = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <LoadIndicator
      x={x}
      y={y}
      width={width}
      height={height}
      id={shape.id}
      text={text}
      otherProps={otherProps}
    />
  );
};
