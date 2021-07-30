import React, { useState } from "react"
import Badge from "../src/Badge"
import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"
import { Box, Flex } from "@chakra-ui/core"
import {
	NotificationsActiveSharp,
	PermPhoneMsgSharp,
	ShoppingCartSharp,
	VoicemailSharp,
	EmailSharp,
	PersonSharp,
} from "@material-ui/icons"

export default {
	title: "Badge",
	component: Badge,
}

export const defaultBadge = () => {
	return (
		<ThemeProvider theme={theme}>
			<Badge />
		</ThemeProvider>
	)
}

export const badgeWithSingleDigitCount = () => {
	const [count] = useState(8)
	return (
		<ThemeProvider theme={theme}>
			<Badge count={count} />
		</ThemeProvider>
	)
}

export const badgeWithDoubleDigitCount = () => (
	<ThemeProvider theme={theme}>
		<Badge count={12} />
	</ThemeProvider>
)

export const badgeWithLargeCount = () => (
	<ThemeProvider theme={theme}>
		<Badge count={128} />
	</ThemeProvider>
)

export const badgeWithDifferentIcons = () => {
	return (
		<ThemeProvider theme={theme}>
			<Flex direction="column">
				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: NotificationsActiveSharp }} />
				</Box>

				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: PermPhoneMsgSharp }} />
				</Box>

				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: ShoppingCartSharp }} />
				</Box>

				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: VoicemailSharp }} />
				</Box>

				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: EmailSharp }} />
				</Box>

				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: PersonSharp }} />
				</Box>
			</Flex>
		</ThemeProvider>
	)
}

export const colorfulBadges = () => {
	return (
		<ThemeProvider theme={theme}>
			<Flex direction="column">
				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: NotificationsActiveSharp, color: "blackPearl" }} />
				</Box>

				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: PermPhoneMsgSharp, color: "goldenGrass" }} />
				</Box>

				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: ShoppingCartSharp, color: "funGreen" }} />
				</Box>

				<Box mb="2">
					<Badge count={8} color="doveGray" icon={{ mdIcon: VoicemailSharp, color: "monza" }} />
				</Box>

				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: EmailSharp, color: "doveGray" }} />
				</Box>

				<Box mb="2">
					<Badge count={8} icon={{ mdIcon: PersonSharp }} />
				</Box>
			</Flex>
		</ThemeProvider>
	)
}

export const tryItOut = args => {
	return (
		<ThemeProvider theme={theme}>
			<Badge {...args} />
		</ThemeProvider>
	)
}

tryItOut.argTypes = {
	icon: { control: { disable: true } },
	color: { control: { disable: true } },
}
