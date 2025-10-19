import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { TabletShape } from "@/common/mock-components/front-containers/tablet-shape-readonly";

export const renderTablet = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <TabletShape
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
