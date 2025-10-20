import { forwardRef } from "react";
import { Group, Rect, Text, Path } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
const timepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: 220,
  defaultHeight: 38,
};
export const getTimepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => timepickerInputShapeRestrictions;
export const TimepickerInputShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const {
      x,
      y,
      width,
      height,
      id,
      onSelected,
      text = "HH:MM:SS",
      otherProps,
      ...shapeProps
    } = props;
    const restrictedSize = fitSizeToShapeSizeRestrictions(
      timepickerInputShapeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const { stroke, fill, textColor, borderRadius, fontSize } = useShapeProps(
      otherProps,
      BASIC_SHAPE
    );

    const displayTime = text || "12:00 PM";
    const iconWidth = 20;
    return (
      <Group ref={ref} x={x} y={y} {...shapeProps}>
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={borderRadius}
          stroke={stroke}
          strokeWidth={1}
          fill={fill}
        />
                <Text
          x={5}
          y={0}
          width={restrictedWidth - 30}
          height={restrictedHeight}
          text={displayTime}
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={fontSize}
          fill={textColor}
          align="left"
          verticalAlign="middle"
        />
        {/* Clock icon placeholder */}
        <Text
          x={restrictedWidth - iconWidth - 5}
          y={10}
          text="🕐"
          fontSize={16}
          width={iconWidth}
          align="center"
        />
      </Group>
    );
  }
);
