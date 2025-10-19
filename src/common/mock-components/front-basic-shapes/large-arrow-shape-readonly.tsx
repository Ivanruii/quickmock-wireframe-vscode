import { forwardRef, useMemo } from "react";
import { Group, Path } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { getStrokeStyle } from "@/common/utils";

const largeArrowShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 30,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 100,
  defaultHeight: 100,
};

const LARGE_ARROW_FIX_WIDTH = 100;
const LARGE_ARROW_FIX_HEIGHT = 100;

const pathData = `M10,35 L200,35 L200,15 L300,50 L200,85 L200,65 L10,65 Z`;

export const getLargeArrowShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  largeArrowShapeSizeRestrictions;

export const LargeArrowShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    largeArrowShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const stroke = otherProps?.stroke || "black";
  const strokeStyle = getStrokeStyle(otherProps?.strokeStyle);
  const fill = otherProps?.backgroundColor || "transparent";

  const scaleX = useMemo(() => {
    return restrictedWidth / LARGE_ARROW_FIX_WIDTH;
  }, [restrictedWidth]);

  const scaleY = useMemo(() => {
    return restrictedHeight / LARGE_ARROW_FIX_HEIGHT;
  }, [restrictedHeight]);

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Group
        width={LARGE_ARROW_FIX_WIDTH}
        height={LARGE_ARROW_FIX_HEIGHT}
        scaleX={scaleX}
        scaleY={scaleY}
      >
        <Path
          data={pathData}
          fill={fill}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
        />
      </Group>
    </Group>
  );
});
