import { forwardRef } from "react";
import { Group, Circle } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const circleLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 100,
};

export const getCircleLowShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  circleLowShapeRestrictions;

export const CircleLowShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    circleLowShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const radius = Math.min(restrictedWidth, restrictedHeight) / 2;

  const stroke = otherProps?.stroke || "black";
  const fill = otherProps?.fill || "white";
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);

  const strokeWidth = 4;

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Circle
        x={restrictedWidth / 2}
        y={restrictedHeight / 2}
        radius={radius}
        strokeWidth={strokeWidth}
        stroke={stroke}
        fill={fill}
        dash={strokeStyle}
      />
    </Group>
  );
});
