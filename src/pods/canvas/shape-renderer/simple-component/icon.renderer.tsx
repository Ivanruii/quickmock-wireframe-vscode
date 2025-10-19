import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { SvgIcon } from "@/common/mock-components/front-components/icon-shape-readonly";

export const renderIcon = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <SvgIcon
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
