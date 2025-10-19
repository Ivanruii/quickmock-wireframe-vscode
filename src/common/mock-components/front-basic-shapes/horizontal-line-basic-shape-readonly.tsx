import { forwardRef } from "react";
import { Group, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const horizontalLineShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 20,
};

export const getHorizontalLineShapeSizeRestrictions =
  (): ShapeSizeRestrictions => horizontalLineShapeRestrictions;

export const HorizontalLineShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    horizontalLineShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const stroke = otherProps?.stroke || "black";
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);

  const points = [
    0,
    restrictedHeight / 2,
    restrictedWidth,
    restrictedHeight / 2,
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
