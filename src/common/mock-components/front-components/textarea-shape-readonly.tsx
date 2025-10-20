import { forwardRef, useMemo } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
const textAreaShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 44,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 55,
};
export const getTextAreaSizeRestrictions = (): ShapeSizeRestrictions =>
  textAreaShapeRestrictions;
export const TextAreaShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Textarea",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    textAreaShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  
  const { stroke, fill, textColor, borderRadius, fontSize } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        stroke={stroke}
        strokeWidth={1}
        fill={fill}
        cornerRadius={borderRadius}
      />
            <Text
        x={5}
        y={5}
        width={restrictedWidth - 10}
        height={restrictedHeight - 10}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={fontSize}
        fill={textColor}
      />
    </Group>
  );
});
