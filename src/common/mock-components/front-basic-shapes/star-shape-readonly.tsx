import { forwardRef } from "react";
import { Group, Star } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const starShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getStarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  starShapeRestrictions;

export const StarShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    starShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const stroke = otherProps?.stroke || "black";
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);
  const fill = otherProps?.backgroundColor || "transparent";

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Star
        x={restrictedWidth / 2}
        y={restrictedHeight / 2}
        width={restrictedWidth}
        height={restrictedHeight}
        numPoints={5}
        innerRadius={restrictedWidth / 4}
        outerRadius={restrictedWidth / 2}
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={fill}
      />
    </Group>
  );
});
