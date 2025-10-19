import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { LargeArrowShape } from "@/common/mock-components/front-basic-shapes/index";

export const renderLargeArrowShape = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { ...otherProps } = shapeRenderedProps as any;

  return (
    <LargeArrowShape
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
