import React, { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const timepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: 220,
  defaultHeight: 38,
};
export const getTimepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => timepickerInputShapeRestrictions;
export const TimepickerInputShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const {
      x,
      y,
      width,
      height,
      id,
      onSelected,
      text = "HH:MM:SS",
      otherProps,
      ...shapeProps
    } = props;
    const restrictedSize = fitSizeToShapeSizeRestrictions(
      timepickerInputShapeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
    const stroke = otherProps?.stroke || SHAPE_CONSTANTS.DEFAULT_STROKE_COLOR;
    const fill = otherProps?.fill || SHAPE_CONSTANTS.DEFAULT_FILL_COLOR;
    const textColor =
      otherProps?.textColor || SHAPE_CONSTANTS.DEFAULT_TEXT_COLOR;
    const borderRadius =
      otherProps?.borderRadius || SHAPE_CONSTANTS.DEFAULT_BORDER_RADIUS;
    const iconWidth = 20;
    return (
      <Group ref={ref} x={x} y={y} {...shapeProps}>
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={borderRadius}
          stroke={stroke}
          strokeWidth={1}
          fill={fill}
        />
        <Text
          x={10}
          y={10}
          width={restrictedWidth - iconWidth - 20}
          text={text}
          fontFamily={SHAPE_CONSTANTS.DEFAULT_FONT_FAMILY}
          fontSize={16}
          lineHeight={1.25}
          fill={textColor}
          align="left"
          ellipsis={true}
          wrap="none"
        />
        {/* Clock icon placeholder */}
        <Text
          x={restrictedWidth - iconWidth - 5}
          y={10}
          text="🕐"
          fontSize={16}
          width={iconWidth}
          align="center"
        />
      </Group>
    );
  }
);
