import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { VideoPlayerShape } from "@/common/mock-components/front-rich-components/video-player-readonly";

export const renderVideoPlayer = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <VideoPlayerShape
      x={x}
      y={y}
      width={width}
      height={height}
      id={shape.id}
      text={text}
      otherProps={otherProps}
    />
  );
};
