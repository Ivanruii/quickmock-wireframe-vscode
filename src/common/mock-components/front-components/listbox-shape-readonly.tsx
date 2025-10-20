import { ShapeSizeRestrictions, ShapeProps } from "@/common/types";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Group, Rect, Text } from "react-konva";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE, DISABLED_COLOR_VALUES } from "./shape.const";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";

const mapListboxTextToItems = (text: string) => {
  const lines = text.split("\n");
  const items: string[] = [];
  let selectedItemIndex = 0;

  lines.forEach((line, index) => {
    if (line.startsWith("[*]")) {
      selectedItemIndex = index;
      items.push(line.substring(3)); // Remove [*] marker
    } else {
      items.push(line);
    }
  });

  return { items, selectedItemIndex };
};

const calculateDynamicContentSizeRestriction = (
  items: string[],
  config: {
    width: number;
    height: number;
    singleHeaderHeight: number;
    listboxShapeSizeRestrictions: ShapeSizeRestrictions;
  }
) => {
  const { width, height, singleHeaderHeight, listboxShapeSizeRestrictions } =
    config;

  const calculatedHeight = Math.max(
    items.length * singleHeaderHeight + 20,
    listboxShapeSizeRestrictions.minHeight
  );

  return fitSizeToShapeSizeRestrictions(
    {
      ...listboxShapeSizeRestrictions,
      defaultHeight: calculatedHeight,
    },
    width,
    height
  );
};

const useGroupShapeProps = (
  props: ShapeProps,
  restrictedSize: { width: number; height: number },
  shapeType: string,
  ref: any
) => {
  const { x, y } = props;
  return {
    ref,
    x,
    y,
  };
};

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

interface ListBoxShapeProps extends ShapeProps {
  text: string;
  onSelected?: (id: string, type: string) => void;
}

const singleHeaderHeight = 35;

const shapeType = "listbox";

export const ListBoxShape = forwardRef<any, ListBoxShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [listboxItems, setListboxItem] = useState<string[]>([
    "[*]Item\nItem1\nItem2\nItem3\nItem4\nItem5\nItem6",
  ]);
  const rectRef = useRef<any>(null);
  const listRef = useRef<any>(null);

  useEffect(() => {
    if (text) {
      const { items, selectedItemIndex } = mapListboxTextToItems(text);
      setListboxItem(items);
      setSelectedItem(selectedItemIndex);
    } else {
      setListboxItem([]);
    }
  }, [text]);

  const restrictedSize = calculateDynamicContentSizeRestriction(listboxItems, {
    width,
    height,
    singleHeaderHeight,
    listboxShapeSizeRestrictions,
  });

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const {
    stroke,
    strokeStyle,
    fill,
    borderRadius,
    textColor,
    selectedBackgroundColor,
    disabled,
  } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const calculateItemBackground = (index: number) => {
    if (disabled) {
      return selectedItem === index
        ? DISABLED_COLOR_VALUES.DEFAULT_STROKE_COLOR
        : DISABLED_COLOR_VALUES.DEFAULT_BACKGROUND_COLOR;
    }

    return selectedItem === index ? selectedBackgroundColor : fill;
  };

  const calculateItemStroke = (index: number) => {
    if (disabled && selectedItem === index)
      return DISABLED_COLOR_VALUES.DEFAULT_STROKE_COLOR;

    return selectedItem === index ? selectedBackgroundColor : "transparent";
  };

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Listbox Item rectanble */}
      <Rect
        x={-10}
        y={-10}
        width={restrictedWidth + 20}
        height={restrictedHeight + 20}
        ref={rectRef}
        cornerRadius={borderRadius}
        stroke={disabled ? DISABLED_COLOR_VALUES.DEFAULT_STROKE_COLOR : stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_BACKGROUND_COLOR : fill}
      />

      {/* Listbox Items */}
      <Group ref={listRef}>
        {listboxItems.map((item, index) => (
          <Group key={index}>
            <Rect
              x={0}
              y={0 + index * singleHeaderHeight}
              width={restrictedWidth}
              height={singleHeaderHeight}
              fill={calculateItemBackground(index)}
              stroke={calculateItemStroke(index)}
              strokeWidth={selectedItem === index ? 1 : 0}
              cornerRadius={borderRadius}
            />
            <Text
              x={10}
              y={0 + index * singleHeaderHeight + 12}
              text={item}
              width={restrictedWidth - 10}
              height={singleHeaderHeight - 12}
              fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
              fontSize={15}
              fill={
                disabled ? DISABLED_COLOR_VALUES.DEFAULT_TEXT_COLOR : textColor
              }
              wrap="none"
              ellipsis={true}
            />
          </Group>
        ))}
      </Group>
    </Group>
  );
});
