import { forwardRef } from "react";
import { Group, Rect, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const paragraphScribbledShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 60,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 150,
};

export const getParagraphScribbledShapeRestrictions =
  (): ShapeSizeRestrictions => paragraphScribbledShapeRestrictions;

export const ParagraphScribbledShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, text, otherProps, ...restProps } = props;

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      paragraphScribbledShapeRestrictions,
      width,
      height
    );

    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const strokeWidth = 4;

    const stroke = otherProps?.stroke || "#000000";
    const backgroundColor = otherProps?.backgroundColor || "transparent";
    const strokeStyle = otherProps?.strokeStyle || [];
    const konvaStroke = getStrokeStyle(strokeStyle);

    const lineHeight = 18;
    const numberOfLines = Math.floor(restrictedHeight / lineHeight);
    const margin = 5;

    const lines = [];
    for (let i = 0; i < numberOfLines; i++) {
      const y = margin + (i + 0.5) * lineHeight;
      const startX = margin;

      let endX;
      if (i === numberOfLines - 1) {
        endX = startX + (restrictedWidth - 2 * margin) * 0.6;
      } else if (i % 3 === 2) {
        endX = startX + (restrictedWidth - 2 * margin) * 0.8;
      } else {
        endX = restrictedWidth - margin;
      }

      const midX1 = startX + (endX - startX) * 0.3;
      const midX2 = startX + (endX - startX) * 0.7;

      const points = [startX, y, midX1, y - 1, midX2, y + 1, endX, y];

      lines.push(
        <Line
          key={i}
          points={points}
          stroke={stroke}
          dash={konvaStroke}
          strokeWidth={strokeWidth}
          lineCap="round"
          lineJoin="round"
          tension={0.2}
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
  }
);
