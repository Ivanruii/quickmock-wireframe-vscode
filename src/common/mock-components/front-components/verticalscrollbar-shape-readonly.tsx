import React, { forwardRef } from "react";
import { Group, Line, Rect } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const VerticalScrollBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 100,
  maxWidth: 20,
  maxHeight: -1,
  defaultWidth: 20,
  defaultHeight: 250,
};
export const getVerticalScrollBarShapeSizeRestrictions =
  (): ShapeSizeRestrictions => VerticalScrollBarShapeSizeRestrictions;
export const VerticalScrollBarShape = forwardRef<any, ShapeProps>(
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
      VerticalScrollBarShapeSizeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
    const arrowHeight = 20;
    const thumbHeight = restrictedHeight * 0.3;
    const thumbY =
      arrowHeight + (restrictedHeight - thumbHeight - arrowHeight * 2) / 2;
    const stroke = otherProps?.stroke || SHAPE_CONSTANTS.DEFAULT_STROKE_COLOR;
    const fill = otherProps?.fill || "#f0f0f0";
    return (
      <Group ref={ref} x={x} y={y} {...shapeProps}>
        {/* Background of scrollbar */}
        <Rect
          x={0}
          y={arrowHeight}
          width={restrictedWidth}
          height={restrictedHeight - arrowHeight * 2}
          fill={fill}
          stroke={stroke}
          strokeWidth={1}
        />
        {/* Top arrow */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={arrowHeight}
          fill="#d0d0d0"
          stroke={stroke}
          strokeWidth={1}
        />
        <Line
          points={[
            restrictedWidth / 2,
            6,
            restrictedWidth / 2 - 4,
            arrowHeight - 6,
            restrictedWidth / 2 + 4,
            arrowHeight - 6,
          ]}
          stroke="#666"
          strokeWidth={1}
          closed
          fill="#666"
        />
        {/* Bottom arrow */}
        <Rect
          x={0}
          y={restrictedHeight - arrowHeight}
          width={restrictedWidth}
          height={arrowHeight}
          fill="#d0d0d0"
          stroke={stroke}
          strokeWidth={1}
        />
        <Line
          points={[
            restrictedWidth / 2,
            restrictedHeight - 6,
            restrictedWidth / 2 - 4,
            restrictedHeight - arrowHeight + 6,
            restrictedWidth / 2 + 4,
            restrictedHeight - arrowHeight + 6,
          ]}
          stroke="#666"
          strokeWidth={1}
          closed
          fill="#666"
        />
        {/* Thumb */}
        <Rect
          x={2}
          y={thumbY}
          width={restrictedWidth - 4}
          height={thumbHeight}
          fill="#c0c0c0"
          stroke={stroke}
          strokeWidth={1}
          cornerRadius={2}
        />
      </Group>
    );
  }
);
