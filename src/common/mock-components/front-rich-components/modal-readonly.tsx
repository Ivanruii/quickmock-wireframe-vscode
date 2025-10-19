import { forwardRef, useMemo } from "react";
import { Group, Rect, Text, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const ModalSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 400,
  defaultHeight: 300,
};

export const getModalSizeRestrictions = (): ShapeSizeRestrictions =>
  ModalSizeRestrictions;

// Parse text format: "Title\nContent\nButton1,Button2"
const parseModal = (text: string) => {
  if (!text) return { title: "Modal", content: "", buttons: [] };

  const parts = text.split("\n");
  const title = parts[0] || "Modal";
  const content = parts[1] || "";
  const buttonStr = parts[2] || "";
  const buttons = buttonStr
    .split(",")
    .map((btn) => btn.trim())
    .filter(Boolean);

  return {
    title,
    content,
    buttons: buttons.length > 0 ? buttons : ["Cancel", "OK"],
  };
};

export const ModalShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    ModalSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const backgroundColor = otherProps?.backgroundColor || "#ffffff";
  const stroke = otherProps?.stroke || "#ccc";
  const textColor = otherProps?.textColor || "#333";

  const modal = useMemo(() => parseModal(text || ""), [text]);

  const headerHeight = 50;
  const footerHeight = 80;
  const buttonWidth = 90;
  const buttonHeight = 35;
  const buttonSpacing = 15;

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Modal container */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={backgroundColor}
        stroke={stroke}
        strokeWidth={2}
      />

      {/* Header */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={headerHeight}
        fill="#888888"
        stroke={stroke}
        strokeWidth={1}
      />

      {/* Header title */}
      <Text
        x={16}
        y={(headerHeight - 16) / 2}
        text={modal.title}
        fontSize={14}
        fill="#ffffff"
        fontFamily="Arial"
        fontStyle="bold"
      />

      {/* Close button (X) */}
      <Group x={restrictedWidth - 28} y={headerHeight / 2 - 8}>
        <Rect x={0} y={0} width={20} height={20} fill="#ffffff" />
        <Line points={[5, 5, 15, 15]} stroke="#666666" strokeWidth={2} />
        <Line points={[15, 5, 5, 15]} stroke="#666666" strokeWidth={2} />
      </Group>

      {/* Content area */}
      <Rect
        x={0}
        y={headerHeight}
        width={restrictedWidth}
        height={restrictedHeight - headerHeight - footerHeight}
        fill={backgroundColor}
      />

      <Text
        x={16}
        y={headerHeight + 20}
        text={modal.content}
        fontSize={12}
        fill="#666"
        fontFamily="Arial"
        width={restrictedWidth - 32}
        wrap="word"
      />

      {/* Footer */}
      <Rect
        x={0}
        y={restrictedHeight - footerHeight}
        width={restrictedWidth}
        height={footerHeight}
        fill={backgroundColor}
      />

      {/* Footer buttons */}
      {modal.buttons.map((buttonLabel, index) => {
        const buttonX =
          (restrictedWidth -
            (buttonWidth * modal.buttons.length +
              buttonSpacing * (modal.buttons.length - 1))) /
            2 +
          index * (buttonWidth + buttonSpacing);
        const buttonY =
          restrictedHeight - footerHeight + (footerHeight - buttonHeight) / 2;

        return (
          <Group key={index}>
            {/* Button background */}
            <Rect
              x={buttonX}
              y={buttonY}
              width={buttonWidth}
              height={buttonHeight}
              fill="#777777"
            />
            {/* Button text */}
            <Text
              x={buttonX}
              y={buttonY}
              width={buttonWidth}
              height={buttonHeight}
              text={buttonLabel}
              fontSize={12}
              fill="#ffffff"
              fontFamily="Arial"
              align="center"
              verticalAlign="middle"
            />
          </Group>
        );
      })}
    </Group>
  );
});
