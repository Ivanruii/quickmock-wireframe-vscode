import { forwardRef, useMemo } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const ButtonBarSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 500,
  defaultHeight: 50,
};

export const getButtonBarSizeRestrictions = (): ShapeSizeRestrictions =>
  ButtonBarSizeRestrictions;

const parseButtons = (text: string) => {
  if (!text) return [];
  return text
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);
};

export const ButtonBarShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    ButtonBarSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const backgroundColor = otherProps?.backgroundColor || "#f8f9fa";
  const stroke = otherProps?.stroke || "#dee2e6";
  const textColor = otherProps?.textColor || "#333";
  const activeElement = otherProps?.activeElement || 0;

  const buttonLabels = useMemo(() => parseButtons(text || ""), [text]);

  if (buttonLabels.length === 0) return null;

  const dynamicButtonWidth = restrictedWidth / buttonLabels.length;

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Container background - Not drawn, borders between buttons show the separation */}

      {/* Buttons */}
      {buttonLabels.map((label, index) => {
        const isActive = index === activeElement;

        return (
          <Group key={index} x={index * dynamicButtonWidth}>
            <Rect
              width={dynamicButtonWidth}
              height={restrictedHeight}
              fill={isActive ? "#e3f2fd" : backgroundColor}
              stroke={stroke}
              strokeWidth={1}
            />
            <Text
              x={0}
              y={0}
              width={dynamicButtonWidth}
              height={restrictedHeight}
              text={label}
              fontSize={14}
              fill={textColor}
              fontFamily="Arial"
              align="center"
              verticalAlign="middle"
              ellipsis={true}
              wrap="none"
            />
          </Group>
        );
      })}

      {/* Separator lines */}
      {buttonLabels.slice(0, -1).map((_, index) => (
        <Rect
          key={`sep-${index}`}
          x={(index + 1) * dynamicButtonWidth - 0.5}
          y={0}
          width={1}
          height={restrictedHeight}
          fill={stroke}
        />
      ))}
    </Group>
  );
});
