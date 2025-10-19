import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { ModalShape } from "@/common/mock-components/front-rich-components/modal-readonly";

export const renderModal = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <ModalShape
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
