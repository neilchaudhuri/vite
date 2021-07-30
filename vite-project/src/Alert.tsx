import React, { useReducer, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowForwardIosSharp, WarningSharp, ErrorSharp, ArrowBackIosSharp } from "@material-ui/icons"
import { Text, Box, PseudoBox, Flex, Grid, BoxProps, ColorModeProvider, useTheme, Link, useColorMode } from "@chakra-ui/core"
import { LinkProps, linkStyle } from "./Link"
import { Omit } from "@chakra-ui/core/dist/common-types"

export type AlertStatus = "warning" | "error"

export interface AlertMessage {
	status: AlertStatus
	message: React.ReactNode
}

interface AlertProps {
	messages: AlertMessage[]
	readMore: LinkProps
}

enum AlertActionTypes {
	PREVIOUS,
	NEXT,
}

interface AlertAction {
	type: AlertActionTypes
	total: number
}

type OmittedBoxProps = "transition" | "style"

const BoxMotion = motion.custom<Omit<BoxProps, OmittedBoxProps>>(Box)

export const Alerts: React.FC<AlertProps> = (p: AlertProps) => {
	const theme = useTheme()
	const total = p.messages.length
	const multi = total > 1
	const [alertState, alertDispatch] = useReducer(alertReducer, { index: 0, isNext: false })

	const goPrev = useCallback(() => {
		alertDispatch({
			type: AlertActionTypes.PREVIOUS,
			total,
		})
	}, [total])

	const goNext = useCallback(() => {
		alertDispatch({
			type: AlertActionTypes.NEXT,
			total,
		})
	}, [total])

	useEffect(() => {
		if (multi) {
			const interval = setInterval(() => goNext(), 30 * 1000)
			return () => clearInterval(interval)
		} else return
	}, [multi, alertState, goNext])

	const alertStyle = {
		warning: {
			backgroundColor: "alert.warning",
			color: "text",
			icon: WarningSharp,
		},
		error: {
			backgroundColor: "alert.error",
			color: "white",
			icon: ErrorSharp,
		},
	}

	const readMore = (
		<ColorModeProvider value={p.messages[alertState.index].status === "warning" ? "light" : "dark"}>
			<ReadMore {...p.readMore} pl={8}>
				Read more.
			</ReadMore>
		</ColorModeProvider>
	)

	const alertContents = (
		<>
			<Box as={alertStyle[p.messages[alertState.index].status].icon} mx={8} />
			<Text margin="0" padding="0" flex="auto">
				{p.messages[alertState.index].message} {readMore}
			</Text>
		</>
	)

	const iconOutline = {
		// @ts-ignore
		outline: `1px dashed ${theme.colors.accent as string}`,
	}

	return (
		<Grid gridTemplateColumns="repeat(1, 1fr)" width="full" overflow="hidden">
			<AnimatePresence initial={false} custom={alertState}>
				<BoxMotion
					{...alertStyle[p.messages[alertState.index].status]}
					gridColumn="1 / 1"
					gridRow="1 / 1"
					role="alert"
					display="flex"
					alignItems="center"
					justifyContent="center"
					w="full"
					h="max-content"
					fontFamily="body"
					fontSize="base"
					fontWeight="normal"
					boxShadow="0 1px 4px 0 rgba(0,0,0,0.3)"
					padding="8"
					boxSizing="border-box"
					verticalAlign="center"
					key={alertState.index}
					initial={{ transform: `translateX(${alertState.isNext ? "100%" : "-100%"})` }}
					transition={{
						type: "tween",
						duration: 0.5,
						ease: "easeInOut",
					}}
					animate={{
						transform: "translateX(0%)",
					}}
					exit={(currState: AlertState) => ({
						transform: `translateX(${currState.isNext ? "-100%" : "100%"})`,
					})}>
					{multi && (
						<Flex align="center" flexGrow={1} maxW={{ xl: "screenXl" }}>
							<PseudoBox
								as="button"
								// @ts-ignore
								type="button"
								display="inline-flex"
								alignItems="center"
								bg="transparent"
								border="none"
								cursor="pointer"
								aria-label="Show previous alert"
								onClick={goPrev}
								p={0}
								_focus={iconOutline}
								_active={iconOutline}>
								<Box
									as={ArrowBackIosSharp}
									aria-hidden={true}
									size="iconMd"
									color={alertStyle[p.messages[alertState.index].status].color}
								/>
							</PseudoBox>
							<Text margin="0" padding="0" ml={8}>
								{`${alertState.index + 1}/${total}`}
							</Text>
							{alertContents}
							<PseudoBox
								as="button"
								// @ts-ignore
								type="button"
								display="inline-flex"
								alignItems="center"
								bg="transparent"
								border="none"
								cursor="pointer"
								aria-label="Show next alert"
								onClick={goNext}
								p={0}
								_focus={iconOutline}
								_active={iconOutline}>
								<Box
									as={ArrowForwardIosSharp}
									aria-hidden={true}
									size="iconMd"
									color={alertStyle[p.messages[alertState.index].status].color}
								/>
							</PseudoBox>
						</Flex>
					)}
					{!multi && (
						<Flex align="center" flexGrow={1} maxW={{ xl: "screenXl" }}>
							{alertContents}
						</Flex>
					)}
				</BoxMotion>
			</AnimatePresence>
		</Grid>
	)
}

interface AlertState {
	index: number
	isNext: boolean
}

const alertReducer = (state: AlertState, action: AlertAction) => {
	switch (action.type) {
		case AlertActionTypes.PREVIOUS: {
			return {
				index: state.index === 0 ? action.total - 1 : state.index - 1,
				isNext: false,
			}
		}
		case AlertActionTypes.NEXT:
			return {
				index: state.index + 1 === action.total ? 0 : state.index + 1,
				isNext: true,
			}
		default:
			return state
	}
}

const ReadMore: React.FC<LinkProps> = (p: LinkProps) => {
	const { children, ref, as, ...props } = p
	const { colorMode } = useColorMode()

	return (
		<Link
			{...props}
			// @ts-ignore
			as={as}
			{...styles[colorMode].default}
			_hover={styles[colorMode].hover}
			_focus={styles[colorMode].focus}
			_visited={styles[colorMode].visited}
			transition="none">
			{children}
		</Link>
	)
}

const styles = { ...linkStyle, light: { ...linkStyle.light, default: "alerts.readMore" } }
