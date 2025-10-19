import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { LineChartShape } from "@/common/mock-components/front-rich-components/line-chart-readonly";

export const renderLineChart = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <LineChartShape
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
