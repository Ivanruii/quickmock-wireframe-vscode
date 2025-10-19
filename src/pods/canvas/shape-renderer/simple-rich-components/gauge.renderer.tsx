import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { GaugeShape } from "@/common/mock-components/front-rich-components/gauge-readonly";

export const renderGauge = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <GaugeShape
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
