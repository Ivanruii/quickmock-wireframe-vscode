import React from "react";

export interface ShapeProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  otherProps?: Record<string, any>;
  onSelected?: (
    id: string,
    type: string,
    userIsMultipleSelecting: boolean
  ) => void;
}

export interface ShapeSizeRestrictions {
  minWidth: number;
  minHeight: number;
  maxWidth: number; // -1 means no limit
  maxHeight: number; // -1 means no limit
  defaultWidth: number;
  defaultHeight: number;
}

export const SHAPE_CONSTANTS = {
  DEFAULT_FONT_FAMILY: "Comic Sans MS, cursive",
  DEFAULT_STROKE_COLOR: "#BBBBBB",
  DEFAULT_FILL_COLOR: "#FFFFFF",
  DEFAULT_TEXT_COLOR: "#000000",
  DEFAULT_BORDER_RADIUS: 4,
};
