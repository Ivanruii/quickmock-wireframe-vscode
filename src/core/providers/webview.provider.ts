import * as vscode from "vscode";
import { parseQuickMockDocument, getDocumentMetadata } from "./webview.parser";
import { getMainHtml, getErrorHtml, getLoadingHtml } from "./webview.service";
import { QuickMockDocument } from "@/core/model";
import { debounce } from "@/core/utils/helpers";

const VIEW_TYPE = "quickmock.wireframeViewer";

interface ProviderState {
  updateTimeout?: NodeJS.Timeout;
}

export const registerWebviewProvider = (
  context: vscode.ExtensionContext
): vscode.Disposable => {
  const providerRegistration = vscode.window.registerCustomEditorProvider(
    VIEW_TYPE,
    {
      async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        token: vscode.CancellationToken
      ): Promise<void> {
        return resolveCustomTextEditor(document, webviewPanel, token, context);
      },
    },
    {
      webviewOptions: {
        retainContextWhenHidden: true,
      },
      supportsMultipleEditorsPerDocument: false,
    }
  );

  return providerRegistration;
};

const resolveCustomTextEditor = async (
  document: vscode.TextDocument,
  webviewPanel: vscode.WebviewPanel,
  token: vscode.CancellationToken,
  context: vscode.ExtensionContext
): Promise<void> => {
  try {
    const state: ProviderState = {};

    setupWebview(webviewPanel, document, context);

    setupEventListeners(webviewPanel, document, context, state);

    await loadInitialContent(webviewPanel, document, context);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    vscode.window.showErrorMessage(
      `Failed to open QuickMock file: ${errorMessage}`
    );

    webviewPanel.webview.html = getErrorHtml(errorMessage);
  }
};

const setupWebview = (
  webviewPanel: vscode.WebviewPanel,
  document: vscode.TextDocument,
  context: vscode.ExtensionContext
): void => {
  webviewPanel.webview.options = {
    enableScripts: true,
    enableCommandUris: false,
    localResourceRoots: [
      vscode.Uri.joinPath(context.extensionUri, "dist"),
      vscode.Uri.joinPath(context.extensionUri, "assets"),
    ],
  };

  const fileName = document.uri.path.split("/").pop() || "QuickMock Wireframe";
  webviewPanel.title = `QuickMock: ${fileName}`;

  webviewPanel.webview.html = getLoadingHtml();
};

const setupEventListeners = (
  webviewPanel: vscode.WebviewPanel,
  document: vscode.TextDocument,
  context: vscode.ExtensionContext,
  state: ProviderState
): void => {
  const subscriptions: vscode.Disposable[] = [];

  const debouncedUpdate = debounce(() => {
    updateWebviewContent(webviewPanel, document);
  }, 300);

  subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.toString() === document.uri.toString()) {
        debouncedUpdate();
      }
    })
  );

  subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((savedDocument) => {
      if (savedDocument.uri.toString() === document.uri.toString()) {
        handleDocumentSave(webviewPanel, savedDocument);
      }
    })
  );

  subscriptions.push(
    webviewPanel.webview.onDidReceiveMessage((message) => {
      handleWebviewMessage(webviewPanel, document, message);
    })
  );

  subscriptions.push(
    webviewPanel.onDidChangeViewState(() => {
      if (webviewPanel.visible && webviewPanel.active) {
        refreshWebview(webviewPanel, document);
      }
    })
  );

  webviewPanel.onDidDispose(() => {
    subscriptions.forEach((subscription) => subscription.dispose());
    if (state.updateTimeout) {
      clearTimeout(state.updateTimeout);
    }
  });
};

const loadInitialContent = async (
  webviewPanel: vscode.WebviewPanel,
  document: vscode.TextDocument,
  context: vscode.ExtensionContext
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  webviewPanel.webview.html = getMainHtml(webviewPanel.webview, context);

  await new Promise((resolve) => setTimeout(resolve, 200));

  updateWebviewContent(webviewPanel, document);
};

const handleDocumentSave = (
  webviewPanel: vscode.WebviewPanel,
  document: vscode.TextDocument
): void => {
  updateWebviewContent(webviewPanel, document);

  vscode.window.showInformationMessage(
    `QuickMock wireframe updated: ${document.uri.path.split("/").pop()}`,
    { modal: false }
  );
};

const handleWebviewMessage = (
  webviewPanel: vscode.WebviewPanel,
  document: vscode.TextDocument,
  message: any
): void => {
  switch (message.type) {
    case "ready":
      updateWebviewContent(webviewPanel, document);
      break;

    case "error":
      vscode.window.showErrorMessage(
        `QuickMock Viewer Error: ${message.message}`
      );
      break;

    case "info":
      vscode.window.showInformationMessage(message.message);
      break;

    case "requestRefresh":
      refreshWebview(webviewPanel, document);
      break;

    case "exportWireframe":
      handleExportRequest(document, message.format);
      break;

    case "showMetadata":
      showDocumentMetadata(document);
      break;

    default:
      console.warn(`Unknown message type from webview: ${message.type}`);
  }
};

const updateWebviewContent = (
  webviewPanel: vscode.WebviewPanel,
  document: vscode.TextDocument
): void => {
  try {
    const content = document.getText();
    const quickMockDoc = parseQuickMockDocument(content);

    if (!isValidQuickMockDocument(quickMockDoc)) {
      throw new Error("Invalid QuickMock document structure");
    }

    webviewPanel.webview.postMessage({
      type: "documentUpdate",
      document: quickMockDoc,
      metadata: getDocumentMetadata(quickMockDoc),
      timestamp: Date.now(),
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown parsing error";

    webviewPanel.webview.postMessage({
      type: "error",
      message: errorMessage,
      timestamp: Date.now(),
    });

    console.error(`QuickMock parsing error for ${document.uri.path}:`, error);
  }
};

const refreshWebview = (
  webviewPanel: vscode.WebviewPanel,
  document: vscode.TextDocument
): void => {
  webviewPanel.webview.postMessage({
    type: "refresh",
    timestamp: Date.now(),
  });

  setTimeout(() => {
    updateWebviewContent(webviewPanel, document);
  }, 100);
};

const handleExportRequest = async (
  document: vscode.TextDocument,
  format: string
): Promise<void> => {
  try {
    const defaultUri = vscode.Uri.file(
      document.uri.path.replace(".qm", `.${format}`)
    );

    const uri = await vscode.window.showSaveDialog({
      defaultUri,
      filters: {
        [`${format.toUpperCase()} files`]: [format],
      },
    });

    if (uri) {
      vscode.window.showInformationMessage(
        `Export functionality will be implemented for ${format} format`,
        { modal: false }
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage(
      `Export failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const showDocumentMetadata = (document: vscode.TextDocument): void => {
  try {
    const content = document.getText();
    const quickMockDoc = parseQuickMockDocument(content);
    const metadata = getDocumentMetadata(quickMockDoc);

    const items = [
      `Version: ${metadata.version}`,
      `Pages: ${metadata.pageCount}`,
      `Canvas Size: ${metadata.canvasSize.width} x ${metadata.canvasSize.height}`,
      `Custom Colors: ${metadata.customColors.length}`,
      `File Size: ${(content.length / 1024).toFixed(2)} KB`,
    ];

    vscode.window.showQuickPick(items, {
      title: `QuickMock Document Metadata - ${document.uri.path
        .split("/")
        .pop()}`,
      canPickMany: false,
    });
  } catch (error) {
    vscode.window.showErrorMessage(
      `Failed to read metadata: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const isValidQuickMockDocument = (doc: any): doc is QuickMockDocument => {
  return (
    doc &&
    typeof doc.version === "string" &&
    Array.isArray(doc.pages) &&
    doc.pages.length > 0 &&
    doc.size &&
    typeof doc.size.width === "number" &&
    typeof doc.size.height === "number"
  );
};
