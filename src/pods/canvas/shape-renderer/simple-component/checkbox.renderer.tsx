import React from "react";
import { Group, Rect, Text, Line } from "react-konva";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";

export const renderCheckbox = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const checkboxSize = Math.min(shape.height - 4, 16);
  const isChecked = (shape.otherProps as any)?.checked || false;

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
      {/* Checkbox square */}
      <Rect
        x={0}
        y={(shape.height - checkboxSize) / 2}
        width={checkboxSize}
        height={checkboxSize}
        fill={isChecked ? "#007ACC" : "#ffffff"}
        stroke={shape.otherProps?.stroke || "#000000"}
        strokeWidth={1}
        cornerRadius={2}
      />

      {/* Checkmark */}
      {isChecked && (
        <Group>
          <Line
            points={[
              checkboxSize * 0.2,
              (shape.height - checkboxSize) / 2 + checkboxSize * 0.5,
              checkboxSize * 0.45,
              (shape.height - checkboxSize) / 2 + checkboxSize * 0.75,
              checkboxSize * 0.8,
              (shape.height - checkboxSize) / 2 + checkboxSize * 0.25,
            ]}
            stroke="#ffffff"
            strokeWidth={2}
            lineCap="round"
            lineJoin="round"
          />
        </Group>
      )}

      {/* Label text */}
      <Text
        x={checkboxSize + 8}
        y={0}
        width={shape.width - checkboxSize - 8}
        height={shape.height}
        text={shape.text || "Checkbox"}
        fontFamily="Arial"
        fontSize={shape.otherProps?.fontSize || 14}
        fill={shape.otherProps?.textColor || "#000000"}
        verticalAlign="middle"
        align="left"
      />
    </Group>
  );
};
