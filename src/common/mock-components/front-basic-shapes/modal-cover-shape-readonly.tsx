import { forwardRef } from "react";
import { Group, Rect } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const modalCoverShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 200,
};

export const getModalCoverShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  modalCoverShapeSizeRestrictions;

export const ModalCoverShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    modalCoverShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const fill = otherProps?.backgroundColor || "gray";
  const opacity = otherProps?.opacity || 0.7;

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={fill}
        strokeWidth={2}
        dash={[1]}
        opacity={opacity}
        listening={true}
      />
    </Group>
  );
});
