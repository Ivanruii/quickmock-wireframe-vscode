import { forwardRef } from "react";
import { Group, Rect, Circle, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const toggleLightDarkShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 25,
  maxWidth: 50,
  maxHeight: 25,
  defaultWidth: 50,
  defaultHeight: 25,
};

export const getToggleLightDarkShapeSizeRestrictions =
  (): ShapeSizeRestrictions => toggleLightDarkShapeRestrictions;

export const ToggleLightDark = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    toggleLightDarkShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  // Extract properties from otherProps
  const isOn = otherProps?.isOn || false;
  const stroke = otherProps?.stroke || "#333";

  const toggleRadius = restrictedHeight / 2;
  const circleRadius = toggleRadius - 3;
  const circleX = isOn ? restrictedWidth - toggleRadius : toggleRadius;

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Toggle background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={isOn ? "#4ecdc4" : "#ddd"}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={toggleRadius}
      />

      {/* Toggle circle */}
      <Circle
        x={circleX}
        y={toggleRadius}
        radius={circleRadius}
        fill="white"
        stroke={stroke}
        strokeWidth={1}
      />

      {/* Icon indicators */}
      <Text
        x={isOn ? 5 : restrictedWidth - 15}
        y={toggleRadius - 5}
        text={isOn ? "☀" : "☾"}
        fontSize={10}
        fill={isOn ? "white" : "#666"}
        align="center"
      />
    </Group>
  );
});
