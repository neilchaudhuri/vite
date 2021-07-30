import { PseudoBox, useColorMode, Box, Flex, BoxProps, PseudoBoxProps } from "@chakra-ui/core"
import * as React from "react"
import { IconAlignment, InputIcon } from "./Icon"
import { NavigateBeforeSharp, NavigateNextSharp } from "@material-ui/icons"
import { ButtonProps } from "Button"

export const NavForwardIcon: InputIcon = {
	mdIcon: NavigateNextSharp,
	color: "clickable",
	alignment: IconAlignment.RIGHT,
}

export const NavBackIcon: InputIcon = {
	mdIcon: NavigateBeforeSharp,
	color: "clickable",
	alignment: IconAlignment.LEFT,
}

interface LinkButtonStyle {
	light: {
		default: PseudoBoxProps
		hoverFocus: PseudoBoxProps
		disabled: PseudoBoxProps
	}
	dark: {
		default: PseudoBoxProps
		hoverFocus: PseudoBoxProps
		disabled: PseudoBoxProps
	}
}

const buttonStyle: LinkButtonStyle = {
	light: {
		default: {
			color: "clickable",
			border: "none",
		},
		hoverFocus: {
			textDecor: "underline",
			outline: "none",
		},
		disabled: {
			color: "disabledButtonText",
			border: "none",
			cursor: "default",
		},
	},
	dark: {
		default: {
			color: "darkBackgroundLink",
			border: "none",
		},
		hoverFocus: {
			textDecor: "underline",
			outline: "none",
		},
		disabled: {
			color: "inputBorder",
			border: "none",
			cursor: "default",
		},
	},
}

type LinkButtonProps = Omit<ButtonProps, "buttonType" | "size"> & Omit<BoxProps, "onClick">

export const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(function LinkButton(p, ref) {
	const { buttonIcon, disabled, children, ...buttonProps } = p
	const { colorMode } = useColorMode()
	const isLeftIcon = buttonIcon?.alignment === IconAlignment.LEFT
	const isRightIcon = buttonIcon?.alignment === IconAlignment.RIGHT

	return (
		<Flex display="inline-flex" align="center">
			<PseudoBox
				{...buttonProps}
				ref={ref}
				as="button"
				display="inline-flex"
				alignItems="flex-end"
				textAlign="center"
				border="none"
				borderRadius={0}
				background="none"
				p={0}
				fontFamily="body"
				fontSize="button"
				cursor="pointer"
				{...buttonStyle[colorMode]["default"]}
				//@ts-ignore
				disabled={disabled}
				aria-disabled={disabled}
				_focus={buttonStyle[colorMode].hoverFocus}
				_hover={!disabled ? buttonStyle[colorMode].hoverFocus : undefined}
				_disabled={buttonStyle[colorMode].disabled}>
				{isLeftIcon && buttonIcon && <Box as={buttonIcon.mdIcon} size="iconMd" color={buttonIcon.color} />}
				<Box flex="1 1 0" lineHeight="linkButton">
					{children}
				</Box>
				{isRightIcon && buttonIcon && <Box as={buttonIcon.mdIcon} size="iconMd" color={buttonIcon.color} />}
			</PseudoBox>
		</Flex>
	)
})
