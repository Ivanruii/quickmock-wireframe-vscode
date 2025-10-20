import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { HorizontalScrollBarShape } from "@/common/mock-components/front-components/horizontalscrollbar-shape-readonly";

export const renderHorizontalScrollBar = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <HorizontalScrollBarShape
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
