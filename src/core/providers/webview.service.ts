import * as vscode from "vscode";
import { renderToString } from "react-dom/server";
import React from "react";
import {
  HtmlDocument,
  ErrorPage,
  MainPage,
  InitializingPage,
} from "@/core/layouts";
import { getAllStyles, loadingStyles } from "@/core/styles";

const renderToHtml = (component: React.ReactElement): string => {
  return `<!DOCTYPE html>\n${renderToString(component)}`;
};

const getContentSecurityPolicy = (
  webview: vscode.Webview,
  context: vscode.ExtensionContext
): string => {
  const nonce = getNonce();
  return [
    `default-src 'none'`,
    `script-src ${webview.cspSource} 'nonce-${nonce}'`,
    `style-src ${webview.cspSource} 'unsafe-inline'`,
    `img-src ${webview.cspSource} https: data:`,
    `font-src ${webview.cspSource}`,
  ].join("; ");
};

const getInitializationScript = (context: vscode.ExtensionContext): string => {
  return `
    window.vscodeApi = acquireVsCodeApi();
    window.extensionPath = '${context.extensionPath}';
  `;
};

const getNonce = (): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const getMainHtml = (
  webview: vscode.Webview,
  context: vscode.ExtensionContext
): string => {
  const webviewUri = webview
    .asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, "dist", "webview.js")
    )
    .toString();

  const assetsUri = webview
    .asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "assets"))
    .toString();

  const csp = getContentSecurityPolicy(webview, context);
  const styles = getAllStyles();
  const scripts = getInitializationScript(context);

  return renderToHtml(
    React.createElement(HtmlDocument, {
      title: "QuickMock Wireframe Viewer",
      webviewUri,
      assetsUri,
      csp,
      styles,
      scripts,
      children: React.createElement(MainPage),
    })
  );
};

export const getLoadingHtml = (): string => {
  return renderToHtml(
    React.createElement(HtmlDocument, {
      title: "Loading QuickMock...",
      styles: getAllStyles() + loadingStyles,
      children: React.createElement(InitializingPage),
    })
  );
};

export const getErrorHtml = (errorMessage: string): string => {
  const escapedError = escapeHtml(errorMessage);

  return renderToHtml(
    React.createElement(HtmlDocument, {
      title: "QuickMock Error",
      styles: getAllStyles(),
      children: React.createElement(ErrorPage, {
        errorMessage: escapedError,
      }),
    })
  );
};
