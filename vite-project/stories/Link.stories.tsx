import React from "react"
import { Link } from "../src/Link"
import { Link as ReachLink } from "@reach/router"
import { ThemeProvider, ColorModeProvider, Box } from "@chakra-ui/core"
import theme from "../theme.js"

export default {
	title: "Link",
	component: Link,
}

export const defaultLink = () => (
	<ThemeProvider theme={theme}>
		<ColorModeProvider>
			<Link href="https://www.vidyasource.com/blog/vidya/technology/lessons-from-java-for-testing-in-react-typescript/">
				A blog post about testing in React.
			</Link>
		</ColorModeProvider>
	</ThemeProvider>
)

export const visitedLink = () => (
	<ThemeProvider theme={theme}>
		<ColorModeProvider>
			<Link href="/">A visited link (this page).</Link>
		</ColorModeProvider>
	</ThemeProvider>
)

export const linkOnDarkBackground = () => (
	<ThemeProvider theme={theme}>
		<ColorModeProvider value="dark">
			<Box bg="primary" w="100%" p={4}>
				<Link href="https://www.vidyasource.com/blog/vidya/technology/code-coverage-is-killing-you/">
					A blog post on code coverage.
				</Link>
			</Box>
		</ColorModeProvider>
	</ThemeProvider>
)

export const visitedLinkOnDarkBackground = () => (
	<ThemeProvider theme={theme}>
		<ColorModeProvider value="dark">
			<Box bg="primary" w="100%" p={4}>
				<Link href="/">A visited link (this page).</Link>
			</Box>
		</ColorModeProvider>
	</ThemeProvider>
)

export const routeLink = () => (
	<ThemeProvider theme={theme}>
		<Link as={ReachLink} to="/">
			This shows how you wrap a third-party link (e.g. from Reach or React Router)
		</Link>
	</ThemeProvider>
)

export const tryItOut = args => {
	const { children, ...rest } = args
	return (
		<ThemeProvider theme={theme}>
			<ColorModeProvider>
				<Link {...rest}>{children}</Link>
			</ColorModeProvider>
		</ThemeProvider>
	)
}

tryItOut.args = { children: "Try It Out" }
tryItOut.argTypes = {
	as: { control: { disable: true } },
	to: { control: { disable: true } },
	onClick: { action: "clicked" },
}
