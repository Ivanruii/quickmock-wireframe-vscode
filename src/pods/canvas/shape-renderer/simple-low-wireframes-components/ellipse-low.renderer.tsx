import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { EllipseLowShape } from "@/common/mock-components/front-low-wireframes-components/ellipse-low-shape-readonly";

export const renderEllipseLow = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { id, x, y, width, height, text, otherProps } = shape;

  return (
    <EllipseLowShape
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
