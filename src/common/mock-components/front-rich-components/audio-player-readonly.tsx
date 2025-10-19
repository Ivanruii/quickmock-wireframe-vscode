import { forwardRef } from "react";
import { Line, Rect, Path, Group } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const AudioPlayerShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 280,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 280,
  defaultHeight: 50,
};
const PROGRESSBAR_PROGRESS = 0.5;

export const getAudioPlayerSizeRestrictions = (): ShapeSizeRestrictions =>
  AudioPlayerShapeSizeRestrictions;

export const AudioPlayerShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, ...shapeProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    AudioPlayerShapeSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const ratioX = width / restrictedWidth;
  const ratioY = height / restrictedHeight;

  const marginX = 20 * ratioX;
  const progressBarStartX = 115 * ratioX + marginX;
  const progressBarEndX = restrictedWidth - 47 * ratioX - marginX;
  const progressBarFullWidth = progressBarEndX - progressBarStartX;

  const progressBarWidth = progressBarFullWidth * PROGRESSBAR_PROGRESS;
  const progressBarHeight = 5 * ratioY;

  const backButtonPoints = [
    26 * ratioX,
    20 * ratioY,
    21 * ratioX,
    25 * ratioY,
    26 * ratioX,
    30 * ratioY,
  ];

  const playButtonPoints = [
    63 * ratioX,
    20 * ratioY,
    72 * ratioX,
    25 * ratioY,
    63 * ratioX,
    30 * ratioY,
  ];

  const forwardButtonPoints = [
    100 * ratioX,
    20 * ratioY,
    105 * ratioX,
    25 * ratioY,
    100 * ratioX,
    30 * ratioY,
  ];

  return (
    <Group x={x} y={y} ref={ref} {...shapeProps}>
      {/* Back button */}
      <Path
        data={`M ${backButtonPoints[0]} ${backButtonPoints[1]} L ${backButtonPoints[2]} ${backButtonPoints[3]} L ${backButtonPoints[4]} ${backButtonPoints[5]} Z`}
        fill="black"
        stroke="black"
        strokeWidth={1}
      />

      {/* Play button */}
      <Path
        data={`M ${playButtonPoints[0]} ${playButtonPoints[1]} L ${playButtonPoints[2]} ${playButtonPoints[3]} L ${playButtonPoints[4]} ${playButtonPoints[5]} Z`}
        fill="black"
        stroke="black"
        strokeWidth={1}
      />

      {/* Forward button */}
      <Path
        data={`M ${forwardButtonPoints[0]} ${forwardButtonPoints[1]} L ${forwardButtonPoints[2]} ${forwardButtonPoints[3]} L ${forwardButtonPoints[4]} ${forwardButtonPoints[5]} Z`}
        fill="black"
        stroke="black"
        strokeWidth={1}
      />

      {/* Progress bar background */}
      <Rect
        x={progressBarStartX}
        y={restrictedHeight / 2 - progressBarHeight / 2}
        width={progressBarFullWidth}
        height={progressBarHeight}
        fill="gray"
        stroke="black"
        strokeWidth={1}
      />

      {/* Progress bar fill */}
      <Rect
        x={progressBarStartX}
        y={restrictedHeight / 2 - progressBarHeight / 2}
        width={progressBarWidth}
        height={progressBarHeight}
        fill="black"
        stroke="black"
        strokeWidth={1}
      />
    </Group>
  );
});
