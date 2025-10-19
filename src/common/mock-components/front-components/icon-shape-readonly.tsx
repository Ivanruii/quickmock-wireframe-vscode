import React, { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const iconShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 25,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 150,
};
export const getIconShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  iconShapeRestrictions;
export const SvgIcon = forwardRef<any, ShapeProps>((props, ref) => {
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
    iconShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const stroke = otherProps?.stroke || SHAPE_CONSTANTS.DEFAULT_STROKE_COLOR;
  const fill = otherProps?.fill || SHAPE_CONSTANTS.DEFAULT_FILL_COLOR;
  const iconName = otherProps?.icon || "🏠"; // Default house icon
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      {/* Icon background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={SHAPE_CONSTANTS.DEFAULT_BORDER_RADIUS}
      />
      {/* Icon placeholder - using emoji */}
      <Text
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        text={iconName}
        fontSize={Math.min(restrictedWidth, restrictedHeight) * 0.6}
        fontFamily={SHAPE_CONSTANTS.DEFAULT_FONT_FAMILY}
        fill={stroke}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
});
