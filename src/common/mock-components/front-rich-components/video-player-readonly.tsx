import { Group, Rect, Circle, Line } from "react-konva";
import { ShapeSizeRestrictions } from "@/common/types";
import { forwardRef } from "react";
import { ShapeProps } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const videoPlayerShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 600,
  defaultHeight: 400,
};

export const getVideoPlayerSizeRestrictions = (): ShapeSizeRestrictions =>
  videoPlayerShapeSizeRestrictions;

export const VideoPlayerShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, ...shapeProps } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    videoPlayerShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const margin = 10;
  const controlBarHeight = 30;

  return (
    <Group x={x} y={y} ref={ref} {...shapeProps}>
      {/* videoplayer frame */}
      <Rect
        x={margin}
        y={margin}
        width={restrictedWidth - 2 * margin}
        height={restrictedHeight - 2 * margin}
        cornerRadius={10}
        stroke="black"
        strokeWidth={3}
        fill="white"
      />

      {/* control bar */}
      <Rect
        x={margin}
        y={restrictedHeight - margin - controlBarHeight}
        width={restrictedWidth - 2 * margin}
        height={controlBarHeight + 15}
        stroke="black"
        strokeWidth={3}
        fill="white"
      />

      {/* triangle button */}
      <Line
        points={[
          margin + 15,
          restrictedHeight - controlBarHeight - 5,
          margin + 35,
          restrictedHeight - controlBarHeight + 10,
          margin + 15,
          restrictedHeight - controlBarHeight + 25,
        ]}
        fill="black"
        closed={true}
      />

      {/* progressbar */}
      <Line
        points={[
          margin + 50,
          restrictedHeight - controlBarHeight + 10,
          restrictedWidth - 2 * margin - 80,
          restrictedHeight - controlBarHeight + 10,
        ]}
        stroke="black"
        strokeWidth={2}
      />

      {/* pointer prorgessbar */}
      <Circle
        x={margin + 50}
        y={restrictedHeight - controlBarHeight + 10}
        radius={5}
        fill="black"
      />

      {/* speaker */}
      <Line
        points={[
          restrictedWidth - 2 * margin - 70,
          restrictedHeight - controlBarHeight + 5,
          restrictedWidth - 2 * margin - 65,
          restrictedHeight - controlBarHeight + 15,
        ]}
        stroke="black"
        strokeWidth={2}
      />

      {/* sound wave lines */}
      <Circle
        x={restrictedWidth - 2 * margin - 55}
        y={restrictedHeight - controlBarHeight + 10}
        radius={8}
        fill="none"
        stroke="black"
        strokeWidth={1}
      />

      <Circle
        x={restrictedWidth - 2 * margin - 55}
        y={restrictedHeight - controlBarHeight + 10}
        radius={12}
        fill="none"
        stroke="black"
        strokeWidth={1}
      />
    </Group>
  );
});
