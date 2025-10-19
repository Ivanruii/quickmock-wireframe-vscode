import React from "react";

interface HtmlDocumentProps {
  title: string;
  children: React.ReactNode;
  webviewUri?: string;
  assetsUri?: string;
  csp?: string;
  styles?: string;
  scripts?: string;
}

export const HtmlDocument: React.FC<HtmlDocumentProps> = ({
  title,
  children,
  webviewUri,
  assetsUri,
  csp,
  styles,
  scripts,
}) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {csp && <meta httpEquiv="Content-Security-Policy" content={csp} />}
        <title>{title}</title>
        {assetsUri && <base href={`${assetsUri}/`} />}
        {styles && <style dangerouslySetInnerHTML={{ __html: styles }} />}
      </head>
      <body>
        {children}
        {scripts && <script dangerouslySetInnerHTML={{ __html: scripts }} />}
        {webviewUri && <script src={webviewUri} />}
      </body>
    </html>
  );
};
