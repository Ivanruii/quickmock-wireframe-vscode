import { forwardRef } from "react";
import { Group, Rect, Text, Circle } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const AppBarSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 48,
  maxWidth: -1,
  maxHeight: 80,
  defaultWidth: 400,
  defaultHeight: 56,
};

export const getAppBarSizeRestrictions = (): ShapeSizeRestrictions =>
  AppBarSizeRestrictions;

export const AppBarShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    AppBarSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const backgroundColor = otherProps?.backgroundColor || "#1976d2";
  const stroke = otherProps?.stroke || "#1565c0";
  const textColor = otherProps?.textColor || "white";

  const iconSize = 24;
  const padding = 16;

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* App bar background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={backgroundColor}
        stroke={stroke}
        strokeWidth={1}
      />

      {/* Menu icon (hamburger) */}
      <Group x={padding} y={(restrictedHeight - iconSize) / 2}>
        <Rect x={0} y={4} width={iconSize} height={2} fill={textColor} />
        <Rect x={0} y={11} width={iconSize} height={2} fill={textColor} />
        <Rect x={0} y={18} width={iconSize} height={2} fill={textColor} />
      </Group>

      {/* Title */}
      <Text
        x={padding * 3}
        y={(restrictedHeight - 16) / 2}
        text={text || "App Title"}
        fontSize={18}
        fill={textColor}
        fontFamily="Arial"
        fontStyle="bold"
      />

      {/* Search icon */}
      <Group
        x={restrictedWidth - padding * 4 - iconSize}
        y={(restrictedHeight - iconSize) / 2}
      >
        <Circle
          x={iconSize / 2 - 3}
          y={iconSize / 2 - 3}
          radius={6}
          stroke={textColor}
          strokeWidth={2}
          fill="transparent"
        />
        <Rect
          x={iconSize / 2 + 4}
          y={iconSize / 2 + 4}
          width={6}
          height={2}
          fill={textColor}
          rotation={45}
        />
      </Group>

      {/* More options icon (three dots) */}
      <Group
        x={restrictedWidth - padding - iconSize}
        y={(restrictedHeight - iconSize) / 2}
      >
        <Circle x={6} y={iconSize / 2} radius={2} fill={textColor} />
        <Circle x={12} y={iconSize / 2} radius={2} fill={textColor} />
        <Circle x={18} y={iconSize / 2} radius={2} fill={textColor} />
      </Group>

      {/* Shadow effect */}
      <Rect
        x={0}
        y={restrictedHeight}
        width={restrictedWidth}
        height={2}
        fill="rgba(0,0,0,0.1)"
      />
    </Group>
  );
});
