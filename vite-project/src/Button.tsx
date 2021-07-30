import { Button as ChakraButton, useColorMode, Box, useTheme } from "@chakra-ui/core"
import * as React from "react"
import { PseudoBoxProps } from "@chakra-ui/core/dist"
import { IconAlignment, InputIcon } from "./Icon"

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "full"

const sizes: Record<ButtonSize, string> = {
	xs: "buttonXs",
	sm: "buttonSm",
	md: "buttonMd",
	lg: "buttonLg",
	xl: "buttonXl",
	xxl: "buttonXxl",
	xxxl: "buttonXxxl",
	full: "full",
}

export type ButtonType = "primary" | "secondary"

const rightIconSupportingButtons: ButtonSize[] = ["md", "lg", "xl", "xxl"]

interface ButtonStyle {
	primary: {
		light: {
			default: PseudoBoxProps
			hoverFocus: PseudoBoxProps
			active: PseudoBoxProps
			disabled: PseudoBoxProps
		}
		dark: {
			default: PseudoBoxProps
			hoverFocus: PseudoBoxProps
			active: PseudoBoxProps
			disabled: PseudoBoxProps
		}
	}
	secondary: {
		light: {
			default: PseudoBoxProps
			hoverFocus: PseudoBoxProps
			active: PseudoBoxProps
			disabled: PseudoBoxProps
		}
		dark: {
			default: PseudoBoxProps
			hoverFocus: PseudoBoxProps
			active: PseudoBoxProps
			disabled: PseudoBoxProps
		}
	}
}

const buttonStyle: ButtonStyle = {
	primary: {
		light: {
			default: {
				bg: "clickable",
				color: "white",
				border: "none",
			},
			hoverFocus: {
				bg: "secondary",
				// @ts-ignore
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "accent",
			},
			active: {
				bg: "primary",
				// @ts-ignore
				outlineColor: "secondary",
			},
			disabled: {
				bg: "disabledBackground",
				color: "disabledButtonText",
				cursor: "default",
				outline: "none",
			},
		},
		dark: {
			default: {
				bg: "white",
				color: "clickable",
				border: "none",
			},
			hoverFocus: {
				color: "secondary",
				// @ts-ignore
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "accent",
			},
			active: {
				color: "primary",
				bg: "buttonDarkBackground",
			},
			disabled: {
				bg: "disabledBackground",
				color: "disabledButtonText",
				cursor: "default",
				outline: "none",
			},
		},
	},
	secondary: {
		light: {
			default: {
				bg: "transparent",
				color: "clickable",
				border: "none",
				outline: "2px solid",
			},
			hoverFocus: {
				color: "secondary",
				// @ts-ignore
				outlineColor: "accent",
			},
			active: {
				color: "primary",
				// @ts-ignore
				outlineColor: "secondary",
			},
			disabled: {
				color: "disabledButtonText",
				// @ts-ignore
				outlineColor: "disabledDark",
				cursor: "default",
			},
		},
		dark: {
			default: {
				bg: "transparent",
				color: "white",
				// @ts-ignore
				outline: "2px solid white",
				border: "none",
			},
			hoverFocus: {
				// @ts-ignore
				outlineColor: "accent",
			},
			active: {
				// @ts-ignore
				outlineColor: "buttonDarkBackground",
			},
			disabled: {
				color: "disabledDark",
				// @ts-ignore
				outlineColor: "disabledDark",
				cursor: "default",
			},
		},
	},
}

export type ButtonProps<T = HTMLButtonElement> = {
	buttonType?: ButtonType
	size?: ButtonSize
	children: React.ReactNode
	buttonIcon?: InputIcon
} & React.ButtonHTMLAttributes<T> &
	React.RefAttributes<T>

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(p, ref) {
	const { colorMode } = useColorMode()
	const theme = useTheme()
	const { size, buttonType, buttonIcon, disabled, children, ...button } = p
	const buttonSize: ButtonSize = size ?? "md"
	const type: ButtonType = buttonType ?? "primary"
	const isLeftIcon = buttonIcon?.alignment === IconAlignment.LEFT
	const isRightIcon = buttonIcon?.alignment === IconAlignment.RIGHT
	const supportsRightIcon = rightIconSupportingButtons.includes(buttonSize)
	// @ts-ignore
	buttonStyle.secondary.light.default.outline = `2px solid ${theme.colors.secondaryButtonBorder as string}`

	return (
		//@ts-ignore
		<ChakraButton
			{...button}
			ref={ref}
			height="input"
			lineHeight="button"
			width={sizes[buttonSize]}
			textAlign="center"
			borderRadius={0}
			fontFamily="body"
			fontSize="button"
			fontWeight="button"
			cursor="pointer"
			pl={isLeftIcon ? 12 : 20}
			pr={isRightIcon ? 12 : 20}
			py={12}
			//@ts-ignore
			rightIcon={supportsRightIcon && buttonIcon?.alignment === IconAlignment.RIGHT && icon(buttonIcon)}
			//@ts-ignore
			leftIcon={buttonIcon?.alignment === IconAlignment.LEFT && icon(buttonIcon)}
			{...buttonStyle[type][colorMode]["default"]}
			isDisabled={disabled}
			_focus={buttonStyle[type][colorMode].hoverFocus}
			_hover={buttonStyle[type][colorMode].hoverFocus}
			_active={buttonStyle[type][colorMode].active}
			_disabled={buttonStyle[type][colorMode].disabled}
			transition="none">
			<Box flex="1 1 0" lineHeight="button">
				{children}
			</Box>
		</ChakraButton>
	)
})

const icon = (i: InputIcon) => () => <Box as={i.mdIcon} size="iconMd" color={i.color} />
