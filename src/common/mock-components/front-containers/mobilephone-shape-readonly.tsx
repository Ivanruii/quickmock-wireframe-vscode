import { forwardRef, useEffect, useState } from "react";
import { Group, Rect, Circle, Text, Path } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "../front-components/shape.const";

const wifiPath =
  "M138 204a10 10 0 1 1-10-10a10 10 0 0 1 10 10m97.81-115.45a170 170 0 0 0-215.62 0a6 6 0 1 0 7.62 9.27a158 158 0 0 1 200.38 0a6 6 0 1 0 7.62-9.27m-32.08 35.79a122 122 0 0 0-151.46 0a6 6 0 0 0 7.46 9.41a110 110 0 0 1 136.54 0A6 6 0 0 0 200 135a6 6 0 0 0 3.73-10.7Zm-32.2 35.81a74 74 0 0 0-87.06 0a6 6 0 0 0 7.06 9.7a62 62 0 0 1 72.94 0a6 6 0 0 0 8.38-1.32a6 6 0 0 0-1.32-8.38";

const cellSignalPath =
  "M166 72v128a6 6 0 0 1-12 0V72a6 6 0 0 1 12 0m34-46a6 6 0 0 0-6 6v168a6 6 0 0 0 12 0V32a6 6 0 0 0-6-6m-80 80a6 6 0 0 0-6 6v88a6 6 0 0 0 12 0v-88a6 6 0 0 0-6-6m-40 40a6 6 0 0 0-6 6v48a6 6 0 0 0 12 0v-48a6 6 0 0 0-6-6m-40 40a6 6 0 0 0-6 6v8a6 6 0 0 0 12 0v-8a6 6 0 0 0-6-6";

const batteryFullPath =
  "M200 58H32a22 22 0 0 0-22 22v96a22 22 0 0 0 22 22h168a22 22 0 0 0 22-22V80a22 22 0 0 0-22-22m10 118a10 10 0 0 1-10 10H32a10 10 0 0 1-10-10V80a10 10 0 0 1 10-10h168a10 10 0 0 1 10 10Zm-28-80v64a6 6 0 0 1-12 0V96a6 6 0 0 1 12 0m-40 0v64a6 6 0 0 1-12 0V96a6 6 0 0 1 12 0m-40 0v64a6 6 0 0 1-12 0V96a6 6 0 0 1 12 0m-40 0v64a6 6 0 0 1-12 0V96a6 6 0 0 1 12 0m192 0v64a6 6 0 0 1-12 0V96a6 6 0 0 1 12 0";

const mobilePhoneShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: 1000,
  maxHeight: 1000,
  defaultWidth: 300,
  defaultHeight: 560,
};

export const getMobilePhoneShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  mobilePhoneShapeSizeRestrictions;

export const MobilePhoneShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    mobilePhoneShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const margin = 5;
  const screenMargin = 10;
  const speakerPadding = 10;
  const buttonPadding = 10;
  const speakerWidth = 20;
  const speakerHeight = 5;
  const speakerRadius = 2;
  const buttonRadius = 9;

  const [currentTime, setCurrentTime] = useState("");

  const adornerIconSize = 20;
  const adornerPadding = 5;
  const adornerTotalWidth = adornerIconSize * 3 + screenMargin;

  const screenX = margin + screenMargin;
  const screenY = screenMargin * 3;
  const screenWidth = restrictedWidth - 2 * margin - 2 * screenMargin;

  const adornerStartX = screenX + screenWidth - adornerTotalWidth;
  const adornerY = screenY + adornerPadding;

  const wifiX = adornerStartX;
  const signalX = adornerStartX + 17;
  const batteryX = adornerStartX + 20 * 2;

  const timeX = screenX + screenMargin;
  const timeY = adornerY + 4;
  const timeWidth = 40;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("es-ES", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
      {/* Mobile Frame */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={30}
        stroke="black"
        strokeWidth={2}
        fill="white"
      />

      {/* Mobile Screen */}
      <Rect
        x={margin + screenMargin}
        y={screenMargin * 3}
        width={restrictedWidth - 2 * margin - 2 * screenMargin}
        height={restrictedHeight - 2 * margin - 6 * screenMargin}
        cornerRadius={10}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />

      {/* LoudSpeaker */}
      <Rect
        x={(restrictedWidth - speakerWidth) / 2}
        y={speakerPadding}
        width={speakerWidth}
        height={speakerHeight}
        cornerRadius={speakerRadius}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />

      {/* Adorner */}

      {/* Wifi Icon - using real SVG path */}
      <Group x={wifiX} y={adornerY - 2}>
        <Path data={wifiPath} fill="black" scaleX={0.07} scaleY={0.07} />
      </Group>

      {/* Cell signal - using real SVG path */}
      <Group x={signalX} y={adornerY}>
        <Path data={cellSignalPath} fill="black" scaleX={0.07} scaleY={0.07} />
      </Group>

      {/* Battery - using real SVG path */}
      <Group x={batteryX} y={adornerY}>
        <Path data={batteryFullPath} fill="black" scaleX={0.07} scaleY={0.07} />
      </Group>

      {/* Current time */}
      <Text
        x={timeX}
        y={timeY}
        width={timeWidth}
        height={adornerIconSize}
        text={currentTime}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={14}
        wrap="none"
      />

      {/* Home button */}
      <Circle
        x={restrictedWidth / 2}
        y={restrictedHeight - margin - buttonPadding}
        radius={buttonRadius}
        stroke="black"
        strokeWidth={2}
        fill="white"
      />

      {/* Text content */}
      {text && (
        <Text
          x={margin + screenMargin + 10}
          y={screenMargin * 4 + 10}
          width={restrictedWidth - 2 * margin - 2 * screenMargin - 20}
          height={restrictedHeight - 2 * margin - 8 * screenMargin}
          text={text}
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={14}
          fill="black"
          wrap="word"
        />
      )}
    </Group>
  );
});
