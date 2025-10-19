import { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const postItShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 80,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getPostItShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  postItShapeRestrictions;

export const PostItShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    postItShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const stroke = otherProps?.stroke || "black";
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);
  const fill = otherProps?.backgroundColor || "#FFF59D";
  const textColor = otherProps?.textColor || "black";
  const borderRadius = otherProps?.borderRadius || 5;

  const postItWidth = restrictedWidth;
  const postItHeight = restrictedHeight;

  const fixedTapeWidth = 90;
  const fixedTapeHeight = 40;

  const minPostItWidthForFixedTape = 120;
  const minPostItHeightForFixedTape = 120;

  const tapeWidth =
    postItWidth >= minPostItWidthForFixedTape
      ? fixedTapeWidth
      : (postItWidth / minPostItWidthForFixedTape) * fixedTapeWidth;

  const tapeHeight =
    postItHeight >= minPostItHeightForFixedTape
      ? fixedTapeHeight
      : (postItHeight / minPostItHeightForFixedTape) * fixedTapeHeight;

  const tapeX = (width - tapeWidth) / 2;
  const tapeY = 0;

  const tapeRotation = -10;

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      {/* Post-it frame */}
      <Rect
        x={0}
        y={10}
        width={postItWidth}
        height={restrictedHeight - 10}
        cornerRadius={borderRadius}
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={fill}
      />

      {/* Tape */}
      <Rect
        x={tapeX}
        y={tapeY}
        width={tapeWidth}
        height={tapeHeight}
        rotation={tapeRotation}
        stroke="black"
        strokeWidth={2}
        fill="gray"
      />
      <Text
        x={5}
        y={tapeHeight + 5}
        width={postItWidth - 5}
        height={restrictedHeight - tapeHeight - 10}
        text={text}
        fontSize={18}
        fill={textColor}
        wrap="wrap"
        ellipsis={true}
      />
    </Group>
  );
});
