import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ComboBoxShape } from "@/common/mock-components/front-components/combobox-shape-readonly";

export const renderComboBox = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <ComboBoxShape
      id={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      text={shape.text || "Select Option"}
      otherProps={shape.otherProps || {}}
    />
  );
};
