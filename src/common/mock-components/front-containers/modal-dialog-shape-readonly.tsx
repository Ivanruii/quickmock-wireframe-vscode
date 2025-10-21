import { forwardRef } from "react";
import { Group, Rect, Text } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import { BASIC_SHAPE } from "../front-components/shape.const";

const modalDialogShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 250,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
  defaultHeight: 300,
};

export const getModalDialogShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  modalDialogShapeSizeRestrictions;

export const ModalDialogContainer = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, text, otherProps, ...restProps } = props;

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      modalDialogShapeSizeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const margin = 10;
    const titleBarHeight = 50;

    return (
      <Group ref={ref} x={x} y={y} {...restProps} {...otherProps}>
        {/* Background */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* HeaderBar */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={titleBarHeight}
          stroke="black"
          strokeWidth={2}
          fill="lightgray"
        />

        <Text
          x={margin * 3}
          y={margin * 2}
          text={text || "Modal Dialog"}
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={12}
          fill="black"
          ellipsis={true}
          wrap="none"
          width={restrictedWidth - margin * 6 - 40}
        />

        {/* Close button (X) */}
        <Group x={restrictedWidth - 40} y={10}>
          <Rect
            width={30}
            height={30}
            fill="white"
            stroke="black"
            strokeWidth={1}
          />
          <Text
            x={8}
            y={8}
            text="X"
            fontFamily="Arial"
            fontSize={18}
            fill="black"
          />
        </Group>
      </Group>
    );
  }
);
