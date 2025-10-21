import { forwardRef } from "react";
import { Group, Rect, Circle, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "../front-components/shape.const";

const tabletShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 650,
  defaultHeight: 500,
};

export const getTabletShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tabletShapeSizeRestrictions;

export const TabletShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    tabletShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const margin = 20;
  const screenMargin = 15;
  const cameraRadius = 3;
  const buttonRadius = 5;

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      {/* Tablet frame */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={20}
        stroke="black"
        strokeWidth={2}
        fill="white"
      />

      {/* Tablet screen */}
      <Rect
        x={margin + screenMargin}
        y={margin + screenMargin}
        width={restrictedWidth - 2 * margin - 2 * screenMargin}
        height={restrictedHeight - 2 * margin - 2 * screenMargin}
        cornerRadius={10}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />

      {/* Front camera */}
      <Circle
        x={margin}
        y={restrictedHeight / 2}
        radius={cameraRadius}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />

      {/* Home button */}
      <Circle
        x={restrictedWidth - margin}
        y={restrictedHeight / 2}
        radius={buttonRadius}
        stroke="black"
        strokeWidth={1.5}
        fill="white"
      />

      {/* Text content */}
      {text && (
        <Text
          x={margin + screenMargin + 10}
          y={margin + screenMargin + 10}
          width={restrictedWidth - 2 * margin - 2 * screenMargin - 20}
          height={restrictedHeight - 2 * margin - 2 * screenMargin - 20}
          text={text}
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={16}
          fill="black"
          wrap="word"
        />
      )}
    </Group>
  );
});
