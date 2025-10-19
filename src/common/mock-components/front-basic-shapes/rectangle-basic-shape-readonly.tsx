import { forwardRef } from "react";
import { Group, Rect } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const rectangleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getRectangleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  rectangleShapeRestrictions;

export const RectangleShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    rectangleShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const stroke = otherProps?.stroke || "black";
  const fill = otherProps?.fill || "white";
  const borderRadius = otherProps?.borderRadius || 0;
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        strokeWidth={2}
        stroke={stroke}
        fill={fill}
        dash={strokeStyle}
        cornerRadius={borderRadius}
      />
    </Group>
  );
});
