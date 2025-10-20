import { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
const ChipShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 28,
  maxWidth: -1,
  maxHeight: 28,
  defaultWidth: 56,
  defaultHeight: 28,
};
export const getChipShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  ChipShapeSizeRestrictions;
export const ChipShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    text = "Chip",
    onSelected,
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    ChipShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  
  const { stroke, fill, textColor } = useShapeProps(otherProps, {
    ...BASIC_SHAPE,
    DEFAULT_FILL_BACKGROUND: "#e0e0e0"
  });
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={restrictedHeight / 2}
      />
      <Text
        x={8}
        y={4}
        width={restrictedWidth - 16}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={12}
        fill={textColor}
        verticalAlign="middle"
        align="center"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
