import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { MapChartShape } from "@/common/mock-components/front-rich-components/map-chart-readonly";

export const renderMapChart = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <MapChartShape
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
