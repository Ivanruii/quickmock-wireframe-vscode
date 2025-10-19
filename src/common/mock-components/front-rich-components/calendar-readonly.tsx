import { useState, forwardRef } from "react";
import { Group, Rect, Text, Line } from "react-konva";
import { ShapeProps, ShapeSizeRestrictions } from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";
import {
  calculateNextMonth,
  calculatePreviousMonth,
  getCurrentMonthDays,
} from "./calendar.business";

const CalendarSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 350,
  minHeight: 350,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
  defaultHeight: 500,
};

export const getCalendarSizeRestrictions = (): ShapeSizeRestrictions =>
  CalendarSizeRestrictions;

export const CalendarShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    CalendarSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const [currentDate, setCurrentDate] = useState(new Date());

  const backgroundColor = otherProps?.backgroundColor || "#ffffff";
  const stroke = otherProps?.stroke || "#000000";
  const textColor = otherProps?.textColor || "#000000";

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => calculatePreviousMonth(prevDate));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => calculateNextMonth(prevDate));
  };

  const { month, year, days } = getCurrentMonthDays(currentDate);

  const margin = 10;
  const headerHeight = 50;
  const dayBoxWidth = (restrictedWidth - margin * 2) / 7;
  const dayBoxHeight = (restrictedHeight - headerHeight - 40) / days.length;

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Calendar heading */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={headerHeight}
        cornerRadius={10}
        stroke={stroke}
        strokeWidth={2}
        fill={backgroundColor}
      />

      {/* Left arrow */}
      <Line
        points={[
          margin + 20,
          margin + 10,
          margin + 10,
          margin + 20,
          margin + 20,
          margin + 30,
        ]}
        closed
        fill={textColor}
        stroke={textColor}
        strokeWidth={2}
        onClick={handlePrevMonth}
      />

      {/* Month and Year */}
      <Text
        x={margin + 20}
        y={headerHeight / 3}
        text={`${month} ${year}`}
        width={restrictedWidth - margin - 20 - margin - 30}
        fontFamily="Arial"
        fontSize={20}
        fill={textColor}
        align="center"
        ellipsis={true}
      />

      {/* Right arrow */}
      <Line
        points={[
          restrictedWidth - margin - 30,
          margin + 10,
          restrictedWidth - margin - 20,
          margin + 20,
          restrictedWidth - margin - 30,
          margin + 30,
        ]}
        closed
        fill={textColor}
        stroke={textColor}
        strokeWidth={2}
        onClick={handleNextMonth}
      />

      {/* Calendar table */}
      <Rect
        x={0}
        y={headerHeight + 10}
        width={restrictedWidth}
        height={restrictedHeight - headerHeight - 10}
        cornerRadius={10}
        stroke={stroke}
        strokeWidth={2}
        fill={backgroundColor}
      />

      {/* Week days */}
      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
        <Text
          key={i}
          x={35 + i * dayBoxWidth}
          y={headerHeight + 20}
          text={day}
          fontFamily="Arial"
          fontSize={16}
          fill={textColor}
        />
      ))}

      {/* Month days */}
      {days.map((week: any[], rowIndex: number) =>
        week.map((day, colIndex) => (
          <Text
            key={`${rowIndex}-${colIndex}`}
            x={35 + colIndex * dayBoxWidth}
            y={headerHeight + 70 + rowIndex * dayBoxHeight}
            text={day ? day.toString() : ""}
            fontFamily="Arial"
            fontSize={16}
            fill={textColor}
          />
        ))
      )}
    </Group>
  );
});
