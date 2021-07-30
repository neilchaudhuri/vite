import React from "react"
import { Snackbar, useSnackbar } from "../src/Snackbar"
import { ThemeProvider } from "@chakra-ui/core"
import { Button } from "../src/Button"
import theme from "../theme.js"

export default {
	title: "Snackbar",
	component: Snackbar,
}

export const snackbarWithoutAction = () => {
	const snackbar = <Snackbar>Record Deleted</Snackbar>
	const b = useSnackbar(snackbar)
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={() => b()}>Show Snackbar</Button>
		</ThemeProvider>
	)
}

export const snackbarWithUndo = () => {
	const snackbar = (
		<Snackbar action={() => console.log("Snackbar action called")} buttonText="Undo">
			Record Deleted
		</Snackbar>
	)
	const b = useSnackbar(snackbar)
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={() => b()}>Show Snackbar</Button>
		</ThemeProvider>
	)
}

export const snackbarWithClose = () => {
	const snackbar = (
		<Snackbar action={() => console.log("Snackbar action called")} buttonText="Close">
			Record Deleted
		</Snackbar>
	)
	const b = useSnackbar(snackbar)
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={() => b()}>Show Snackbar</Button>
		</ThemeProvider>
	)
}

export const tryItOut = args => {
	const { children, ...rest } = args
	const snackbar = <Snackbar {...rest}>{children}</Snackbar>
	const b = useSnackbar(snackbar)
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={() => b()}>Show Snackbar</Button>
		</ThemeProvider>
	)
}
tryItOut.args = { children: "Try It Out" }
tryItOut.argTypes = {
	action: { control: { disable: true } },
}
