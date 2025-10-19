import { forwardRef, useMemo } from "react";
import { Group, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";

const BreadcrumbSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 150,
  minHeight: 30,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 300,
  defaultHeight: 36,
};

export const getBreadcrumbSizeRestrictions = (): ShapeSizeRestrictions =>
  BreadcrumbSizeRestrictions;

const parseBreadcrumb = (text: string) => {
  if (!text) return [];
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const BreadcrumbShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...shapeProps } = props;

  const sections = useMemo(() => parseBreadcrumb(text || ""), [text]);

  if (sections.length === 0) return null;

  const GROUP_HEIGHT = 60;
  const padding = 10;
  const textColor = otherProps?.textColor || "black";

  let posX = padding;

  return (
    <Group x={x} y={y} ref={ref} {...shapeProps}>
      {sections.map((section, index) => {
        const currentPosX = posX;
        posX += section.length * 8 + 15;

        return (
          <Group key={index}>
            {/* Breadcrumb text */}
            <Text
              x={currentPosX}
              y={GROUP_HEIGHT / 2 - 8}
              text={section}
              fontFamily="Arial"
              fontSize={14}
              fill={textColor}
              textDecoration={index < sections.length - 1 ? "underline" : ""}
            />

            {/* Separator */}
            {index < sections.length - 1 && (
              <Text
                x={currentPosX + section.length * 8 + 5}
                y={GROUP_HEIGHT / 2 - 8}
                text=">"
                fontFamily="Arial"
                fontSize={14}
                fill={textColor}
              />
            )}
          </Group>
        );
      })}
    </Group>
  );
});
