import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { TimepickerInputShape } from "@/common/mock-components/front-components/timepickerinput-shape-readonly";

export const renderTimePickerInput = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <TimepickerInputShape
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
