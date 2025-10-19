import { forwardRef } from "react";
import { Group, Circle, Text, Rect } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const FabButtonSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 56,
  minHeight: 56,
  maxWidth: 80,
  maxHeight: 80,
  defaultWidth: 56,
  defaultHeight: 56,
};

export const getFabButtonSizeRestrictions = (): ShapeSizeRestrictions =>
  FabButtonSizeRestrictions;

export const FabButtonShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    FabButtonSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const backgroundColor = otherProps?.backgroundColor || "#007bff";
  const stroke = otherProps?.stroke || "#0056b3";
  const textColor = otherProps?.textColor || "white";

  const radius = Math.min(restrictedWidth, restrictedHeight) / 2;
  const centerX = restrictedWidth / 2;
  const centerY = restrictedHeight / 2;

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Shadow */}
      <Circle
        x={centerX + 2}
        y={centerY + 2}
        radius={radius}
        fill="rgba(0,0,0,0.3)"
      />

      {/* Main button circle */}
      <Circle
        x={centerX}
        y={centerY}
        radius={radius}
        fill={backgroundColor}
        stroke={stroke}
        strokeWidth={1}
      />

      {/* Icon or text */}
      {text ? (
        <Text
          x={centerX - text.length * 4}
          y={centerY - 8}
          text={text}
          fontSize={16}
          fill={textColor}
          fontFamily="Arial"
          fontStyle="bold"
        />
      ) : (
        /* Default plus icon */
        <Group>
          <Rect
            x={centerX - 8}
            y={centerY - 1}
            width={16}
            height={2}
            fill={textColor}
          />
          <Rect
            x={centerX - 1}
            y={centerY - 8}
            width={2}
            height={16}
            fill={textColor}
          />
        </Group>
      )}

      {/* Ripple effect (for hover state) */}
      <Circle
        x={centerX}
        y={centerY}
        radius={radius * 0.8}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={2}
        fill="transparent"
        opacity={0.6}
      />
    </Group>
  );
});
