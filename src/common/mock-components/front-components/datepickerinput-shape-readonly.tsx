import { forwardRef } from "react";
import { Group, Rect, Text, Path } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
const datepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 38,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: 120,
  defaultHeight: 38,
};
export const getDatepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => datepickerInputShapeRestrictions;
export const DatepickerInputShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const {
      x,
      y,
      width,
      height,
      id,
      onSelected,
      text = "DD/MM/YYYY",
      otherProps,
      ...shapeProps
    } = props;
    const restrictedSize = fitSizeToShapeSizeRestrictions(
      datepickerInputShapeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
    
    const { stroke, fill, textColor, borderRadius } = useShapeProps(otherProps, BASIC_SHAPE);
    
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
          x={10}
          y={10}
          width={restrictedWidth - iconWidth - 20}
          text={text}
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={16}
          lineHeight={1.25}
          fill={textColor}
          align="left"
          ellipsis={true}
          wrap="none"
        />
        {/* Calendar icon placeholder */}
        <Text
          x={restrictedWidth - iconWidth - 5}
          y={10}
          text="📅"
          fontSize={16}
          width={iconWidth}
          align="center"
        />
      </Group>
    );
  }
);
