import React from "react";
import { ShapeModel } from "@/core/model";
import { ShapeRendererProps } from "../model";
import { FileTreeShape } from "@/common/mock-components/front-rich-components/file-tree-readonly";

export const renderFileTree = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { x, y, width, height, text, otherProps } = shape;

  return (
    <FileTreeShape
      x={x}
      y={y}
      width={width}
      height={height}
      id={shape.id}
      text={text || "+ Project\n   + src\n      * index.ts\n   + public\n      * index.html"}
      otherProps={otherProps}
    />
  );
};
