"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Provider } from "react-redux";

import { store } from "../redux/store";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <Provider store={store}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>;
    </Provider>
  );
}
