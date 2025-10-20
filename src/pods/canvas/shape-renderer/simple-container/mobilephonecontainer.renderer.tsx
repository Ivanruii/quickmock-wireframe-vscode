import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { MobilePhoneShape } from "@/common/mock-components/front-containers/mobilephone-shape-readonly";

export const renderMobilePhoneContainer = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  return (
    <MobilePhoneShape
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
