import { Input as ChakraInput, InputGroup, InputLeftElement, InputRightElement, PseudoBox, useTheme, Box } from "@chakra-ui/core"
import * as React from "react"
import { Omit } from "@chakra-ui/core/dist/common-types"
import { ErrorMessage } from "./ErrorMessage"
import { CheckSharp, ErrorOutlineSharp } from "@material-ui/icons"
import { InputIcon, IconAlignment, isClickableIcon } from "./Icon"
import { ValidationState } from "./ValidationState"

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "full"

const sizes: Record<TextSize, string> = {
	xs: "inputXs",
	sm: "inputSm",
	md: "inputMd",
	lg: "inputLg",
	xl: "inputXl",
	xxl: "inputXxl",
	full: "full",
}

export const SuccessIcon: InputIcon = {
	mdIcon: CheckSharp,
	color: "success",
	alignment: IconAlignment.RIGHT,
}

export const ErrorIcon: InputIcon = {
	mdIcon: ErrorOutlineSharp,
	color: "error",
	alignment: IconAlignment.RIGHT,
}

type OmittedTypes = "size" | "checked" | "readOnly" | "defaultChecked" | "type" | "value"

type TextProps<T = HTMLInputElement> = {
	validationState?: ValidationState
	id: string
	size?: TextSize
	value?: string
	errorMessage?: string
	textIcon?: InputIcon
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, OmittedTypes> &
	React.RefAttributes<T>

export const Text = React.forwardRef<HTMLInputElement, TextProps>((p, ref) => {
	const theme = useTheme()
	const { size, required, validationState, textIcon, disabled, errorMessage, ...input } = p
	const textBoxSize: TextSize = size ?? "md"
	const success = validationState === "success"
	const error = validationState === "error"
	const isLeftIcon = textIcon?.alignment === IconAlignment.LEFT
	const isRightIcon = textIcon?.alignment === IconAlignment.RIGHT

	let borderColor = "inputBorder"
	if (success) {
		borderColor = "success"
	} else if (error) {
		borderColor = "error"
	}

	let icon = undefined
	const iconOutline = {
		// @ts-ignore
		outline: `1px dashed ${theme.colors.accent as string}`,
	}

	if (textIcon) {
		if (isClickableIcon(textIcon)) {
			icon = (
				<PseudoBox
					as="button"
					// @ts-ignore
					type="button"
					display="inline-flex"
					alignItems="center"
					bg="transparent"
					border="none"
					cursor="pointer"
					aria-label={textIcon.ariaLabel}
					onClick={textIcon.onClick}
					p={0}
					_focus={iconOutline}
					_hover={iconOutline}
					_active={iconOutline}>
					<Box as={textIcon.mdIcon} size="iconMd" color={textIcon.color} />
				</PseudoBox>
			)
		} else {
			icon = <Box as={textIcon.mdIcon} color={textIcon.color} role="presentation" size="iconMd" cursor="default" />
		}
	}

	return (
		<>
			<InputGroup width={sizes[textBoxSize]} mt={8}>
				{textIcon?.alignment === IconAlignment.LEFT && (
					<InputLeftElement px="inputX" width="auto" height="input" children={icon} />
				)}
				<ChakraInput
					{...input}
					ref={ref}
					isRequired={required}
					color="text"
					height="input"
					display="inline-block"
					fontFamily="body"
					fontSize="base"
					borderStyle="solid"
					border={success || error ? 2 : 1}
					borderColor={borderColor}
					boxSizing="border-box"
					pl={isLeftIcon ? "2.5rem" : 12}
					pr={isRightIcon ? "2.5rem" : 12}
					py={4}
					outline="none"
					isDisabled={disabled}
					_disabled={{
						color: "disabledInputText",
						bg: "disabledBackground",
						borderColor: "disabledBorder",
					}}
					_focus={{
						borderWidth: "2",
						borderColor: "accent",
					}}
					transition="none"
				/>
				{textIcon?.alignment === IconAlignment.RIGHT && (
					<InputRightElement pr="inputX" width="auto" height="input" children={icon} />
				)}
			</InputGroup>
			{!disabled && error && errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	)
})
