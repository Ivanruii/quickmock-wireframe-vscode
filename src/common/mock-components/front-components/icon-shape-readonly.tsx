import { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
const iconShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 25,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 150,
};
export const getIconShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  iconShapeRestrictions;
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
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    iconShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  
  const { stroke, fill, textColor, borderRadius } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );
  
  const iconName = otherProps?.icon || "🏠"; // Default house icon
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      {/* Icon background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={borderRadius}
      />
      {/* Icon placeholder - using emoji */}
            <Text
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        text={iconName}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={16}
        fill={textColor}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
});
