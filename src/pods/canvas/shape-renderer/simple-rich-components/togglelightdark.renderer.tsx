import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ToggleLightDark } from "@/common/mock-components/front-rich-components/togglelightdark-shape-readonly";

export const renderToggleLightDark = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <ToggleLightDark
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
