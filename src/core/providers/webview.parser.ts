import { QuickMockDocument, Page, ShapeModel } from "@/core/model";

export const parseQuickMockDocument = (content: string): QuickMockDocument => {
  try {
    if (!content || content.trim() === "") {
      throw new Error("File is empty or contains only whitespace");
    }

    const parsed = JSON.parse(content);

    if (!isValidDocumentStructure(parsed)) {
      throw new Error("Invalid QuickMock file format: missing required fields");
    }

    validatePages(parsed.pages);

    return parsed as QuickMockDocument;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON format in .qm file: ${error.message}`);
    }
    throw error;
  }
};

const isValidDocumentStructure = (parsed: any): boolean => {
  return (
    parsed &&
    typeof parsed === "object" &&
    typeof parsed.version === "string" &&
    Array.isArray(parsed.pages) &&
    parsed.pages.length > 0 &&
    parsed.size &&
    typeof parsed.size.width === "number" &&
    typeof parsed.size.height === "number"
  );
};

const validatePages = (pages: any[]): void => {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    if (!isValidPage(page)) {
      throw new Error(
        `Invalid page format at index ${i}: ${page.id || "unknown"}`
      );
    }

    validateShapes(page.shapes, page.id);
  }
};

const isValidPage = (page: any): page is Page => {
  return (
    page &&
    typeof page.id === "string" &&
    page.id.trim() !== "" &&
    typeof page.name === "string" &&
    page.name.trim() !== "" &&
    Array.isArray(page.shapes)
  );
};

const validateShapes = (shapes: any[], pageId: string): void => {
  for (let i = 0; i < shapes.length; i++) {
    const shape = shapes[i];

    if (!isValidShape(shape)) {
      throw new Error(
        `Invalid shape format in page "${pageId}" at index ${i}: ${
          shape.id || "unknown"
        }`
      );
    }
  }
};

const isValidShape = (shape: any): shape is ShapeModel => {
  return (
    shape &&
    typeof shape.id === "string" &&
    shape.id.trim() !== "" &&
    typeof shape.x === "number" &&
    typeof shape.y === "number" &&
    typeof shape.width === "number" &&
    typeof shape.height === "number" &&
    shape.width > 0 &&
    shape.height > 0 &&
    typeof shape.type === "string" &&
    shape.type.trim() !== "" &&
    typeof shape.allowsInlineEdition === "boolean" &&
    Array.isArray(shape.typeOfTransformer)
  );
};

export const getDocumentMetadata = (document: QuickMockDocument) => {
  const totalShapes = document.pages.reduce(
    (total, page) => total + page.shapes.length,
    0
  );
  const shapeTypes = new Set<string>();

  document.pages.forEach((page) => {
    page.shapes.forEach((shape) => {
      shapeTypes.add(shape.type);
    });
  });

  return {
    version: document.version,
    pageCount: document.pages.length,
    totalShapes,
    uniqueShapeTypes: Array.from(shapeTypes).sort(),
    canvasSize: document.size,
    customColors:
      document.customColors?.filter((color) => color !== null) || [],
  };
};
