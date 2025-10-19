import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { TabsBarShape } from "@/common/mock-components/front-rich-components/tabsbar-readonly";

export const renderTabsbar = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <TabsBarShape
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
