import { forwardRef } from "react";
import { Group, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const normaltextSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 40,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: 30,
  defaultWidth: 500,
  defaultHeight: 25,
};

export const getNormaltextSizeRestrictions = (): ShapeSizeRestrictions =>
  normaltextSizeRestrictions;

export const NormaltextShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    normaltextSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const textColor = otherProps?.textColor || "black";
  const textDecoration = otherProps?.textDecoration || "none";
  const fontStyle = otherProps?.fontStyle || "normal";
  const fontVariant = otherProps?.fontVariant || "normal";
  const fontSize = otherProps?.fontSize || 14;
  const textAlignment = otherProps?.textAlignment || "left";
  const fontFamily = otherProps?.fontFamily || "Arial, sans-serif";

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Text
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        text={text}
        fontFamily={fontFamily}
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
