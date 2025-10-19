import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { PieChartShape } from "@/common/mock-components/front-rich-components/pie-chart-readonly";

export const renderPieChart = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <PieChartShape
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
