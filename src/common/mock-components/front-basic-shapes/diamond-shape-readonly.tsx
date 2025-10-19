import { forwardRef } from "react";
import { Group, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { getStrokeStyle, fitSizeToShapeSizeRestrictions } from "@/common/utils";

const diamondShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getDiamondShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  diamondShapeRestrictions;

export const DiamondShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    diamondShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const stroke = otherProps?.stroke || "black";
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);
  const fill = otherProps?.backgroundColor || "transparent";

  const halfWidth = restrictedWidth / 2;
  const halfHeight = restrictedHeight / 2;
  const points = [
    halfWidth,
    0, // Top point
    restrictedWidth,
    halfHeight, // Right point
    halfWidth,
    restrictedHeight, // Bottom point
    0,
    halfHeight, // Left point
  ];

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Line
        points={points}
        closed
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={fill}
      />
    </Group>
  );
});
