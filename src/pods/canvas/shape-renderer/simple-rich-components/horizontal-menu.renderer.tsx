import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { HorizontalMenuShape } from "@/common/mock-components/front-rich-components/horizontal-menu-readonly";

export const renderHorizontalMenu = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <HorizontalMenuShape
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
