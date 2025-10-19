import { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const imageShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 300,
};

export const getImageShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  imageShapeRestrictions;

interface NoImageSelectedProps {
  width: number;
  height: number;
}

const NoImageSelected: React.FC<NoImageSelectedProps> = ({ width, height }) => {
  return (
    <Group x={0} y={0} width={width} height={height}>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#f0f0f0"
        stroke="black"
        strokeWidth={2}
        dash={[5, 5]}
      />
      <Text
        x={0}
        y={0}
        width={width}
        height={height}
        text="Double click to add image"
        fontSize={20}
        fill="black"
        align="center"
        ellipsis={true}
        verticalAlign="middle"
        textDecoration="underline"
      />
    </Group>
  );
};

export const ImageShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    imageShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      {otherProps?.imageSrc ? (
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          fill="#e0e0e0"
          stroke="black"
          strokeWidth={2}
        />
      ) : (
        <NoImageSelected width={restrictedWidth} height={restrictedHeight} />
      )}
    </Group>
  );
});
