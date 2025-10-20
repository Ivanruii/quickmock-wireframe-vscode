import { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";

const inputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: 100,
  defaultHeight: 38,
};
export const getInputShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputShapeRestrictions;
export const InputShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Input text",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    inputShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  
  const { stroke, fill, textColor, borderRadius, isPlaceholder, isPassword } = 
    useShapeProps(otherProps, BASIC_SHAPE);

  const maskPassword = (text: string) => {
    const maskSymbol = "●";
    return maskSymbol.repeat(text.length);
  };
  
  const finalText = isPassword && !isPlaceholder ? maskPassword(text) : text;
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={borderRadius}
        stroke={stroke}
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
        fill={fill}
      />
      <Text
        x={BASIC_SHAPE.DEFAULT_PADDING}
        y={BASIC_SHAPE.DEFAULT_PADDING + 1}
        width={restrictedWidth - BASIC_SHAPE.DEFAULT_PADDING * 2}
        text={finalText}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={BASIC_SHAPE.DEFAULT_FONT_SIZE}
        lineHeight={BASIC_SHAPE.DEFAULT_LINE_HEIGHT}
        fill={isPlaceholder ? "#8c8c8c" : textColor}
        align="left"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
