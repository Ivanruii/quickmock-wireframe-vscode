import React, { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const textAreaShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 44,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 55,
};
export const getTextAreaSizeRestrictions = (): ShapeSizeRestrictions =>
  textAreaShapeRestrictions;
export const TextAreaShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Textarea",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    textAreaShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const stroke = otherProps?.stroke || SHAPE_CONSTANTS.DEFAULT_STROKE_COLOR;
  const fill = otherProps?.fill || SHAPE_CONSTANTS.DEFAULT_FILL_COLOR;
  const textColor = otherProps?.textColor || SHAPE_CONSTANTS.DEFAULT_TEXT_COLOR;
  const borderRadius =
    otherProps?.borderRadius || SHAPE_CONSTANTS.DEFAULT_BORDER_RADIUS;
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        stroke={stroke}
        strokeWidth={1}
        fill={fill}
        cornerRadius={borderRadius}
      />
      <Text
        x={10}
        y={10}
        text={text}
        fontSize={12}
        fontFamily={SHAPE_CONSTANTS.DEFAULT_FONT_FAMILY}
        fill={textColor}
        width={restrictedWidth - 20}
        height={restrictedHeight - 20}
        wrap="word"
      />
    </Group>
  );
});
