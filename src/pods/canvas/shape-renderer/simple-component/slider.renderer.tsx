import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { SliderShape } from "@/common/mock-components/front-components/slider-shape-readonly";

export const renderSlider = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <SliderShape
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
