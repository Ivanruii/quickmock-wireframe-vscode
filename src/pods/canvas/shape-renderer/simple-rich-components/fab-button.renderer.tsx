import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { FabButtonShape } from "@/common/mock-components/front-rich-components/fab-button-readonly";

export const renderFabButton = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <FabButtonShape
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
