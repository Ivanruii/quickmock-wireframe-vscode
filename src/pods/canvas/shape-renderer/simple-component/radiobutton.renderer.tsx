import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { RadioButtonShape } from "@/common/mock-components/front-components/radiobutton-shape-readonly";

export const renderRadioButton = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <RadioButtonShape
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      text={shape.text || "Radio Button"}
      otherProps={shape.otherProps || {}}
    />
  );
};
