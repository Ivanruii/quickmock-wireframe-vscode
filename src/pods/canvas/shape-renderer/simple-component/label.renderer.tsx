import React from "react";
import { Text } from "react-konva";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";

export const renderLabel = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { ...otherProps } = shapeRenderedProps as any;

  return (
    <Text
      x={shape.x}
      y={shape.y}
      text={shape.text || "Label"}
      fontSize={shape.otherProps?.fontSize || 14}
      fill={shape.otherProps?.textColor || "#333333"}
      fontFamily="Arial"
      fontStyle={shape.otherProps?.fontStyle || "normal"}
      fontVariant={shape.otherProps?.fontVariant || "normal"}
      textDecoration={shape.otherProps?.textDecoration || ""}
      align={shape.otherProps?.textAlignment || "left"}
      width={shape.width}
      height={shape.height}
      verticalAlign="middle"
      {...otherProps}
    />
  );
};
