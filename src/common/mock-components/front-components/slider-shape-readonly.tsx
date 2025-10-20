import { forwardRef, useMemo } from "react";
import { Group, Rect, Circle, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
const sliderShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: 30,
  defaultWidth: 300,
  defaultHeight: 20,
};
export const getSliderShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  sliderShapeRestrictions;
export const SliderShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    sliderShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const sliderHeight = 4;
  const thumbRadius = 10;
  const sliderStart = thumbRadius;
  const sliderEnd = restrictedWidth - thumbRadius;
  
  const { progress } = useShapeProps(otherProps, BASIC_SHAPE);
  const fill = otherProps?.fill || "#007ACC";
  
  const thumbPosition = useMemo(() => {
    const range = sliderEnd - sliderStart;
    return sliderStart + (progress / 100) * range;
  }, [progress, sliderStart, sliderEnd]);
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      {/* Slider middle line */}
      <Line
        points={[
          sliderStart,
          restrictedHeight / 2,
          sliderEnd,
          restrictedHeight / 2,
        ]}
        stroke="lightgrey"
        strokeWidth={sliderHeight}
        lineCap="round"
      />
      {/* Slider thumb */}
      <Circle
        x={thumbPosition}
        y={restrictedHeight / 2}
        radius={thumbRadius}
        fill={fill}
        stroke="black"
        strokeWidth={1}
      />
    </Group>
  );
});
