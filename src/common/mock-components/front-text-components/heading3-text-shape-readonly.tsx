import { forwardRef } from "react";
import { Group, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "../front-components/shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";

const heading3SizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 25,
};

export const getHeading3SizeRestrictions = (): ShapeSizeRestrictions =>
  heading3SizeRestrictions;

export const Heading3Shape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    heading3SizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const {
    textColor,
    textDecoration,
    fontSize,
    fontStyle,
    fontVariant,
    textAlignment,
  } = useShapeProps(otherProps, BASIC_SHAPE);

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Text
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={fontSize}
        fill={textColor}
        align={textAlignment}
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
        fontStyle={fontStyle}
        fontVariant={fontVariant}
        textDecoration={textDecoration}
      />
    </Group>
  );
});
