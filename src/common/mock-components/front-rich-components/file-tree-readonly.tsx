import { ShapeSizeRestrictions, ShapeProps } from "@/common/types";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { Group, Image, Rect, Text } from "react-konva";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { useShapeProps } from "@/common/hooks/use-shape-props.hook";
import { BASIC_SHAPE } from "../front-components/shape.const";

interface FileTreeItem {
  text: string;
  level: number;
  type: "folder" | "subfolder" | "file";
}

const parseFileTreeText = (text: string): FileTreeItem[] => {
  if (!text) return [];

  const lines = text.split("\n");
  return lines.filter(Boolean).map((line) => {
    let level = 0;
    let content = line;
    let type: "folder" | "subfolder" | "file" = "file";

    const match = line.match(/^(\s*)([\+\-\*])\s*(.*)/);
    if (match) {
      level = Math.floor((match[1]?.length || 0) / 3);
      const symbol = match[2];
      content = (match[3] || "").trim();

      if (symbol === "+") type = "folder";
      else if (symbol === "-") type = "subfolder";
      else type = "file";
    }

    return {
      text: content,
      level,
      type,
    };
  });
};

const getFileTreeSizeValues = (size?: string) => {
  const isSmall = size === "small";
  return {
    fontSize: isSmall ? 10 : 12,
    iconDimension: isSmall ? 12 : 16,
    elementHeight: isSmall ? 18 : 24,
    extraTextTopPadding: isSmall ? 3 : 4,
    paddingX: isSmall ? 6 : 8,
    paddingY: isSmall ? 4 : 6,
    iconTextSpacing: isSmall ? 4 : 6,
    indentationStep: isSmall ? 12 : 16,
  };
};

const calculateFileTreeDynamicSize = (
  items: FileTreeItem[],
  config: {
    width: number;
    height: number;
    elementHeight: number;
    paddingY: number;
    paddingX: number;
    iconDimension: number;
    indentationStep: number;
    baseRestrictions: ShapeSizeRestrictions;
  }
) => {
  const { elementHeight, paddingY, baseRestrictions, width, height } = config;

  const calculatedHeight = Math.max(
    items.length * elementHeight + paddingY * 2,
    baseRestrictions.minHeight
  );

  return fitSizeToShapeSizeRestrictions(
    {
      ...baseRestrictions,
      defaultHeight: calculatedHeight,
    },
    width,
    height
  );
};

const loadSvgWithFill = async (
  path: string,
  fill: string
): Promise<HTMLImageElement | null> => {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = fill;
      if (path.includes("folder")) {
        ctx.fillRect(2, 6, 12, 8);
        ctx.fillRect(2, 6, 6, 2);
      } else if (path.includes("open")) {
        ctx.fillRect(2, 4, 12, 10);
        ctx.fillRect(2, 4, 8, 2);
      } else {
        ctx.fillRect(4, 2, 8, 12);
      }
    }

    const img = new window.Image();
    img.src = canvas.toDataURL();
    return new Promise((resolve) => {
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
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

const fileTreeShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 150,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 230,
  defaultHeight: 180,
};

interface FileTreeShapeProps extends ShapeProps {
  text: string;
}

const shapeType = "fileTree";

export const getFileTreeShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  fileTreeShapeRestrictions;

export const FileTreeShape = forwardRef<any, FileTreeShapeProps>(
  (props, ref) => {
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

    const treeItems = useMemo(() => {
      return parseFileTreeText(text || "");
    }, [text]);

    const [icons, setIcons] = useState<Record<string, HTMLImageElement | null>>(
      {
        folder: null,
        subfolder: null,
        file: null,
      }
    );

    const {
      fontSize,
      iconDimension,
      elementHeight,
      extraTextTopPadding,
      paddingX,
      paddingY,
      iconTextSpacing,
      indentationStep,
    } = useMemo(
      () => getFileTreeSizeValues(otherProps?.size),
      [otherProps?.size]
    );

    const restrictedSize = calculateFileTreeDynamicSize(treeItems, {
      width,
      height,
      elementHeight,
      paddingY,
      paddingX,
      iconDimension,
      indentationStep,
      baseRestrictions: fileTreeShapeRestrictions,
    });

    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const { stroke, strokeStyle, fill, textColor, borderRadius } =
      useShapeProps(otherProps, BASIC_SHAPE);

    const commonGroupProps = useGroupShapeProps(
      props,
      restrictedSize,
      shapeType,
      ref
    );

    const calculateIconX = (item: FileTreeItem) => {
      return paddingX + item.level * indentationStep;
    };

    const calculateTextX = (item: FileTreeItem) => {
      return calculateIconX(item) + iconDimension + iconTextSpacing;
    };

    const calculateAvailableWidth = (item: FileTreeItem) => {
      return restrictedWidth - calculateTextX(item) - paddingX;
    };

    useEffect(() => {
      Promise.all([
        loadSvgWithFill("/icons/folder.svg", stroke),
        loadSvgWithFill("/icons/open.svg", stroke),
        loadSvgWithFill("/icons/new.svg", stroke),
      ]).then(([folder, subfolder, file]) => {
        setIcons({
          folder,
          subfolder,
          file,
        });
      });
    }, [stroke]);

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {/* Container */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          stroke={stroke}
          strokeWidth={2}
          fill={fill}
          dash={strokeStyle}
          cornerRadius={borderRadius}
        />

        {treeItems.map((item, index) => (
          <Group key={index}>
            {icons[item.type] && (
              <Image
                image={icons[item.type]!}
                x={calculateIconX(item)}
                y={paddingY + elementHeight * index}
                width={iconDimension}
                height={iconDimension}
              />
            )}
            <Text
              x={calculateTextX(item)}
              y={paddingY + elementHeight * index + extraTextTopPadding}
              text={item.text}
              width={calculateAvailableWidth(item)}
              height={elementHeight}
              fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
              fontSize={fontSize}
              fill={textColor}
              wrap="none"
              ellipsis={true}
            />
          </Group>
        ))}
      </Group>
    );
  }
);
