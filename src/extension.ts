import * as vscode from "vscode";
import { registerWebviewProvider } from "@/core/providers/webview.provider";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(registerWebviewProvider(context));

  const openWireframeCommand = vscode.commands.registerCommand(
    "quickmock.openWireframe",
    (uri: vscode.Uri) => {
      vscode.commands.executeCommand(
        "vscode.openWith",
        uri,
        "quickmock.wireframeViewer"
      );
    }
  );

  context.subscriptions.push(openWireframeCommand);
}

export function deactivate() {}
