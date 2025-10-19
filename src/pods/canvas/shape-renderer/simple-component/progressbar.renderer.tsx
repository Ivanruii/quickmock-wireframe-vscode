import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ProgressBarShape } from "@/common/mock-components/front-components/progressbar-shape-readonly";

export const renderProgressBar = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <ProgressBarShape
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
