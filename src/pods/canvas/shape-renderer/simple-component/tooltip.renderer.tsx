import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { TooltipShape } from "@/common/mock-components/front-components/tooltip-shape-readonly";

export const renderTooltip = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <TooltipShape
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      text={shape.text || "Tooltip text"}
      otherProps={shape.otherProps || {}}
    />
  );
};
