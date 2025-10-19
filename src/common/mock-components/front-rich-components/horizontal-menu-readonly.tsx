import { forwardRef, useMemo } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const HorizontalMenuSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 500,
  defaultHeight: 50,
};

export const getHorizontalMenuSizeRestrictions = (): ShapeSizeRestrictions =>
  HorizontalMenuSizeRestrictions;

// Parse text format: "Home, About, Services, Contact"
const parseMenuItems = (text: string) => {
  if (!text) return [];
  return text
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);
};

export const HorizontalMenuShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    HorizontalMenuSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const backgroundColor = otherProps?.backgroundColor || "#ffffff";
  const stroke = otherProps?.stroke || "#000000";
  const textColor = otherProps?.textColor || "#333";
  const activeElement = otherProps?.activeElement || 0;

  const menuLabels = useMemo(() => parseMenuItems(text || ""), [text]);

  if (menuLabels.length === 0) return null;

  const dynamicItemWidth = restrictedWidth / menuLabels.length;

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Menu items */}
      {menuLabels.map((label, index) => {
        const isActive = index === activeElement;

        return (
          <Group key={index} x={index * dynamicItemWidth}>
            {/* Item background */}
            <Rect
              width={dynamicItemWidth}
              height={restrictedHeight}
              fill={isActive ? "#e3f2fd" : backgroundColor}
              stroke={stroke}
              strokeWidth={1}
            />

            {/* Item text */}
            <Text
              x={0}
              y={0}
              width={dynamicItemWidth}
              height={restrictedHeight}
              text={label}
              fontFamily="Arial"
              fontSize={14}
              fill={textColor}
              align="center"
              verticalAlign="middle"
              wrap="none"
              ellipsis={true}
            />
          </Group>
        );
      })}

      {/* Separator lines */}
      {menuLabels.slice(0, -1).map((_, index) => (
        <Rect
          key={`sep-${index}`}
          x={(index + 1) * dynamicItemWidth - 0.5}
          y={0}
          width={1}
          height={restrictedHeight}
          fill={stroke}
        />
      ))}
    </Group>
  );
});
