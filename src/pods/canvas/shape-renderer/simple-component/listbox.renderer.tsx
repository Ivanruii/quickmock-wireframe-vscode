import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ListBoxShape } from "@/common/mock-components/front-components/listbox-shape-readonly";

export const renderListbox = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <ListBoxShape
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      text={shape.text || "[*]Item 1\nItem 2\nItem 3\nItem 4"}
      otherProps={shape.otherProps || {}}
    />
  );
};
