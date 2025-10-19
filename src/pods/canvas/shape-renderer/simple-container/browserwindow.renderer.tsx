import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { BrowserWindowShape } from "@/common/mock-components/front-containers/browserwindow-shape-readonly";

export const renderBrowserWindow = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <BrowserWindowShape
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      text={shape.text}
      otherProps={shape.otherProps || {}}
    />
  );
};
