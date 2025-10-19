import { forwardRef } from "react";
import { Group, Rect, Ellipse, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const cilinderShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 110,
};

export const getCilinderShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  cilinderShapeRestrictions;

export const CilinderShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    cilinderShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const stroke = otherProps?.stroke || "black";
  const fill = otherProps?.backgroundColor || "#B0B0B0";

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Ellipse
        x={restrictedWidth / 2}
        y={restrictedHeight}
        radiusX={restrictedWidth / 2}
        radiusY={restrictedWidth / 8}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
      />
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        strokeWidth={2}
        fill={fill}
      />
      <Line
        points={[0, 0, 0, restrictedHeight]}
        stroke={stroke}
        strokeWidth={2}
      />
      <Line
        points={[restrictedWidth, 0, restrictedWidth, restrictedHeight]}
        stroke={stroke}
        strokeWidth={2}
      />
      <Ellipse
        x={restrictedWidth / 2}
        y={0}
        radiusX={restrictedWidth / 2}
        radiusY={restrictedWidth / 8}
        fill="#CFCFCF"
        stroke={stroke}
        strokeWidth={2}
      />
    </Group>
  );
});
