import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { AppBarShape } from "@/common/mock-components/front-rich-components/appBar-readonly";

export const renderAppBar = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <AppBarShape
      x={x}
      y={y}
      width={width}
      height={height}
      id={shape.id}
      text={text}
      otherProps={otherProps}
    />
  );
};
