import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { StarShape } from "@/common/mock-components/front-basic-shapes/index";

export const renderStar = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { ...otherProps } = shapeRenderedProps as any;

  return (
    <StarShape
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      id={shape.id}
      text={shape.text}
      otherProps={shape.otherProps}
      {...otherProps}
    />
  );
};
