import React, { useEffect, useState } from "react"
import { LinkButton, NavForwardIcon, NavBackIcon } from "../src/LinkButton"
import { Box, ColorModeProvider, ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"

export default {
	title: "LinkButton",
	component: LinkButton,
}

export const defaultLinkButton = () => {
	const [count, setCount] = useState(0)
	useEffect(() => {
		console.log(`You clicked ${count} times. Oh and don't worry about the warning.`)
	}, [count])
	const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
		setCount(count + 1)
	}
	return (
		<ThemeProvider theme={theme}>
			<LinkButton onClick={onClick}>Link Button</LinkButton>
		</ThemeProvider>
	)
}

export const leadingIconLinkButton = () => (
	<ThemeProvider theme={theme}>
		<LinkButton buttonIcon={NavBackIcon} onClick={() => console.log("Click")}>
			Previous
		</LinkButton>
	</ThemeProvider>
)

export const trailingIconLinkButton = () => (
	<ThemeProvider theme={theme}>
		<LinkButton buttonIcon={NavForwardIcon} onClick={() => console.log("Click")}>
			Next
		</LinkButton>
	</ThemeProvider>
)

export const darkLinkButton = () => (
	<ThemeProvider theme={theme}>
		<ColorModeProvider value="dark">
			<Box bg="primary" w="100%" p={4} onClick={() => console.log("Click")}>
				<LinkButton onClick={() => console.log("Click")}>Link Button</LinkButton>
			</Box>
		</ColorModeProvider>
	</ThemeProvider>
)

export const disabledLinkButton = () => (
	<ThemeProvider theme={theme}>
		<LinkButton disabled onClick={() => console.log("Click")}>
			Link Button
		</LinkButton>
	</ThemeProvider>
)

export const darkDisabledLinkButton = () => (
	<ThemeProvider theme={theme}>
		<ColorModeProvider value="dark">
			<Box bg="primary" w="100%" p={4}>
				<LinkButton disabled onClick={() => console.log("Click")}>
					Link Button
				</LinkButton>
			</Box>
		</ColorModeProvider>
	</ThemeProvider>
)

export const tryItOut = args => {
	const { children, ...rest } = args
	return (
		<ThemeProvider theme={theme}>
			<LinkButton {...rest}>{children}</LinkButton>
		</ThemeProvider>
	)
}

tryItOut.args = { children: "Try It Out" }
tryItOut.argTypes = {
	as: { control: { disable: true } },
	to: { control: { disable: true } },
	buttonIcon: { control: { disable: true } },
	onClick: { action: "clicked" },
}
