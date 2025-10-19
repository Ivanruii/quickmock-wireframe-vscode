import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { AccordionShape } from "@/common/mock-components/front-rich-components/accordion-readonly";

export const renderAccordion = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <AccordionShape
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
