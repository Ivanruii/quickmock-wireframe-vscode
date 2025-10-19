import { forwardRef } from "react";
import { Group, Line, Rect } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const imagePlaceholderShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getImagePlaceholderShapeSizeRestrictions =
  (): ShapeSizeRestrictions => imagePlaceholderShapeRestrictions;

export const ImagePlaceholderShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, text, otherProps, ...restProps } = props;

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      imagePlaceholderShapeRestrictions,
      width,
      height
    );

    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const strokeWidth = 4;

    const stroke = otherProps?.stroke || "#000000";
    const backgroundColor = otherProps?.backgroundColor || "white";
    const strokeStyle = otherProps?.strokeStyle || [];
    const konvaStroke = getStrokeStyle(strokeStyle);

    return (
      <Group x={x} y={y} {...restProps} ref={ref}>
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          stroke={stroke}
          dash={konvaStroke}
          strokeWidth={strokeWidth}
          fill={backgroundColor}
        />
        <Line
          points={[0, 0, restrictedWidth, restrictedHeight]}
          stroke={stroke}
          dash={konvaStroke}
          strokeWidth={strokeWidth}
        />
        <Line
          points={[restrictedWidth, 0, 0, restrictedHeight]}
          stroke={stroke}
          dash={konvaStroke}
          strokeWidth={strokeWidth}
        />
      </Group>
    );
  }
);
