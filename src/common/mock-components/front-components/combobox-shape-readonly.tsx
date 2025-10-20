import { forwardRef } from "react";
import { Group, Rect, Text, Path, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
const comboBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 85,
  minHeight: 38,
  maxWidth: -1,
  maxHeight: 38,
  defaultWidth: 120,
  defaultHeight: 38,
};
export const getComboBoxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  comboBoxShapeRestrictions;
export const ComboBoxShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Select Option",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    comboBoxShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  
  const { stroke, fill, textColor, borderRadius } = useShapeProps(otherProps, BASIC_SHAPE);
  
  const arrowSize = 6;
  const arrowX = restrictedWidth - 15;
  const arrowY = restrictedHeight / 2;
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
        width={restrictedWidth - 30}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={16}
        lineHeight={1.25}
        fill={textColor}
        align="left"
        ellipsis={true}
        wrap="none"
      />
      {/* Dropdown arrow */}
      <Line
        points={[
          arrowX - arrowSize / 2,
          arrowY - arrowSize / 3,
          arrowX,
          arrowY + arrowSize / 3,
          arrowX + arrowSize / 2,
          arrowY - arrowSize / 3,
        ]}
        stroke={stroke}
        strokeWidth={1}
        lineCap="round"
        lineJoin="round"
      />
    </Group>
  );
});
