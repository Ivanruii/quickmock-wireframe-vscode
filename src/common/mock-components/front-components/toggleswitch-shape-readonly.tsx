import React, { forwardRef } from "react";
import { Group, Rect, Circle } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const toggleSwitchShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 25,
  maxWidth: 100,
  maxHeight: 35,
  defaultWidth: 60,
  defaultHeight: 25,
};
export const getToggleSwitchShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  toggleSwitchShapeRestrictions;
export const ToggleSwitch = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    toggleSwitchShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const isOn = otherProps?.isOn || false;
  const stroke = otherProps?.stroke || "black";
  const circleX = isOn
    ? restrictedWidth - restrictedHeight / 2
    : restrictedHeight / 2;
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={50}
        stroke={stroke}
        strokeWidth={2}
        fill={isOn ? "lightgreen" : "lightgray"}
      />
      <Circle
        x={circleX}
        y={restrictedHeight / 2}
        radius={restrictedHeight / 2}
        stroke={stroke}
        strokeWidth={2}
        fill="white"
      />
    </Group>
  );
});
