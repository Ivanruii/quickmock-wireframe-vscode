import type { ShapeSizeRestrictions } from "@/common/types";

export const getStrokeStyle = (strokeStyle?: string[]): number[] => {
  if (!strokeStyle || strokeStyle.length === 0) {
    return []; // Solid line - default
  }

  const numberArray = strokeStyle.map(Number);

  // None/invisible stroke pattern [0,1]
  if (
    numberArray.length === 2 &&
    numberArray[0] === 0 &&
    numberArray[1] === 1
  ) {
    return [0, 1];
  }

  // Dashed pattern [10,10]
  if (
    numberArray.length === 2 &&
    numberArray[0] === 10 &&
    numberArray[1] === 10
  ) {
    return [10, 10];
  }

  // Dotted pattern [2,5]
  if (
    numberArray.length === 2 &&
    numberArray[0] === 2 &&
    numberArray[1] === 5
  ) {
    return [2, 5];
  }

  return numberArray.length > 0 ? numberArray : [];
};

export const STROKE_STYLES = {
  SOLID: [] as number[],
  DASHED: [10, 10] as number[],
  DOTTED: [2, 5] as number[],
  NONE: [0, 1] as number[],
} as const;

export const fitSizeToShapeSizeRestrictions = (
  restrictions: ShapeSizeRestrictions,
  width: number,
  height: number
): { width: number; height: number } => {
  let restrictedWidth = width;
  let restrictedHeight = height;

  if (restrictedWidth < restrictions.minWidth) {
    restrictedWidth = restrictions.minWidth;
  }
  if (restrictions.maxWidth > 0 && restrictedWidth > restrictions.maxWidth) {
    restrictedWidth = restrictions.maxWidth;
  }

  if (restrictedHeight < restrictions.minHeight) {
    restrictedHeight = restrictions.minHeight;
  }
  if (restrictions.maxHeight > 0 && restrictedHeight > restrictions.maxHeight) {
    restrictedHeight = restrictions.maxHeight;
  }

  return { width: restrictedWidth, height: restrictedHeight };
};
