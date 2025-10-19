import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { LinkShape } from "@/common/mock-components/front-text-components/index";

export const renderLink = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { ...otherProps } = shapeRenderedProps as any;

  return (
    <LinkShape
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
