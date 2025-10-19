import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { TextScribbledShape } from "@/common/mock-components/front-low-wireframes-components/text-scribbled-shape-readonly";

export const renderTextScribbled = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { id, x, y, width, height, text, otherProps } = shape;

  return (
    <TextScribbledShape
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
