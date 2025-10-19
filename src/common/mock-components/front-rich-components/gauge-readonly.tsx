import { forwardRef } from "react";
import { Group, Arc, Rect, Circle, Path } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const GaugeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 70,
  minHeight: 70,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 150,
};

export const getGaugeSizeRestrictions = (): ShapeSizeRestrictions =>
  GaugeSizeRestrictions;

export const GaugeShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, ...shapeProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    GaugeSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const size = Math.min(restrictedWidth, restrictedHeight);
  const strokeWidth = Math.min(restrictedWidth, restrictedHeight) / 10;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const progress = 75;
  const angle = (progress / 100.01) * 360;

  const arcPath = () => {
    const startAngle = -90;
    const endAngle = startAngle + angle;
    const largeArcFlag = angle > 180 ? 1 : 0;
    const startX = center + radius * Math.cos((Math.PI * startAngle) / 180);
    const startY = center + radius * Math.sin((Math.PI * startAngle) / 180);
    const endX = center + radius * Math.cos((Math.PI * endAngle) / 180);
    const endY = center + radius * Math.sin((Math.PI * endAngle) / 180);
    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  };

  return (
    <Group x={x} y={y} ref={ref} {...shapeProps}>
      {/* Background */}
      <Circle
        x={center}
        y={center}
        radius={radius}
        fill="white"
        stroke="white"
        strokeWidth={strokeWidth}
      />

      {/* Moving Arc */}
      <Path data={arcPath()} stroke="black" strokeWidth={strokeWidth + 1} />
    </Group>
  );
});
