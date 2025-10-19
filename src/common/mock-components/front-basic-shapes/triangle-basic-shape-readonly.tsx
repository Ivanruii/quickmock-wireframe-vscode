import { forwardRef } from "react";
import { Group, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const WIDTH = 160;
const HEIGHT = (WIDTH * 1.732) / 2;

const triangleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: WIDTH,
  defaultHeight: HEIGHT,
};

export const getTriangleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  triangleShapeRestrictions;

export const TriangleShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    triangleShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const stroke = otherProps?.stroke || "black";
  const fill = otherProps?.fill || "white";
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);

  const centerX = restrictedWidth / 2;
  const points = [
    centerX,
    0, // Top point
    restrictedWidth,
    restrictedHeight, // Bottom right
    0,
    restrictedHeight, // Bottom left
    centerX,
    0, // Close the triangle
  ];

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Line
        points={points}
        strokeWidth={2}
        stroke={stroke}
        fill={fill}
        dash={strokeStyle}
        closed={true}
      />
    </Group>
  );
});
