import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { Heading1Shape } from "@/common/mock-components/front-text-components/index";

export const renderHeading1 = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { ...otherProps } = shapeRenderedProps as any;

  return (
    <Heading1Shape
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
