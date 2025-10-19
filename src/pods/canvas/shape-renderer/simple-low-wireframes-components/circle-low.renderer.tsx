import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { CircleLowShape } from "@/common/mock-components/front-low-wireframes-components/circle-low-shape-readonly";

export const renderCircleLow = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { id, x, y, width, height, text, otherProps } = shape;

  return (
    <CircleLowShape
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
