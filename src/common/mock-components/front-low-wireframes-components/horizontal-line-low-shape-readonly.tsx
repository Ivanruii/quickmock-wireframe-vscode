import { forwardRef } from "react";
import { Group, Line, Rect } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const horizontalLineLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 30,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: 10,
  defaultWidth: 200,
  defaultHeight: 10,
};

export const getHorizontalLineLowShapeSizeRestrictions =
  (): ShapeSizeRestrictions => horizontalLineLowShapeRestrictions;

export const HorizontalLineLowShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, text, otherProps, ...restProps } = props;

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      horizontalLineLowShapeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const stroke = otherProps?.stroke || "black";
    const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);

    const strokeWidth = 4;

    return (
      <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
        {/* Transparent rectangle for applying margin */}
        <Rect
          width={restrictedWidth}
          height={restrictedHeight}
          fill="transparent"
        />

        <Line
          x={0}
          y={restrictedHeight / 2}
          points={[0, 0, restrictedWidth, 0]}
          stroke={stroke}
          strokeWidth={strokeWidth}
          dash={strokeStyle}
        />
      </Group>
    );
  }
);
