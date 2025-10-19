import { forwardRef } from "react";
import { Group, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const verticalLineShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 20,
  defaultHeight: 200,
};

export const getVerticalLineShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  verticalLineShapeRestrictions;

export const VerticalLineShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    verticalLineShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const stroke = otherProps?.stroke || "black";
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);

  const points = [
    restrictedWidth / 2,
    0,
    restrictedWidth / 2,
    restrictedHeight,
  ];

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Line
        points={points}
        strokeWidth={2}
        stroke={stroke}
        dash={strokeStyle}
      />
    </Group>
  );
});
