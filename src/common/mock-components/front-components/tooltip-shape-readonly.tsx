import { forwardRef } from "react";
import { Group, Rect, Text, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
const tooltipShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 70,
  maxWidth: -1,
  maxHeight: 500,
  defaultWidth: 120,
  defaultHeight: 100,
};
export const getTooltipShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tooltipShapeRestrictions;
export const TooltipShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Tooltip text",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    tooltipShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { stroke, borderRadius, fontSize, fill, textColor } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

  const pointerHeight = 15;
  const pointerWidth = 20;
  const mainRectHeight = restrictedHeight - pointerHeight;
  const trianglePoints = [
    0, // Left edge of triangle (pegado a la esquina)
    mainRectHeight,
    0, // Borde izquierdo recto (mismo x)
    restrictedHeight,
    pointerWidth, // Right edge of triangle
    mainRectHeight,
  ];
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      {/* Main tooltip rectangle */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={mainRectHeight}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={borderRadius}
      />
      {/* Tooltip text */}
      <Text
        x={10}
        y={10}
        width={restrictedWidth - 20}
        height={mainRectHeight - 20}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={fontSize}
        lineHeight={1.25}
        fill={textColor}
        verticalAlign="middle"
        ellipsis={true}
        align="center"
      />
      {/* Triangle pointer */}
      <Line
        points={trianglePoints}
        closed
        stroke={stroke}
        strokeWidth={1}
        fill={fill}
      />
    </Group>
  );
});
