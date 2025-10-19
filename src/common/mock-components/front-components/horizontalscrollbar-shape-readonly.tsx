import React, { forwardRef } from "react";
import { Group, Line, Rect } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const HorizontalScrollBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: 20,
  defaultWidth: 250,
  defaultHeight: 20,
};
export const getHorizontalScrollBarShapeSizeRestrictions =
  (): ShapeSizeRestrictions => HorizontalScrollBarShapeSizeRestrictions;
export const HorizontalScrollBarShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const {
      x,
      y,
      width,
      height,
      id,
      onSelected,
      text,
      otherProps,
      ...shapeProps
    } = props;
    const restrictedSize = fitSizeToShapeSizeRestrictions(
      HorizontalScrollBarShapeSizeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
    const arrowWidth = 20;
    const thumbWidth = restrictedWidth * 0.3;
    const thumbX =
      arrowWidth + (restrictedWidth - thumbWidth - arrowWidth * 2) / 2;
    const stroke = otherProps?.stroke || SHAPE_CONSTANTS.DEFAULT_STROKE_COLOR;
    const fill = otherProps?.fill || "#f0f0f0";
    return (
      <Group ref={ref} x={x} y={y} {...shapeProps}>
        {/* Background of scrollbar */}
        <Rect
          x={arrowWidth}
          y={0}
          width={restrictedWidth - arrowWidth * 2}
          height={restrictedHeight}
          fill={fill}
          stroke={stroke}
          strokeWidth={1}
        />
        {/* Left arrow */}
        <Rect
          x={0}
          y={0}
          width={arrowWidth}
          height={restrictedHeight}
          fill="#d0d0d0"
          stroke={stroke}
          strokeWidth={1}
        />
        <Line
          points={[
            arrowWidth - 6,
            restrictedHeight / 2,
            6,
            restrictedHeight / 2 - 4,
            6,
            restrictedHeight / 2 + 4,
          ]}
          stroke="#666"
          strokeWidth={1}
          closed
          fill="#666"
        />
        {/* Right arrow */}
        <Rect
          x={restrictedWidth - arrowWidth}
          y={0}
          width={arrowWidth}
          height={restrictedHeight}
          fill="#d0d0d0"
          stroke={stroke}
          strokeWidth={1}
        />
        <Line
          points={[
            restrictedWidth - arrowWidth + 6,
            restrictedHeight / 2,
            restrictedWidth - 6,
            restrictedHeight / 2 - 4,
            restrictedWidth - 6,
            restrictedHeight / 2 + 4,
          ]}
          stroke="#666"
          strokeWidth={1}
          closed
          fill="#666"
        />
        {/* Thumb */}
        <Rect
          x={thumbX}
          y={2}
          width={thumbWidth}
          height={restrictedHeight - 4}
          fill="#c0c0c0"
          stroke={stroke}
          strokeWidth={1}
          cornerRadius={2}
        />
      </Group>
    );
  }
);
