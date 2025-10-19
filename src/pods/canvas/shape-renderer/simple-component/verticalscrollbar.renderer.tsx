import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { VerticalScrollBarShape } from "@/common/mock-components/front-components/verticalscrollbar-shape-readonly";

export const renderVerticalScrollBar = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <VerticalScrollBarShape
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      text={shape.text}
      otherProps={shape.otherProps || {}}
    />
  );
};
