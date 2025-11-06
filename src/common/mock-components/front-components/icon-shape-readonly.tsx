import { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps } from "@/common/types";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
import { IconSize } from "@/core/model";

export const returnIconSize = (iconSize: IconSize): number[] => {
  switch (iconSize) {
    case 'XS':
      return [25, 25];
    case 'S':
      return [50, 50];
    case 'M':
      return [100, 100];
    case 'L':
      return [125, 125];
    case 'XL':
      return [150, 150];
    default:
      return [50, 50];
  }
};

export const IconShape = forwardRef<any, ShapeProps>((props, ref) => {
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
  const { stroke, fill, textColor, fontSize } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

  const [iconWidth, iconHeight] = returnIconSize(otherProps?.icon?.size || 'M');
  
  const iconName = otherProps?.icon?.name || "🏠";

  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      {/* Icon background */}
      <Rect
        x={0}
        y={0}
        width={iconWidth}
        height={iconHeight}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={50}
      />
      {/* TODO: Add icon representation */}
      <Text
        x={0}
        y={0}
        width={iconWidth}
        height={iconHeight}
        text={`${iconName}: icons are not supported yet`}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={fontSize}
        fill={textColor}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
});
