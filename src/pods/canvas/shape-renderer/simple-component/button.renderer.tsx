import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ButtonShape } from "@/common/mock-components/front-components/button-shape-readonly";

export const renderButton = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <ButtonShape
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      text={shape.text || "Button"}
      otherProps={shape.otherProps || {}}
    />
  );
};
