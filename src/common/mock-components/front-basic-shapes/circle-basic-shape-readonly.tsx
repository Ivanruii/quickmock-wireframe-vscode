import { forwardRef } from "react";
import { Group, Circle } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { getStrokeStyle, fitSizeToShapeSizeRestrictions } from "@/common/utils";

const circleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getCircleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  circleShapeRestrictions;

export const CircleShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    circleShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const radius = Math.min(restrictedWidth, restrictedHeight) / 2;

  const stroke = otherProps?.stroke || "black";
  const fill = otherProps?.fill || "white";
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Circle
        x={restrictedWidth / 2}
        y={restrictedHeight / 2}
        radius={radius}
        strokeWidth={2}
        stroke={stroke}
        fill={fill}
        dash={strokeStyle}
      />
    </Group>
  );
});
