import React, { forwardRef, useMemo } from "react";
import { Group, Rect } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const progressBarShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: 30,
  defaultWidth: 300,
  defaultHeight: 20,
};
export const getProgressBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  progressBarShapeRestrictions;
export const ProgressBarShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    progressBarShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const progress = otherProps?.progress || 50; // 0-100
  const borderRadius =
    otherProps?.borderRadius || SHAPE_CONSTANTS.DEFAULT_BORDER_RADIUS;
  const fill = otherProps?.fill || "#007ACC";
  const stroke = otherProps?.stroke || SHAPE_CONSTANTS.DEFAULT_STROKE_COLOR;
  const progressWidth = useMemo(
    () => (progress / 100) * restrictedWidth,
    [progress, restrictedWidth]
  );
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      {/* Progressbar background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={borderRadius}
        stroke={stroke}
        strokeWidth={2}
        fill="white"
      />
      {/* Progressbar progress */}
      <Rect
        x={0}
        y={0}
        width={progressWidth}
        height={restrictedHeight}
        cornerRadius={borderRadius}
        stroke={stroke}
        strokeWidth={2}
        fill={fill}
      />
    </Group>
  );
});
