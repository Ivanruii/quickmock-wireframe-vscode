import React, { forwardRef } from "react";
import { Group, Text } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const labelSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 60,
  defaultHeight: 25,
};
export const getLabelSizeRestrictions = (): ShapeSizeRestrictions =>
  labelSizeRestrictions;
export const LabelShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Label",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    labelSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const textColor = otherProps?.textColor || SHAPE_CONSTANTS.DEFAULT_TEXT_COLOR;
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      <Text
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        text={text}
        fontFamily={SHAPE_CONSTANTS.DEFAULT_FONT_FAMILY}
        fontSize={15}
        fill={textColor}
        align="center"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
