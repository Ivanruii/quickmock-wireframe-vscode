import { forwardRef, useMemo } from "react";
import { Group, Rect, Text, Path } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const AccordionSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 120,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 200,
};

export const getAccordionSizeRestrictions = (): ShapeSizeRestrictions =>
  AccordionSizeRestrictions;

const parseSections = (text: string) => {
  if (!text) return [];

  return text.split("\n").map((line) => {
    const isExpanded = line.startsWith("[*]");
    const title = isExpanded ? line.substring(3) : line;
    return {
      title: title.trim(),
      isExpanded,
      content: `Content for ${title.trim()}...`,
    };
  });
};

export const AccordionShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    AccordionSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const sections = useMemo(() => parseSections(text || ""), [text]);

  const headerHeight = 40;
  const contentHeight = 50;
  let currentY = 0;

  return (
    <Group x={x} y={y} ref={ref} {...restProps}>
      {/* Container background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill="white"
        stroke="black"
        strokeWidth={1}
        cornerRadius={4}
      />

      {sections.map((section, index) => {
        const sectionY = currentY;
        currentY += headerHeight + (section.isExpanded ? contentHeight : 0);

        return (
          <Group key={index}>
            {/* Section header */}
            <Rect
              x={0}
              y={sectionY}
              width={restrictedWidth}
              height={headerHeight}
              fill="lightgrey"
              stroke="black"
              strokeWidth={1}
            />

            {/* Header text */}
            <Text
              x={16}
              y={sectionY + (headerHeight - 14) / 2}
              text={section.title}
              fontSize={14}
              fill="black"
              fontFamily="Arial"
              fontStyle="bold"
            />

            {/* Expand/collapse icon */}
            <Path
              x={restrictedWidth - 24}
              y={sectionY + headerHeight / 2 - 4}
              data={
                section.isExpanded
                  ? "M 0,0 L 8,8 L 0,16 Z"
                  : "M 0,0 L 8,8 L 0,16 Z"
              }
              fill="black"
              scaleX={0.7}
              scaleY={0.7}
            />

            {/* Content area */}
            {section.isExpanded && (
              <Group>
                <Rect
                  x={0}
                  y={sectionY + headerHeight}
                  width={restrictedWidth}
                  height={contentHeight}
                  fill="white"
                  stroke="black"
                  strokeWidth={1}
                />
                <Text
                  x={16}
                  y={sectionY + headerHeight + 8}
                  text={section.content}
                  fontSize={11}
                  fill="#666"
                  fontFamily="Arial"
                  width={restrictedWidth - 32}
                  wrap="word"
                />
              </Group>
            )}
          </Group>
        );
      })}
    </Group>
  );
});
