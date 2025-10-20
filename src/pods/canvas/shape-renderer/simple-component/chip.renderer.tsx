import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ChipShape } from "@/common/mock-components/front-components/chip-shape-readonly";

export const renderChip = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <ChipShape
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      text={shape.text || "Chip"}
      otherProps={shape.otherProps || {}}
    />
  );
};
