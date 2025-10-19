import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { TableShape } from "@/common/mock-components/front-rich-components/table-readonly";

export const renderTable = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <TableShape
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
