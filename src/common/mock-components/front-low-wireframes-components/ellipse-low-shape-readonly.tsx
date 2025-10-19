import { forwardRef } from "react";
import { Group, Ellipse } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { getStrokeStyle, fitSizeToShapeSizeRestrictions } from "@/common/utils";

const ellipseLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 50,
};

export const getEllipseLowShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  ellipseLowShapeRestrictions;

export const EllipseLowShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    ellipseLowShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const stroke = otherProps?.stroke || "black";
  const fill = otherProps?.fill || "white";
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);

  const strokeWidth = 4;

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Ellipse
        x={restrictedWidth / 2}
        y={restrictedHeight / 2}
        radiusX={restrictedWidth / 2}
        radiusY={restrictedHeight / 2}
        strokeWidth={strokeWidth}
        stroke={stroke}
        fill={fill}
        dash={strokeStyle}
      />
    </Group>
  );
});
