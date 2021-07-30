import React from "react"
import Chip from "../src/Chip"
import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"
import { AccountCircleSharp, Alarm } from "@material-ui/icons"

export default {
	title: "Chip",
	component: Chip,
}

export const defaultChipForDisplay = () => {
	return (
		<ThemeProvider theme={theme}>
			<Chip>John Doe</Chip>
		</ThemeProvider>
	)
}

export const displayChipWithLeadingIcon = () => {
	return (
		<ThemeProvider theme={theme}>
			<Chip leadingIcon={AccountCircleSharp}>John Doe</Chip>
		</ThemeProvider>
	)
}

export const actionChip = () => {
	const action = {
		onClick: () => console.log("Create alert"),
	}
	return (
		<ThemeProvider theme={theme}>
			<Chip action={action}>Create Alert</Chip>
		</ThemeProvider>
	)
}

export const actionChipWithLeadingIcon = () => {
	const action = {
		onClick: () => console.log("Create alert"),
	}
	return (
		<ThemeProvider theme={theme}>
			<Chip leadingIcon={Alarm} action={action}>
				Create Alert
			</Chip>
		</ThemeProvider>
	)
}

export const disabledActionChip = () => {
	const action = {
		onClick: () => console.log("Create alert"),
	}
	return (
		<ThemeProvider theme={theme}>
			<Chip disabled action={action}>
				Create Alert
			</Chip>
		</ThemeProvider>
	)
}

export const filterChip = () => {
	const action = {
		onClick: () => console.log("Remove filter"),
		isFilter: true,
	}
	return (
		<ThemeProvider theme={theme}>
			<Chip action={action}>John Doe</Chip>
		</ThemeProvider>
	)
}

export const filterChipWithLeadingIcon = () => {
	const action = {
		onClick: () => console.log("Remove filter"),
		isFilter: true,
	}
	return (
		<ThemeProvider theme={theme}>
			<Chip leadingIcon={AccountCircleSharp} action={action}>
				John Doe
			</Chip>
		</ThemeProvider>
	)
}

export const disabledChipWithLeadingAndTrailingIcons = () => {
	const action = {
		onClick: () => console.log("Remove filter"),
		isFilter: true,
	}
	return (
		<ThemeProvider theme={theme}>
			<Chip disabled leadingIcon={AccountCircleSharp} action={action}>
				Disabled Chip
			</Chip>
		</ThemeProvider>
	)
}

export const tryItOut = args => {
	const { children, ...rest } = args
	return (
		<ThemeProvider theme={theme}>
			<Chip {...rest}>{children}</Chip>
		</ThemeProvider>
	)
}

tryItOut.args = { children: "Try It Out", action: { isFilter: true } }
tryItOut.argTypes = {
	leadingIcon: { control: { disable: true } },
	action: {
		onClick: { control: { disable: true } },
		isFilter: { control: { type: "boolean" } },
	},
}
