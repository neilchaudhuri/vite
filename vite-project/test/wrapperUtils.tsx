import React, { FC } from "react"
import { render, RenderResult } from "@testing-library/react"
import { ThemeProvider, ColorModeProvider } from "@chakra-ui/core"
// @ts-ignore
import theme from "./theme"

export const renderWithTheme: (ui: React.ReactElement) => RenderResult = ui => {
	const Wrapper: FC = (props: { children?: React.ReactNode }) => (
		// @ts-ignore
		// eslint-disable-next-line testing-library/no-node-access
		<ThemeProvider theme={theme}>{props?.children}</ThemeProvider>
	)

	return render(ui, { wrapper: Wrapper })
}

export const renderWithDarkTheme: (ui: React.ReactElement) => RenderResult = ui => {
	const Wrapper: FC = (props: { children?: React.ReactNode }) => (
		// @ts-ignore
		<ThemeProvider theme={theme}>
			<ColorModeProvider value="dark">
				{/* eslint-disable-next-line testing-library/no-node-access */}
				{props?.children}
			</ColorModeProvider>
		</ThemeProvider>
	)

	return render(ui, { wrapper: Wrapper })
}
