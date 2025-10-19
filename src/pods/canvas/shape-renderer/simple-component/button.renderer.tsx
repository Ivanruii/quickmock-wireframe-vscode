import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ButtonShape } from "@/common/mock-components/front-components/button-shape-readonly";

export const renderButton = (
  shape: Shape,
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
