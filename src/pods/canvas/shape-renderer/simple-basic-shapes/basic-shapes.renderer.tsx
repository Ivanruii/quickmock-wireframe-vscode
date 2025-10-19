import React from "react";
import { Rect, Group, Text } from "react-konva";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";

export const rectangleRenderer = (
  shape: Shape,
  shapeRendererProps: ShapeRendererProps
): React.JSX.Element => {
  return (
    <Rect
      key={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill="transparent"
      stroke="#000"
      strokeWidth={1}
    />
  );
};

export const rectangleLowRenderer = (
  shape: Shape,
  shapeRendererProps: ShapeRendererProps
): React.JSX.Element => {
  return (
    <Rect
      key={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill="transparent"
      stroke={shape.otherProps?.stroke || "#000"}
      strokeWidth={shape.otherProps?.strokeWidth || 2}
      dash={[5, 5]}
    />
  );
};

export const circleRenderer = (
  shape: Shape,
  shapeRendererProps: ShapeRendererProps
): React.JSX.Element => {
  return (
    <Rect
      key={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill="transparent"
      stroke="#000"
      strokeWidth={1}
      cornerRadius={Math.min(shape.width, shape.height) / 2}
    />
  );
};

export const horizontalLineRenderer = (
  shape: Shape,
  shapeRendererProps: ShapeRendererProps
): React.JSX.Element => {
  return (
    <Rect
      key={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={2}
      fill={shape.otherProps?.stroke || "#000"}
    />
  );
};

export const horizontalLineLowRenderer = (
  shape: Shape,
  shapeRendererProps: ShapeRendererProps
): React.JSX.Element => {
  return (
    <Rect
      key={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={2}
      fill={shape.otherProps?.stroke || "#000"}
      dash={[5, 5]}
    />
  );
};

export const iconRenderer = (
  shape: Shape,
  shapeRendererProps: ShapeRendererProps
): React.JSX.Element => {
  const iconName = shape.otherProps?.icon?.name || "Icon";

  return (
    <Group
      key={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
    >
      <Rect
        x={0}
        y={0}
        width={shape.width}
        height={shape.height}
        fill="transparent"
        stroke={shape.otherProps?.stroke || "#000"}
        strokeWidth={1}
      />
      <Text
        x={0}
        y={0}
        width={shape.width}
        height={shape.height}
        text={iconName}
        fontFamily="Arial"
        fontSize={Math.min(shape.width, shape.height) * 0.3}
        fill={shape.otherProps?.stroke || "#000"}
        verticalAlign="middle"
        align="center"
      />
    </Group>
  );
};
