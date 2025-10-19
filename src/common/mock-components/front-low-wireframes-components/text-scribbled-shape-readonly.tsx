import { forwardRef } from "react";
import { Group, Rect, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const textScribbledShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 45,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 50,
};

export const getTextScribbledShapeRestrictions = (): ShapeSizeRestrictions =>
  textScribbledShapeRestrictions;

export const TextScribbledShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    textScribbledShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const strokeWidth = 4;

  const stroke = otherProps?.stroke || "#000000";
  const backgroundColor = otherProps?.backgroundColor || "transparent";
  const strokeStyle = otherProps?.strokeStyle || [];
  const konvaStroke = getStrokeStyle(strokeStyle);

  const lineHeight = 15;
  const numberOfLines = Math.floor(restrictedHeight / lineHeight);

  const lines = [];
  for (let i = 0; i < numberOfLines; i++) {
    const y = (i + 0.5) * lineHeight;
    const startX = 5;
    const endX = restrictedWidth - 10;
    const midX1 = startX + (endX - startX) * 0.25;
    const midX2 = startX + (endX - startX) * 0.75;

    const points = [startX, y, midX1, y - 2, midX2, y + 2, endX, y];

    lines.push(
      <Line
        key={i}
        points={points}
        stroke={stroke}
        dash={konvaStroke}
        strokeWidth={strokeWidth}
        lineCap="round"
        lineJoin="round"
        tension={0.3}
      />
    );
  }

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Invisible rect for drag/drop */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={backgroundColor}
        stroke="transparent"
        strokeWidth={0}
      />
      {lines}
    </Group>
  );
});
