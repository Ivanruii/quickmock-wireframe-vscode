import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { RectangleLowShape } from "@/common/mock-components/front-low-wireframes-components/rectangle-low-shape-readonly";

export const renderRectangleLow = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { id, x, y, width, height, text, otherProps } = shape;

  return (
    <RectangleLowShape
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
