import { forwardRef } from "react";
import { Group, Circle, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
const RADIO_BUTTON_DEFAULT_HEIGHT = 18;
const radioButtonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: RADIO_BUTTON_DEFAULT_HEIGHT,
  maxWidth: -1,
  maxHeight: RADIO_BUTTON_DEFAULT_HEIGHT,
  defaultWidth: 120,
  defaultHeight: RADIO_BUTTON_DEFAULT_HEIGHT,
};
export const getRadioButtonShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  radioButtonShapeRestrictions;
export const RadioButtonShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "Radio Button",
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    radioButtonShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const radius = restrictedHeight / 2;
  
  const { textColor, stroke, isOn } = useShapeProps(otherProps, BASIC_SHAPE);
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      {/* Outer circle radio button */}
      <Circle
        x={radius}
        y={radius}
        radius={radius}
        stroke={stroke}
        strokeWidth={1}
        fill="white"
      />
      {/* Inner filled circle when selected */}
      {isOn && (
        <Circle x={radius} y={radius} radius={radius * 0.5} fill={stroke} />
      )}
      <Text
        x={restrictedHeight + 10}
        y={3}
        width={restrictedWidth - restrictedHeight - 10}
        height={restrictedHeight - 3}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={13}
        fill={textColor}
        align="left"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
