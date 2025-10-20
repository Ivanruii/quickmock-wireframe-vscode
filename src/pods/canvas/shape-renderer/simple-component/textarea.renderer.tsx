import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { TextAreaShape } from "@/common/mock-components/front-components/textarea-shape-readonly";

export const renderTextArea = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <TextAreaShape
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      text={shape.text || "Textarea"}
      otherProps={shape.otherProps || {}}
    />
  );
};
