import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ParagraphScribbledShape } from "@/common/mock-components/front-low-wireframes-components/paragraph-scribbled-shape-readonly";

export const renderParagraphScribbled = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { id, x, y, width, height, text, otherProps } = shape;

  return (
    <ParagraphScribbledShape
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
