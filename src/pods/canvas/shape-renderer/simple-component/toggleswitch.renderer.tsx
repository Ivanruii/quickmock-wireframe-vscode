import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ToggleSwitch } from "@/common/mock-components/front-components/toggleswitch-shape-readonly";

export const renderToggleSwitch = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <ToggleSwitch
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
