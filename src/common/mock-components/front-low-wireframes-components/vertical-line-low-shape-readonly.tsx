import { forwardRef } from "react";
import { Group, Line, Rect } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const verticalLineLowShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 30,
  maxWidth: 10,
  maxHeight: -1,
  defaultWidth: 10,
  defaultHeight: 200,
};

export const getVerticalLineLowShapeSizeRestrictions =
  (): ShapeSizeRestrictions => verticalLineLowShapeRestrictions;

export const VerticalLineLowShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, text, otherProps, ...restProps } = props;

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      verticalLineLowShapeRestrictions,
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
          x={restrictedWidth / 2}
          y={0}
          points={[0, 0, 0, restrictedHeight]}
          stroke={stroke}
          strokeWidth={strokeWidth}
          dash={strokeStyle}
        />
      </Group>
    );
  }
);
