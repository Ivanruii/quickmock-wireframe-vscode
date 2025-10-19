import { forwardRef } from "react";
import { Group, Rect } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const rectangleLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getRectangleLowShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  rectangleLowShapeRestrictions;

export const RectangleLowShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    rectangleLowShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const strokeWidth = 4;

  const stroke = otherProps?.stroke || "#000000";
  const backgroundColor = otherProps?.backgroundColor || "transparent";
  const strokeStyle = otherProps?.strokeStyle || [];
  const konvaStroke = getStrokeStyle(strokeStyle);

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        stroke={stroke}
        dash={konvaStroke}
        strokeWidth={strokeWidth}
        fill={backgroundColor}
      />
    </Group>
  );
});
