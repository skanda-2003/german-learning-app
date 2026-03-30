// app/+html.tsx — Custom HTML shell for Expo Router web builds.
//
// This file controls what goes into the <html> and <head> of the web export.
// We use it to inject explicit favicon <link> tags, which is more reliable
// than relying on the app.json web.favicon field alone.
//
// Expo Router picks this file up automatically during `expo export --platform web`.
// Files in public/ are copied to the output root, so /favicon.svg and /favicon.ico
// are served from the site root on Vercel.

import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/*
          Favicon — two formats for maximum browser coverage:
          1. SVG  → Chrome, Firefox, Edge (sharp, scales to any size)
          2. PNG  → Safari, older browsers (named .ico, which browsers accept as PNG)
          Browser picks the first format it supports.
        */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.ico" />

        {/* Resets ScrollView's default body styles for web */}
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
