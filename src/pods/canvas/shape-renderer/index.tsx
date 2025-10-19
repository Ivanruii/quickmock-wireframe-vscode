import React from "react";
import { Shape } from "@/core/model";
import { ShapeRendererProps } from "./model";

import {
  renderButton,
  renderInput,
  renderLabel,
  renderCheckbox,
  renderRadioButton,
  renderTextArea,
  renderComboBox,
  renderListbox,
  renderProgressBar,
  renderToggleSwitch,
  renderDatePickerInput,
  renderTimePickerInput,
  renderNotFound,
} from "./simple-component";

import { renderSlider } from "./simple-component/slider.renderer";
import { renderTooltip } from "./simple-component/tooltip.renderer";
import { renderHorizontalScrollBar } from "./simple-component/horizontalscrollbar.renderer";
import { renderVerticalScrollBar } from "./simple-component/verticalscrollbar.renderer";
import { renderChip } from "./simple-component/chip.renderer";
import { renderIcon } from "./simple-component/icon.renderer";

import {
  renderBrowserWindow,
  renderMobilePhoneContainer,
  renderModalDialogContainer,
  renderTablet,
} from "./simple-container";

import {
  renderRectangle,
  renderCircle,
  renderHorizontalLine,
  renderVerticalLine,
  renderDiamond,
  renderTriangle,
  renderStar,
  renderLargeArrowShape,
  renderImage,
  renderCilinder,
  renderModalCover,
  renderPostit,
} from "./simple-basic-shapes";

import {
  renderHeading1,
  renderHeading2,
  renderHeading3,
  renderNormaltext,
  renderSmalltext,
  renderRichtext,
  renderLink,
  renderParagraph,
  renderText,
} from "./simple-text-components";

import {
  renderAccordion,
  renderAppBar,
  renderAudioPlayer,
  renderBarChart,
  renderBreadcrumb,
  renderButtonBar,
  renderCalendar,
  renderFabButton,
  renderFileTree,
  renderGauge,
  renderHorizontalMenu,
  renderLineChart,
  renderLoadingIndicator,
  renderMapChart,
  renderModal,
  renderPieChart,
  renderTable,
  renderTabsbar,
  renderToggleLightDark,
  renderVerticalMenu,
  renderVideoPlayer,
  renderVideoconference,
} from "./simple-rich-components";

import {
  renderRectangleLow,
  renderCircleLow,
  renderEllipseLow,
  renderImagePlaceholder,
  renderLowHorizontalLine,
  renderLowVerticalLine,
  renderTextScribbled,
  renderParagraphScribbled,
} from "./simple-low-wireframes-components";

export const renderShapeComponent = (
  shape: Shape,
  shapeRenderedProps: ShapeRendererProps
): React.JSX.Element => {
  switch (shape.type) {
    // Simple components
    case "button":
      return renderButton(shape, shapeRenderedProps);
    case "input":
      return renderInput(shape, shapeRenderedProps);
    case "label":
      return renderLabel(shape, shapeRenderedProps);
    case "checkbox":
      return renderCheckbox(shape, shapeRenderedProps);
    case "radiobutton":
      return renderRadioButton(shape, shapeRenderedProps);
    case "textarea":
      return renderTextArea(shape, shapeRenderedProps);
    case "combobox":
      return renderComboBox(shape, shapeRenderedProps);
    case "listbox":
      return renderListbox(shape, shapeRenderedProps);
    case "progressbar":
      return renderProgressBar(shape, shapeRenderedProps);
    case "slider":
      return renderSlider(shape, shapeRenderedProps);
    case "toggleswitch":
      return renderToggleSwitch(shape, shapeRenderedProps);
    case "tooltip":
      return renderTooltip(shape, shapeRenderedProps);
    case "chip":
      return renderChip(shape, shapeRenderedProps);
    case "icon":
      return renderIcon(shape, shapeRenderedProps);
    case "horizontalscrollbar":
      return renderHorizontalScrollBar(shape, shapeRenderedProps);
    case "horizontalScrollBar":
      return renderHorizontalScrollBar(shape, shapeRenderedProps);
    case "scrollbar":
      return renderHorizontalScrollBar(shape, shapeRenderedProps);
    case "verticalscrollbar":
      return renderVerticalScrollBar(shape, shapeRenderedProps);
    case "verticalScrollBar":
      return renderVerticalScrollBar(shape, shapeRenderedProps);
    case "datepickerinput":
      return renderDatePickerInput(shape, shapeRenderedProps);
    case "timepickerinput":
      return renderTimePickerInput(shape, shapeRenderedProps);
    case "notfound":
      return renderNotFound(shape, shapeRenderedProps);

    // Container components
    case "browser":
      return renderBrowserWindow(shape, shapeRenderedProps);
    case "mobilephonecontainer":
      return renderMobilePhoneContainer(shape, shapeRenderedProps);
    case "mobilePhone":
      return renderMobilePhoneContainer(shape, shapeRenderedProps);
    case "modaldialogcontainer":
      return renderModalDialogContainer(shape, shapeRenderedProps);
    case "modalDialog":
      return renderModalDialogContainer(shape, shapeRenderedProps);
    case "tablet":
      return renderTablet(shape, shapeRenderedProps);

    // Basic shapes
    case "rectangle":
      return renderRectangle(shape, shapeRenderedProps);
    case "rectangleLow":
      return renderRectangleLow(shape, shapeRenderedProps);
    case "horizontalLine":
      return renderHorizontalLine(shape, shapeRenderedProps);
    case "horizontalLineLow":
      return renderLowHorizontalLine(shape, shapeRenderedProps);
    case "verticalLine":
      return renderVerticalLine(shape, shapeRenderedProps);
    case "verticalLineLow":
      return renderLowVerticalLine(shape, shapeRenderedProps);
    case "circle":
      return renderCircle(shape, shapeRenderedProps);
    case "circleLow":
      return renderCircleLow(shape, shapeRenderedProps);
    case "ellipseLow":
      return renderEllipseLow(shape, shapeRenderedProps);
    case "imagePlaceholder":
      return renderImagePlaceholder(shape, shapeRenderedProps);
    case "diamond":
      return renderDiamond(shape, shapeRenderedProps);
    case "triangle":
      return renderTriangle(shape, shapeRenderedProps);
    case "star":
      return renderStar(shape, shapeRenderedProps);
    case "largeArrow":
      return renderLargeArrowShape(shape, shapeRenderedProps);
    case "image":
      return renderImage(shape, shapeRenderedProps);
    case "cylinder":
      return renderCilinder(shape, shapeRenderedProps);
    case "cilinder":
      return renderCilinder(shape, shapeRenderedProps);
    case "modalCover":
      return renderModalCover(shape, shapeRenderedProps);
    case "postit":
      return renderPostit(shape, shapeRenderedProps);

    // Text components
    case "heading1":
      return renderHeading1(shape, shapeRenderedProps);
    case "heading2":
      return renderHeading2(shape, shapeRenderedProps);
    case "heading3":
      return renderHeading3(shape, shapeRenderedProps);
    case "richtext":
      return renderRichtext(shape, shapeRenderedProps);
    case "normaltext":
      return renderNormaltext(shape, shapeRenderedProps);
    case "smalltext":
      return renderSmalltext(shape, shapeRenderedProps);
    case "link":
      return renderLink(shape, shapeRenderedProps);
    case "paragraph":
      return renderParagraph(shape, shapeRenderedProps);
    case "text":
      return renderText(shape, shapeRenderedProps);
    case "textScribbled":
      return renderTextScribbled(shape, shapeRenderedProps);
    case "paragraphScribbled":
      return renderParagraphScribbled(shape, shapeRenderedProps);

    // Rich components
    case "accordion":
      return renderAccordion(shape, shapeRenderedProps);
    case "appBar":
      return renderAppBar(shape, shapeRenderedProps);
    case "audioPlayer":
      return renderAudioPlayer(shape, shapeRenderedProps);
    case "barChart":
      return renderBarChart(shape, shapeRenderedProps);
    case "bar":
      return renderBarChart(shape, shapeRenderedProps);
    case "breadcrumb":
      return renderBreadcrumb(shape, shapeRenderedProps);
    case "buttonBar":
      return renderButtonBar(shape, shapeRenderedProps);
    case "calendar":
      return renderCalendar(shape, shapeRenderedProps);
    case "fabButton":
      return renderFabButton(shape, shapeRenderedProps);
    case "fileTree":
      return renderFileTree(shape, shapeRenderedProps);
    case "gauge":
      return renderGauge(shape, shapeRenderedProps);
    case "horizontalMenu":
      return renderHorizontalMenu(shape, shapeRenderedProps);
    case "horizontal-menu":
      return renderHorizontalMenu(shape, shapeRenderedProps);
    case "lineChart":
      return renderLineChart(shape, shapeRenderedProps);
    case "linechart":
      return renderLineChart(shape, shapeRenderedProps);
    case "loadingIndicator":
      return renderLoadingIndicator(shape, shapeRenderedProps);
    case "loading-indicator":
      return renderLoadingIndicator(shape, shapeRenderedProps);
    case "mapChart":
      return renderMapChart(shape, shapeRenderedProps);
    case "map":
      return renderMapChart(shape, shapeRenderedProps);
    case "modal":
      return renderModal(shape, shapeRenderedProps);
    case "pieChart":
      return renderPieChart(shape, shapeRenderedProps);
    case "pie":
      return renderPieChart(shape, shapeRenderedProps);
    case "table":
      return renderTable(shape, shapeRenderedProps);
    case "tabsbar":
      return renderTabsbar(shape, shapeRenderedProps);
    case "tabsBar":
      return renderTabsbar(shape, shapeRenderedProps);
    case "toggleLightDark":
      return renderToggleLightDark(shape, shapeRenderedProps);
    case "verticalMenu":
      return renderVerticalMenu(shape, shapeRenderedProps);
    case "vertical-menu":
      return renderVerticalMenu(shape, shapeRenderedProps);
    case "videoPlayer":
      return renderVideoPlayer(shape, shapeRenderedProps);
    case "videoconference":
      return renderVideoconference(shape, shapeRenderedProps);

    // Low-wireframe components
    case "rectangleLow":
      return renderRectangleLow(shape, shapeRenderedProps);
    case "circleLow":
      return renderCircleLow(shape, shapeRenderedProps);
    case "ellipseLow":
      return renderEllipseLow(shape, shapeRenderedProps);
    case "imagePlaceholder":
      return renderImagePlaceholder(shape, shapeRenderedProps);
    case "horizontalLineLow":
      return renderLowHorizontalLine(shape, shapeRenderedProps);
    case "verticalLineLow":
      return renderLowVerticalLine(shape, shapeRenderedProps);
    case "textScribbled":
      return renderTextScribbled(shape, shapeRenderedProps);
    case "paragraphScribbled":
      return renderParagraphScribbled(shape, shapeRenderedProps);

    // Default fallback
    default:
      return renderNotFound(shape, shapeRenderedProps); // Use notfound as fallback for unknown shape types
  }
};
