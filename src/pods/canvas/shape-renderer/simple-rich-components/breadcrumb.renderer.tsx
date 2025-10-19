import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { BreadcrumbShape } from "@/common/mock-components/front-rich-components/breadcrumb-readonly";

export const renderBreadcrumb = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <BreadcrumbShape
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
