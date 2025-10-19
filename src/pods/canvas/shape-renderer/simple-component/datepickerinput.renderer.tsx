import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { DatepickerInputShape } from "@/common/mock-components/front-components/datepickerinput-shape-readonly";

export const renderDatePickerInput = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <DatepickerInputShape
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
