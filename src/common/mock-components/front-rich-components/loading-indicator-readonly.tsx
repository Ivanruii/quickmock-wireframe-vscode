import { forwardRef } from "react";
import { Group, Rect, Text, Circle } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const LoadIndicatorSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 100,
};

export const getLoadIndicatorSizeRestrictions = (): ShapeSizeRestrictions =>
  LoadIndicatorSizeRestrictions;

export const LoadIndicator = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, ...shapeProps } = props;

  const restrictedSize = {
    width: width || LoadIndicatorSizeRestrictions.defaultWidth,
    height: height || LoadIndicatorSizeRestrictions.defaultHeight,
  };

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const colors = ["#666", "#888", "#aaa", "#ccc"];

  const circleRadius = Math.min(restrictedWidth / 10, 15);
  const circleSpacing = restrictedWidth / (colors.length + 1);

  return (
    <Group x={x} y={y} ref={ref} {...shapeProps}>
      {/* Load Indicator Background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        strokeWidth={1}
      />

      {/* Animated Circles */}
      {colors.map((color, index) => (
        <Circle
          key={index}
          x={circleSpacing * (index + 1)}
          y={restrictedHeight / 2}
          radius={circleRadius}
          fill={color}
          stroke="#000"
          strokeWidth={2}
        />
      ))}

      {/* Loading Text */}
      <Text
        x={0}
        y={restrictedHeight - 25}
        width={restrictedWidth}
        text={props.text || "Loading..."}
        fontFamily="Arial"
        fontSize={12}
        fill="#333"
        align="center"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});

export default LoadIndicator;
