import React, { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const INPUT_SHAPE = {
  DEFAULT_MIN_WIDTH: 50,
  DEFAULT_TEXT_WIDTH: 100,
  DEFAULT_TEXT_HEIGHT: 38,
  DEFAULT_FONT_FAMILY: "Comic Sans MS, cursive",
  DEFAULT_FONT_SIZE: 16,
  DEFAULT_LINE_HEIGHT: 1.25,
  DEFAULT_STROKE_WIDTH: 1,
  DEFAULT_PADDING: 10,
};
const inputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: INPUT_SHAPE.DEFAULT_MIN_WIDTH,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: INPUT_SHAPE.DEFAULT_TEXT_WIDTH,
  defaultHeight: INPUT_SHAPE.DEFAULT_TEXT_HEIGHT,
};
export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputShapeRestrictions;
export const InputShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Input text",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    inputShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const stroke = otherProps?.stroke || SHAPE_CONSTANTS.DEFAULT_STROKE_COLOR;
  const fill = otherProps?.fill || SHAPE_CONSTANTS.DEFAULT_FILL_COLOR;
  const textColor = otherProps?.textColor || SHAPE_CONSTANTS.DEFAULT_TEXT_COLOR;
  const borderRadius =
    otherProps?.borderRadius || SHAPE_CONSTANTS.DEFAULT_BORDER_RADIUS;
  const isPlaceholder = otherProps?.isPlaceholder || false;
  const isPassword = otherProps?.isPassword || false;
  const maskPassword = (text: string) => {
    const maskSymbol = "●";
    return maskSymbol.repeat(text.length);
  };
  const finalText = isPassword && !isPlaceholder ? maskPassword(text) : text;
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={borderRadius}
        stroke={stroke}
        strokeWidth={INPUT_SHAPE.DEFAULT_STROKE_WIDTH}
        fill={fill}
      />
      <Text
        x={INPUT_SHAPE.DEFAULT_PADDING}
        y={INPUT_SHAPE.DEFAULT_PADDING + 1}
        width={restrictedWidth - INPUT_SHAPE.DEFAULT_PADDING * 2}
        text={finalText}
        fontFamily={INPUT_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={INPUT_SHAPE.DEFAULT_FONT_SIZE}
        lineHeight={INPUT_SHAPE.DEFAULT_LINE_HEIGHT}
        fill={isPlaceholder ? "#8c8c8c" : textColor}
        align="left"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
