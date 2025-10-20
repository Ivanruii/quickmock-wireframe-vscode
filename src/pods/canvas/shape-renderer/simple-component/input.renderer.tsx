import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { InputShape } from "@/common/mock-components/front-components/input-shape-readonly";

export const renderInput = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <InputShape
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      text={shape.text || ""}
      otherProps={shape.otherProps || {}}
    />
  );
};
