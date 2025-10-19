import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ImageShape } from "@/common/mock-components/front-basic-shapes/index";

export const renderImage = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { ...otherProps } = shapeRenderedProps as any;

  return (
    <ImageShape
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
