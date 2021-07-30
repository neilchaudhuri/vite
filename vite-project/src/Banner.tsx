import React from "react"
import { H4 } from "./Typography"
import { CloseSharp, CheckCircleSharp, WarningSharp, ErrorSharp, InfoOutlined } from "@material-ui/icons"
import { Text, Box, PseudoBox, BoxProps, useToast, ThemeProvider } from "@chakra-ui/core"
//@ts-ignore
import theme from "../theme.js"
import { Icon } from "./Icon"

type Status = "success" | "error" | "warning" | "info"

interface BannerProps {
	title: string
	status: Status
	children: React.ReactNode
	onClose?: () => void
}

export const NotificationProps: BoxProps = {
	color: "white",
	display: "flex",
	alignItems: "center",
	w: ["100vw", "100vw", "100vw", "604px"],
	fontFamily: "default",
	fontSize: "base",
	fontWeight: "normal",
	boxShadow: "0 1px 4px 0 rgba(0,0,0,0.3)",
	boxSizing: "border-box",
	verticalAlign: "center",
}

let bannerProps: BoxProps = { ...NotificationProps, paddingTop: "16", paddingLeft: "16", paddingBottom: "16", paddingRight: "8" }

const statusBasedProps: { [s in Status]: BoxProps & Icon } = {
	success: { ...bannerProps, mdIcon: CheckCircleSharp },
	error: { ...bannerProps, mdIcon: ErrorSharp },
	warning: { ...bannerProps, mdIcon: WarningSharp, color: "text" },
	info: { ...bannerProps, mdIcon: InfoOutlined, color: "white" },
}

export const Banner: React.FC<BannerProps> = (p: BannerProps) => {
	const { title, children } = p

	bannerProps = { ...bannerProps, bg: `banner.${p.status}` }

	return (
		<Box {...bannerProps} role="alert">
			<Box as={statusBasedProps[p.status].mdIcon} color={statusBasedProps[p.status].color} size="iconMd" />
			<Box
				padding="0"
				marginLeft="8"
				marginRight="8"
				flexGrow={1}
				textAlign="left"
				color={statusBasedProps[p.status].color}>
				{p.status !== "info" && <H4 color={statusBasedProps[p.status].color}> {title}</H4>}
				<Text wordBreak="break-word" margin="0">
					{children}
				</Text>
			</Box>
			<PseudoBox
				as="button"
				// @ts-ignore
				type="button"
				aria-label="Close"
				background="none"
				border="none"
				margin={0}
				padding={0}
				color="inherit"
				display="inline-flex"
				_focus={{
					border: "px",
					borderColor: "accent",
					outline: "none",
				}}
				onClick={p.onClose}>
				<Box as={CloseSharp} aria-hidden={true} color={statusBasedProps[p.status].color} size="iconMd" />
			</PseudoBox>
		</Box>
	)
}

export const useBanner: (b: React.ReactElement<BannerProps>) => () => void = b => {
	const toast = useToast()
	const duration = b.props.status === "warning" || b.props.status === "error" ? null : 8000
	return () =>
		toast({
			position: "top",
			duration: duration,
			render: (p: { onClose: () => void; id: string }) => (
				<ThemeProvider theme={theme}>
					{React.cloneElement(b, {
						onClose: () => {
							b.props.onClose && b.props.onClose()
							p.onClose()
						},
					})}
				</ThemeProvider>
			),
		})
}
