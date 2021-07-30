import React, { useEffect, useState } from "react"
import { Button } from "../src/Button"
import { Box, ColorModeProvider, ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"
import { ArrowForwardIosSharp, DateRangeSharp } from "@material-ui/icons"
import { IconAlignment } from "../src/Icon"

export default {
	title: "Button",
	component: Button,
}

export const defaultMediumPrimaryButton = () => {
	const [count, setCount] = useState(0)
	useEffect(() => {
		console.log(`You clicked ${count} times. Oh and don't worry about the warning.`)
	}, [count])
	const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
		setCount(count + 1)
	}
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={onClick}>Primary</Button>
		</ThemeProvider>
	)
}

export const smallPrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button size="sm" onClick={() => console.log("Click")}>
			Primary
		</Button>
	</ThemeProvider>
)

export const largePrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button size="lg" onClick={() => console.log("Click")}>
			Primary
		</Button>
	</ThemeProvider>
)

export const extraLargePrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button size="xl" onClick={() => console.log("Click")}>
			Primary
		</Button>
	</ThemeProvider>
)

export const extraExtraLargePrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button size="xxl" onClick={() => console.log("Click")}>
			Primary
		</Button>
	</ThemeProvider>
)

export const extraExtraExtraLargePrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button size="xxxl" onClick={() => console.log("Click")}>
			Primary
		</Button>
	</ThemeProvider>
)

export const fullPrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button size="full" onClick={() => console.log("Click")}>
			Primary
		</Button>
	</ThemeProvider>
)

export const leadingIconPrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button buttonIcon={{ mdIcon: DateRangeSharp, alignment: IconAlignment.LEFT }} onClick={() => console.log("Click")}>
			Primary
		</Button>
	</ThemeProvider>
)

export const trailingIconPrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button
			buttonIcon={{ mdIcon: ArrowForwardIosSharp, alignment: IconAlignment.RIGHT }}
			onClick={() => console.log("Click")}>
			Primary
		</Button>
	</ThemeProvider>
)

export const darkPrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<ColorModeProvider value="dark">
			<Box bg="primary" w="100%" p={4} onClick={() => console.log("Click")}>
				<Button onClick={() => console.log("Click")}>Primary</Button>
			</Box>
		</ColorModeProvider>
	</ThemeProvider>
)

export const disabledPrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button disabled onClick={() => console.log("Click")}>
			Primary
		</Button>
	</ThemeProvider>
)

export const darkDisabledPrimaryButton = () => (
	<ThemeProvider theme={theme}>
		<ColorModeProvider value="dark">
			<Box bg="primary" w="100%" p={4}>
				<Button disabled onClick={() => console.log("Click")}>
					Primary
				</Button>
			</Box>
		</ColorModeProvider>
	</ThemeProvider>
)

export const defaultSecondaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button buttonType="secondary" onClick={() => console.log("Click")}>
			Secondary
		</Button>
	</ThemeProvider>
)

export const disabledSecondaryButton = () => (
	<ThemeProvider theme={theme}>
		<Button buttonType="secondary" disabled onClick={() => console.log("Click")}>
			Secondary
		</Button>
	</ThemeProvider>
)

export const darkSecondaryButton = () => (
	<ThemeProvider theme={theme}>
		<ColorModeProvider value="dark">
			<Box bg="primary" w="100%" p={4}>
				<Button buttonType="secondary" onClick={() => console.log("Click")}>
					Secondary
				</Button>
			</Box>
		</ColorModeProvider>
	</ThemeProvider>
)

export const darkDisabledSecondaryButton = () => (
	<ThemeProvider theme={theme}>
		<ColorModeProvider value="dark">
			<Box bg="primary" w="100%" p={4}>
				<Button buttonType="secondary" disabled onClick={() => console.log("Click")}>
					Secondary
				</Button>
			</Box>
		</ColorModeProvider>
	</ThemeProvider>
)

export const tryItOut = args => {
	return (
		<ThemeProvider theme={theme}>
			<Button {...args}>{args.children}</Button>
		</ThemeProvider>
	)
}
tryItOut.args = { children: "Try It Out" }
tryItOut.argTypes = {
	buttonIcon: { control: { disable: true } },
	onClick: { action: "clicked" },
}
