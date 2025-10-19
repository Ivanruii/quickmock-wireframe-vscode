import React, { forwardRef } from "react";
import { Group, Rect, Text, Line } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const tooltipShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 70,
  maxWidth: -1,
  maxHeight: 500,
  defaultWidth: 120,
  defaultHeight: 100,
};
export const getTooltipShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tooltipShapeRestrictions;
export const TooltipShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Tooltip text",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    tooltipShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const stroke = otherProps?.stroke || SHAPE_CONSTANTS.DEFAULT_STROKE_COLOR;
  const fill = otherProps?.fill || "#333333";
  const textColor = otherProps?.textColor || "#FFFFFF";
  const pointerHeight = 15;
  const pointerWidth = 20;
  const mainRectHeight = restrictedHeight - pointerHeight;
  const trianglePoints = [
    restrictedWidth / 2 - pointerWidth / 2,
    mainRectHeight,
    restrictedWidth / 2,
    restrictedHeight,
    restrictedWidth / 2 + pointerWidth / 2,
    mainRectHeight,
  ];
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      {/* Main tooltip rectangle */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={mainRectHeight}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={SHAPE_CONSTANTS.DEFAULT_BORDER_RADIUS}
      />
      {/* Tooltip text */}
      <Text
        x={10}
        y={10}
        width={restrictedWidth - 20}
        height={mainRectHeight - 20}
        text={text}
        fontFamily={SHAPE_CONSTANTS.DEFAULT_FONT_FAMILY}
        fontSize={12}
        lineHeight={1.25}
        fill={textColor}
        verticalAlign="middle"
        ellipsis={true}
        align="center"
      />
      {/* Triangle pointer */}
      <Line
        points={trianglePoints}
        closed
        stroke={stroke}
        strokeWidth={1}
        fill={fill}
      />
    </Group>
  );
});
