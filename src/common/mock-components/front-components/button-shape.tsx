import React from "react";
import { Group, Rect, Text } from "react-konva";
export interface ButtonShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  disabled?: boolean;
}
export const ButtonShape: React.FC<ButtonShapeProps> = ({
  x,
  y,
  width,
  height,
  text = "Button",
  disabled = false,
}) => {
  return (
    <Group x={x} y={y}>
      {/* Button background */}
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={disabled ? "#e9ecef" : "#007bff"}
        stroke={disabled ? "#ced4da" : "#0056b3"}
        strokeWidth={1}
        cornerRadius={4}
      />
      {/* Button text */}
      <Text
        x={width / 2}
        y={height / 2}
        text={text}
        fontSize={14}
        fontFamily="Arial"
        fill={disabled ? "#6c757d" : "white"}
        align="center"
        offsetX={text.length * 3.5}
        offsetY={7}
      />
    </Group>
  );
};
