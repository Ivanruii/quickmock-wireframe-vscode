import React, { forwardRef } from "react";
import { Group, Rect, Line, Text } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const CHECKBOX_DEFAULT_HEIGHT = 20;
const checkBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: CHECKBOX_DEFAULT_HEIGHT,
  maxWidth: -1,
  maxHeight: CHECKBOX_DEFAULT_HEIGHT,
  defaultWidth: 150,
  defaultHeight: CHECKBOX_DEFAULT_HEIGHT,
};
export const getCheckboxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  checkBoxShapeRestrictions;
const marginTick = 5;
const boxTickWidth = CHECKBOX_DEFAULT_HEIGHT;
const tickWidth = boxTickWidth;
const marginText = 3;
export const CheckBoxShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Checkbox",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    checkBoxShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const isOn = otherProps?.isOn || false;
  const textColor = otherProps?.textColor || SHAPE_CONSTANTS.DEFAULT_TEXT_COLOR;
  const stroke = otherProps?.stroke || SHAPE_CONSTANTS.DEFAULT_STROKE_COLOR;
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={boxTickWidth}
        height={restrictedHeight}
        cornerRadius={SHAPE_CONSTANTS.DEFAULT_BORDER_RADIUS}
        stroke={stroke}
        strokeWidth={1}
        fill="white"
      />
      {isOn && (
        <Line
          x={0}
          y={0}
          points={[
            marginTick,
            boxTickWidth / 2,
            marginTick + boxTickWidth / 5,
            boxTickWidth - marginTick,
            tickWidth - marginTick,
            marginTick,
          ]}
          stroke={stroke}
          strokeWidth={1}
          lineCap="round"
          lineJoin="round"
        />
      )}
      <Text
        x={boxTickWidth + 10}
        y={marginText}
        width={restrictedWidth - boxTickWidth - 10}
        height={restrictedHeight - marginText}
        text={text}
        fontFamily={SHAPE_CONSTANTS.DEFAULT_FONT_FAMILY}
        fontSize={15}
        fill={textColor}
        align="left"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
