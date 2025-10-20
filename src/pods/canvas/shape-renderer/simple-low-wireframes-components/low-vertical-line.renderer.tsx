import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { VerticalLineLowShape } from "@/common/mock-components/front-low-wireframes-components/vertical-line-low-shape-readonly";

export const renderLowVerticalLine = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { id, x, y, width, height, text, otherProps } = shape;

  return (
    <VerticalLineLowShape
      id={id}
      x={x}
      y={y}
      width={width}
      height={height}
      text={text}
      otherProps={otherProps}
      {...shapeRenderedProps}
    />
  );
};
