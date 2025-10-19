import { forwardRef, useMemo } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const FileTreeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: 400,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: 300,
};

export const getFileTreeSizeRestrictions = (): ShapeSizeRestrictions =>
  FileTreeSizeRestrictions;

// Parse text format: "+ Folder 1\n   - Subfolder\n      * File"
// + = folder, - = subfolder/folder, * = file
const parseFileTree = (text: string) => {
  if (!text) return [];

  const lines = text.split("\n");
  return lines.filter(Boolean).map((line) => {
    let level = 0;
    let content = line;
    let type = "file";

    const match = line.match(/^(\s*)([\+\-\*])\s*(.*)/);
    if (match) {
      level = Math.floor((match[1]?.length || 0) / 3);
      const symbol = match[2];
      content = (match[3] || "").trim();

      if (symbol === "+") type = "folder";
      else if (symbol === "-") type = "folder";
      else type = "file";
    }

    return {
      name: content,
      level,
      expanded: true,
      type,
    };
  });
};

export const FileTreeShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    FileTreeSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const backgroundColor = otherProps?.backgroundColor || "#ffffff";
  const stroke = otherProps?.stroke || "#e0e0e0";
  const textColor = otherProps?.textColor || "#333";

  const treeItems = useMemo(() => parseFileTree(text || ""), [text]);

  if (treeItems.length === 0) {
    return (
      <Group x={x} y={y} {...restProps} ref={ref}>
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          fill={backgroundColor}
          stroke={stroke}
          strokeWidth={1}
        />
        <Text
          x={16}
          y={restrictedHeight / 2 - 8}
          text="No items"
          fontSize={12}
          fill="#999"
          fontFamily="Arial"
        />
      </Group>
    );
  }

  const itemHeight = 24;

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Tree background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={backgroundColor}
        stroke={stroke}
        strokeWidth={1}
      />

      {/* Tree items */}
      {treeItems.map((item, index) => {
        const itemY = index * itemHeight;
        const indent = item.level * 16;

        return (
          <Group key={index}>
            {/* Item icon (folder or file) */}
            <Text
              x={8 + indent}
              y={itemY + (itemHeight - 14) / 2}
              text={item.type === "folder" ? "📁" : "📄"}
              fontSize={14}
              fill={textColor}
              fontFamily="Arial"
            />

            {/* Item name */}
            <Text
              x={28 + indent}
              y={itemY + (itemHeight - 12) / 2}
              text={item.name}
              fontSize={12}
              fill={textColor}
              fontFamily="Arial"
              wrap="none"
              ellipsis={true}
              width={restrictedWidth - 40 - indent}
            />
          </Group>
        );
      })}
    </Group>
  );
});
