import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ModalDialogContainer } from "@/common/mock-components/front-containers/modal-dialog-shape-readonly";

export const renderModalDialogContainer = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <ModalDialogContainer
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
