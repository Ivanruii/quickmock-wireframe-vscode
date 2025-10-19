import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ListBoxShape } from "@/common/mock-components/front-components/index";

export const renderListbox = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <ListBoxShape
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
