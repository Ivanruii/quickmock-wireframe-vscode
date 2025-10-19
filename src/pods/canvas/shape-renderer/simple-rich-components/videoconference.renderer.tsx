import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { VideoConferenceShape } from "@/common/mock-components/front-rich-components/videoconference-readonly";

export const renderVideoconference = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <VideoConferenceShape
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
