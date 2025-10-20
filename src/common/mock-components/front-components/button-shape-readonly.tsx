import { ShapeSizeRestrictions } from "@/common/types";
import { forwardRef } from "react";
import { ShapeProps } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { Group, Rect, Text } from "react-konva";
import { BASIC_SHAPE } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";

const buttonShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 35,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 100,
  defaultHeight: 35,
};

export const getButtonShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  buttonShapeRestrictions;

export const ButtonShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    text = "Button",
    otherProps,
    ...shapeProps
  } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    buttonShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const {
    stroke,
    strokeStyle,
    fill,
    textColor,
    borderRadius,
    disabled,
    fontSize,
    strokeWidth,
  } = useShapeProps(otherProps, BASIC_SHAPE);

  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={borderRadius}
        stroke={disabled ? "#c0c0c0" : stroke}
        dash={strokeStyle}
        strokeWidth={strokeWidth}
        fill={disabled ? "#f5f5f5" : fill}
      />
      <Text
        x={0}
        y={(restrictedHeight - fontSize) / 2}
        width={restrictedWidth}
        height={restrictedHeight - restrictedHeight / 2 - 5}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={fontSize}
        lineHeight={BASIC_SHAPE.DEFAULT_LINE_HEIGHT}
        fill={disabled ? "#808080" : textColor}
        align="center"
        ellipsis={true}
        wrap="none"
        fontStyle="bold"
        letterSpacing={1}
      />
    </Group>
  );
});
