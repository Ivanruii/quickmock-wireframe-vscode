import { forwardRef, useMemo } from "react";
import { Group, Rect, Text, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const TabsBarSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 450,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 450,
  defaultHeight: 180,
};

export const getTabsBarSizeRestrictions = (): ShapeSizeRestrictions =>
  TabsBarSizeRestrictions;

// Parse text format: "Tab 1, Tab 2, Tab 3"
const parseTabs = (text: string) => {
  if (!text) return [];
  return text
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);
};

export const TabsBarShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    TabsBarSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const backgroundColor = otherProps?.backgroundColor || "#ffffff";
  const stroke = otherProps?.stroke || "#000000";
  const textColor = otherProps?.textColor || "#333";
  const activeElement = otherProps?.activeElement || 0;

  const tabLabels = useMemo(() => parseTabs(text || ""), [text]);

  if (tabLabels.length === 0) return null;

  const tabHeight = 40;
  const tabsGap = 10;
  const tabXPadding = 20;
  const bodyHeight = restrictedHeight - tabHeight - 10;

  const availableWidth = restrictedWidth - tabsGap * (tabLabels.length + 1);
  const tabWidth = Math.max(40, availableWidth / tabLabels.length);

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Background of the tab bar body */}
      <Rect
        x={0}
        y={tabHeight + 10}
        width={restrictedWidth}
        height={bodyHeight}
        stroke={stroke}
        strokeWidth={2}
        fill={backgroundColor}
        cornerRadius={4}
      />

      {/* Tabs */}
      {tabLabels.map((label, index) => {
        const tabX = tabsGap + index * (tabWidth + tabsGap);
        const isActive = index === activeElement;

        return (
          <Group key={index}>
            {/* Tab background */}
            <Rect
              x={tabX}
              y={10}
              width={tabWidth}
              height={tabHeight}
              fill={isActive ? backgroundColor : "#E0E0E0"}
              stroke={stroke}
              strokeWidth={2}
              cornerRadius={[4, 4, 0, 0]}
            />

            {/* Tab text */}
            <Text
              x={tabX + tabXPadding / 2}
              y={10 + (tabHeight - 14) / 2}
              text={label}
              fontSize={14}
              fontFamily="Arial"
              fill={textColor}
              width={tabWidth - tabXPadding}
              align="center"
              ellipsis={true}
              wrap="none"
            />

            {/* Bottom line for active tab */}
            {isActive && (
              <Rect
                x={tabX}
                y={10 + tabHeight - 2}
                width={tabWidth}
                height={2}
                fill={stroke}
              />
            )}
          </Group>
        );
      })}
    </Group>
  );
});
