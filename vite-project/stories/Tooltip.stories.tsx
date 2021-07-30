import React from "react"
import { Box, ThemeProvider } from "@chakra-ui/core"
import { Tooltip } from "../src/Tooltip"
import theme from "../theme.js"
import { Settings } from "@material-ui/icons"

export default {
	title: "Tooltip",
}

export const defaultTooltip = () => (
	<ThemeProvider theme={theme}>
		<Box textAlign="center">
			<Tooltip text="Default Tooltip">
				<Box as={Settings} color="clickable" size="iconMd" />
			</Tooltip>
		</Box>
	</ThemeProvider>
)

export const leftAlignedTooltip = () => (
	<ThemeProvider theme={theme}>
		<Box textAlign="center">
			<Tooltip text="Default Tooltip" alignment="left">
				<Box as={Settings} color="clickable" size="iconMd" />
			</Tooltip>
		</Box>
	</ThemeProvider>
)

export const rightAlignedTooltip = () => (
	<ThemeProvider theme={theme}>
		<Box textAlign="center">
			<Tooltip text="Default Tooltip" alignment="right">
				<Box as={Settings} color="clickable" size="iconMd" />
			</Tooltip>
		</Box>
	</ThemeProvider>
)
