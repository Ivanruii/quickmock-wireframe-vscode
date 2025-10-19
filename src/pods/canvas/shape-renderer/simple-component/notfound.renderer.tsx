import React from "react";
import { Group, Rect, Text } from "react-konva";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";

export const renderNotFound = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <Group
      id={shape.id}
      key={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      name="shape"
      draggable={false}
    >
      {/* Error background */}
      <Rect
        x={0}
        y={0}
        width={shape.width}
        height={shape.height}
        fill="#ffebee"
        stroke="#f44336"
        strokeWidth={2}
        dash={[5, 5]}
        cornerRadius={4}
      />

      {/* Error message */}
      <Text
        x={8}
        y={0}
        width={shape.width - 16}
        height={shape.height}
        text={`❌ Component "${shape.type}" not implemented`}
        fontFamily="Arial"
        fontSize={12}
        fill="#d32f2f"
        verticalAlign="middle"
        align="center"
        wrap="word"
      />
    </Group>
  );
};
