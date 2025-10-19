import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { NormaltextShape } from "@/common/mock-components/front-text-components/index";

export const renderNormaltext = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { ...otherProps } = shapeRenderedProps as any;

  return (
    <NormaltextShape
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      id={shape.id}
      text={shape.text}
      otherProps={shape.otherProps}
      {...otherProps}
    />
  );
};
