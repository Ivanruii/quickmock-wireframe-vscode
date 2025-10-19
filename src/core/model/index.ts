export interface QuickMockDocument {
  version: string;
  pages: Page[];
  customColors: (string | null)[];
  size: {
    width: number;
    height: number;
  };
}

export interface Page {
  id: string;
  name: string;
  shapes: Shape[];
}

export interface Shape {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ShapeType;
  allowsInlineEdition: boolean;
  typeOfTransformer: string[];
  text?: string;
  editType?: string;
  otherProps?: ShapeProps;
}

export type ShapeType =
  | "browser"
  | "heading1"
  | "heading2"
  | "heading3"
  | "richtext"
  | "normaltext"
  | "smalltext"
  | "link"
  | "paragraph"
  | "text"
  | "button"
  | "input"
  | "label"
  | "textarea"
  | "checkbox"
  | "radiobutton"
  | "rectangle"
  | "rectangleLow"
  | "horizontalLine"
  | "horizontalLineLow"
  | "verticalLine"
  | "verticalLineLow"
  | "circle"
  | "circleLow"
  | "ellipseLow"
  | "diamond"
  | "triangle"
  | "star"
  | "largeArrow"
  | "image"
  | "imagePlaceholder"
  | "cylinder"
  | "cilinder"
  | "modalCover"
  | "postit"
  | "icon"
  | "fabButton"
  | "listbox"
  | "combobox"
  | "progressbar"
  | "slider"
  | "toggleswitch"
  | "tooltip"
  | "chip"
  | "horizontalscrollbar"
  | "verticalscrollbar"
  | "horizontalScrollBar"
  | "verticalScrollBar"
  | "scrollbar"
  | "datepickerinput"
  | "timepickerinput"
  | "notfound"
  | "mobilephonecontainer"
  | "mobilePhone"
  | "modaldialogcontainer"
  | "modalDialog"
  | "tablet"
  | "accordion"
  | "appBar"
  | "audioPlayer"
  | "barChart"
  | "bar"
  | "breadcrumb"
  | "buttonBar"
  | "calendar"
  | "fileTree"
  | "gauge"
  | "horizontalMenu"
  | "horizontal-menu"
  | "lineChart"
  | "linechart"
  | "loadingIndicator"
  | "loading-indicator"
  | "mapChart"
  | "map"
  | "modal"
  | "pieChart"
  | "pie"
  | "table"
  | "tabsbar"
  | "tabsBar"
  | "toggleLightDark"
  | "verticalMenu"
  | "vertical-menu"
  | "videoPlayer"
  | "videoconference"
  | "textScribbled"
  | "paragraphScribbled";

export interface ShapeProps {
  textColor?: string;
  fontVariant?: string;
  fontStyle?: string;
  textDecoration?: string;
  fontSize?: number;
  textAlignment?: string;

  stroke?: string;
  backgroundColor?: string;
  strokeStyle?: string[];
  strokeWidth?: number;
  borderRadius?: string;
  disabled?: boolean;

  icon?: {
    name: string;
    filename: string;
    searchTerms: string[];
    categories: string[];
  };
  iconSize?: string;

  selectedBackgroundColor?: string;
}
