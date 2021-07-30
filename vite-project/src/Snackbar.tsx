import React from "react"
import { motion } from "framer-motion"

import { Text, Box, BoxProps, useToast, ThemeProvider, ColorModeProvider } from "@chakra-ui/core"

//@ts-ignore
import theme from "../theme.js"
import { NotificationProps } from "./Banner"
import { LinkButton } from "./LinkButton"

interface SnackbarProps {
	children: React.ReactNode
	buttonText?: string
	action?: () => void
}

const snackbarProps: BoxProps = {
	...NotificationProps,
	bg: "snackbar",
	padding: "16",
}

const snackbarVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
}

export const Snackbar: React.FC<SnackbarProps> = (p: SnackbarProps) => {
	const { action, children } = p

	return (
		<motion.div variants={snackbarVariants} initial="hidden" animate="visible">
			<Box {...snackbarProps}>
				<Box padding="0" marginRight="8" flexGrow={1} textAlign="left" color="white">
					<Text wordBreak="break-word" margin="0">
						{children}
					</Text>
				</Box>

				{action && (
					<ColorModeProvider value="dark">
						<LinkButton onClick={p.action}>{p.buttonText}</LinkButton>
					</ColorModeProvider>
				)}
			</Box>
		</motion.div>
	)
}

export const useSnackbar: (b: React.ReactElement<SnackbarProps>) => () => void = b => {
	const toast = useToast()
	const duration = 8000

	return () =>
		toast({
			position: "bottom",
			duration: duration,
			render: (p: { onClose: () => void; id: string }) => (
				<ThemeProvider theme={theme}>
					{b.props.action
						? React.cloneElement(b, {
								action: () => {
									b.props.action && b.props.action()
									p.onClose()
								},
						  })
						: b}
				</ThemeProvider>
			),
		})
}
