import { forwardRef, useMemo } from "react";
import { Group, Rect, Text, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const VerticalMenuSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 150,
  minHeight: 100,
  maxWidth: 300,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 200,
};

export const getVerticalMenuSizeRestrictions = (): ShapeSizeRestrictions =>
  VerticalMenuSizeRestrictions;

// Parse text format: "Option 1, Option 2, ----, Option 3" (---- is separator)
const parseMenuItems = (text: string) => {
  if (!text) return [];
  return text.split(",").map((item) => {
    const trimmed = item.trim();
    return {
      label: trimmed,
      isSeparator: trimmed === "----",
    };
  });
};

export const VerticalMenuShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    VerticalMenuSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const backgroundColor = otherProps?.backgroundColor || "#ffffff";
  const stroke = otherProps?.stroke || "#cccccc";
  const textColor = otherProps?.textColor || "#333333";
  const activeElement = otherProps?.activeElement || 0;

  const menuItems = useMemo(() => parseMenuItems(text || ""), [text]);

  if (menuItems.length === 0) return null;

  const itemHeight = 35;
  const separatorHeight = 1;

  let currentY = 0;

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Menu background and border */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={backgroundColor}
        stroke={stroke}
        strokeWidth={1}
      />

      {/* Menu items */}
      {menuItems.map((item, index) => {
        const itemY = currentY;
        const isActive = index === activeElement && !item.isSeparator;

        if (item.isSeparator) {
          currentY += separatorHeight;
          return (
            <Group key={index}>
              <Line
                points={[0, itemY, restrictedWidth, itemY]}
                stroke={stroke}
                strokeWidth={1}
              />
            </Group>
          );
        }

        currentY += itemHeight;

        return (
          <Group key={index}>
            {/* Item background */}
            <Rect
              x={0}
              y={itemY}
              width={restrictedWidth}
              height={itemHeight}
              fill={isActive ? "#e3f2fd" : backgroundColor}
              stroke={stroke}
              strokeWidth={0}
            />

            {/* Separator line after item if it's not the last one and there's a separator next */}
            {index < menuItems.length - 1 &&
              menuItems[index + 1].isSeparator && (
                <Line
                  points={[
                    0,
                    itemY + itemHeight,
                    restrictedWidth,
                    itemY + itemHeight,
                  ]}
                  stroke={stroke}
                  strokeWidth={1}
                />
              )}

            {/* Label */}
            <Text
              x={12}
              y={itemY + (itemHeight - 14) / 2}
              text={item.label}
              fontSize={13}
              fill={textColor}
              fontFamily="Arial"
              width={restrictedWidth - 24}
              ellipsis={true}
              wrap="none"
            />
          </Group>
        );
      })}
    </Group>
  );
});
