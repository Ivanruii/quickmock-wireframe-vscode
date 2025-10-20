import { forwardRef } from "react";
import { Group, Rect, Line, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
const CHECKBOX_DEFAULT_HEIGHT = 20;
const checkBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: CHECKBOX_DEFAULT_HEIGHT,
  maxWidth: -1,
  maxHeight: CHECKBOX_DEFAULT_HEIGHT,
  defaultWidth: 150,
  defaultHeight: CHECKBOX_DEFAULT_HEIGHT,
};
export const getCheckboxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  checkBoxShapeRestrictions;
const marginTick = 5;
const boxTickWidth = CHECKBOX_DEFAULT_HEIGHT;
const tickWidth = boxTickWidth;
const marginText = 3;
export const CheckBoxShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Checkbox",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    checkBoxShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  
  const { stroke, textColor, isOn } = useShapeProps(otherProps, BASIC_SHAPE);
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={boxTickWidth}
        height={restrictedHeight}
        cornerRadius={BASIC_SHAPE.DEFAULT_CORNER_RADIUS}
        stroke={stroke}
        strokeWidth={1}
        fill="white"
      />
      {isOn && (
        <Line
          x={0}
          y={0}
          points={[
            marginTick,
            boxTickWidth / 2,
            marginTick + boxTickWidth / 5,
            boxTickWidth - marginTick,
            tickWidth - marginTick,
            marginTick,
          ]}
          stroke={stroke}
          strokeWidth={1}
          lineCap="round"
          lineJoin="round"
        />
      )}
      <Text
        x={boxTickWidth + 10}
        y={marginText}
        width={restrictedWidth - boxTickWidth - 10}
        height={restrictedHeight - marginText}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={15}
        fill={textColor}
        align="left"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
