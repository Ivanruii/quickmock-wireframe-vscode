import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ImagePlaceholderShape } from "@/common/mock-components/front-low-wireframes-components/image-placeholder-shape-readonly";

export const renderImagePlaceholder = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { id, x, y, width, height, text, otherProps } = shape;

  return (
    <ImagePlaceholderShape
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
