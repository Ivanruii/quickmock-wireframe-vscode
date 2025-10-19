import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { CalendarShape } from "@/common/mock-components/front-rich-components/calendar-readonly";

export const renderCalendar = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <CalendarShape
      x={x}
      y={y}
      width={width}
      height={height}
      id={shape.id}
      text={text}
      otherProps={otherProps}
    />
  );
};
