import { forwardRef, useMemo } from "react";
import { Group, Rect, Text, Line } from "react-konva";
import {
  ShapeProps,
  ShapeSizeRestrictions,
} from "@/common/types";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils";

const TableSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 75,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 150,
};

export const getTableSizeRestrictions = (): ShapeSizeRestrictions =>
  TableSizeRestrictions;

const parseTable = (text: string) => {
  if (!text) return { headers: [], rows: [] };
  const lines = text.split("\n").filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = lines[0]
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);
  const rows = lines.slice(1).map((line) =>
    line
      .split(",")
      .map((cell) => cell.trim())
      .filter(Boolean)
  );
  return { headers, rows };
};

export const TableShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, text, otherProps, ...restProps } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    TableSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const backgroundColor = otherProps?.backgroundColor || "#ffffff";
  const stroke = otherProps?.stroke || "#000000";
  const textColor = otherProps?.textColor || "#333";

  const tableData = useMemo(() => parseTable(text || ""), [text]);
  const { headers, rows } = tableData;

  if (headers.length === 0) {
    return (
      <Group x={x} y={y} {...restProps} ref={ref}>
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          fill={backgroundColor}
          stroke={stroke}
          strokeWidth={2}
        />
        <Text
          x={16}
          y={restrictedHeight / 2 - 8}
          text="No data"
          fontSize={14}
          fill="#999"
          fontFamily="Arial"
        />
      </Group>
    );
  }

  const headerHeight = 40;
  const rowHeight = 30;
  const colCount = headers.length;
  const cellWidth = restrictedWidth / colCount;
  const maxRows = Math.floor((restrictedHeight - headerHeight) / rowHeight);
  const visibleRows = Math.min(rows.length, maxRows);

  return (
    <Group x={x} y={y} {...restProps} ref={ref}>
      {/* Outer border rectangle */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        fill={backgroundColor}
        stroke={stroke}
        strokeWidth={1}
      />

      {/* Header background */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={headerHeight}
        fill="#f0f0f0"
        stroke={stroke}
        strokeWidth={1}
      />

      {/* Header row separator line */}
      <Line
        points={[0, headerHeight, restrictedWidth, headerHeight]}
        stroke={stroke}
        strokeWidth={1}
      />

      {/* Headers with sorting triangles */}
      {headers.map((header, colIdx) => (
        <Group key={`header-${colIdx}`}>
          {/* Column separator line */}
          {colIdx > 0 && (
            <Line
              points={[
                colIdx * cellWidth,
                0,
                colIdx * cellWidth,
                restrictedHeight,
              ]}
              stroke={stroke}
              strokeWidth={1}
            />
          )}

          {/* Header text */}
          <Text
            x={colIdx * cellWidth + 8}
            y={(headerHeight - 14) / 2}
            text={header}
            fontSize={13}
            fontFamily="Arial"
            fill={textColor}
            fontStyle="bold"
            width={cellWidth - 24}
            ellipsis={true}
            wrap="none"
          />

          {/* Sorting triangle (up arrow) */}
          <Line
            points={[
              colIdx * cellWidth + cellWidth - 12,
              (headerHeight - 6) / 2,
              colIdx * cellWidth + cellWidth - 8,
              (headerHeight + 6) / 2,
              colIdx * cellWidth + cellWidth - 4,
              (headerHeight - 6) / 2,
            ]}
            closed={true}
            fill="#999"
            stroke="#999"
            strokeWidth={0.5}
          />
        </Group>
      ))}

      {/* Data rows */}
      {rows.slice(0, visibleRows).map((row, rowIdx) => (
        <Group key={`row-${rowIdx}`}>
          {/* Row background */}
          <Rect
            x={0}
            y={headerHeight + rowIdx * rowHeight}
            width={restrictedWidth}
            height={rowHeight}
            fill={rowIdx % 2 === 0 ? "#ffffff" : "#f9f9f9"}
            stroke={stroke}
            strokeWidth={0}
          />

          {/* Row separator line */}
          <Line
            points={[
              0,
              headerHeight + (rowIdx + 1) * rowHeight,
              restrictedWidth,
              headerHeight + (rowIdx + 1) * rowHeight,
            ]}
            stroke={stroke}
            strokeWidth={1}
          />

          {/* Cells */}
          {row.map((cell, colIdx) => (
            <Group key={`cell-${rowIdx}-${colIdx}`}>
              {/* Column separator line */}
              {colIdx > 0 && (
                <Line
                  points={[
                    colIdx * cellWidth,
                    headerHeight + rowIdx * rowHeight,
                    colIdx * cellWidth,
                    headerHeight + (rowIdx + 1) * rowHeight,
                  ]}
                  stroke={stroke}
                  strokeWidth={1}
                />
              )}

              {/* Cell text */}
              <Text
                x={colIdx * cellWidth + 8}
                y={headerHeight + rowIdx * rowHeight + (rowHeight - 12) / 2}
                text={cell}
                fontSize={12}
                fontFamily="Arial"
                fill={textColor}
                width={cellWidth - 16}
                ellipsis={true}
                wrap="none"
              />
            </Group>
          ))}
        </Group>
      ))}
    </Group>
  );
});
