import React, { forwardRef, useEffect, useState } from "react";
import { Group, Rect, Text } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
  SHAPE_CONSTANTS,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
const listboxShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 75,
  minHeight: 200,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 120,
  defaultHeight: 220,
};
export const getListboxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  listboxShapeSizeRestrictions;
export const ListBoxShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text = "[*]Item 1\nItem 2\nItem 3\nItem 4",
    otherProps,
    ...shapeProps
  } = props;
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [listboxItems, setListboxItems] = useState<string[]>([]);
  useEffect(() => {
    if (text) {
      const lines = text.split("\n");
      const items: string[] = [];
      let selectedIndex = 0;
      lines.forEach((line, index) => {
        if (line.startsWith("[*]")) {
          selectedIndex = index;
          items.push(line.substring(3)); // Remove [*] marker
        } else {
          items.push(line);
        }
      });
      setListboxItems(items);
      setSelectedItem(selectedIndex);
    }
  }, [text]);
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    listboxShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const stroke = otherProps?.stroke || SHAPE_CONSTANTS.DEFAULT_STROKE_COLOR;
  const fill = otherProps?.fill || SHAPE_CONSTANTS.DEFAULT_FILL_COLOR;
  const textColor = otherProps?.textColor || SHAPE_CONSTANTS.DEFAULT_TEXT_COLOR;
  const itemHeight = 25;
  return (
    <Group ref={ref} x={x} y={y} {...shapeProps}>
      {/* Listbox background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={SHAPE_CONSTANTS.DEFAULT_BORDER_RADIUS}
      />
      {/* List items */}
      {listboxItems.map((item, index) => {
        const isSelected = index === selectedItem;
        const itemY = index * itemHeight;
        return (
          <Group key={index}>
            {/* Item background */}
            <Rect
              x={2}
              y={itemY + 2}
              width={restrictedWidth - 4}
              height={itemHeight - 1}
              fill={isSelected ? "#007ACC" : "transparent"}
              cornerRadius={2}
            />
            {/* Item text */}
            <Text
              x={8}
              y={itemY + 5}
              width={restrictedWidth - 16}
              height={itemHeight - 10}
              text={item}
              fontFamily={SHAPE_CONSTANTS.DEFAULT_FONT_FAMILY}
              fontSize={12}
              fill={isSelected ? "white" : textColor}
              align="left"
              verticalAlign="middle"
              ellipsis={true}
              wrap="none"
            />
          </Group>
        );
      })}
    </Group>
  );
});
