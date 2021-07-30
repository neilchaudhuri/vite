import React from "react"
import { Textarea as ChakraTextarea, Box, Flex } from "@chakra-ui/core"
import { Omit } from "@chakra-ui/core/dist/common-types"
import { ErrorMessage } from "./ErrorMessage"
import { FinePrint } from "./Typography"
import { ValidationState } from "./ValidationState"

export type TextareaSize = "sm" | "md" | "lg" | "xl" | "xxl" | "full"

const dimensions: Record<TextareaSize, { width: string; height: string }> = {
	sm: { width: "216px", height: "200px" },
	md: { width: "360px", height: "120px" },
	lg: { width: "568px", height: "108px" },
	xl: { width: "820px", height: "120px" },
	xxl: { width: "820px", height: "204px" },
	full: { width: "100%", height: "204px" },
}

interface C1TextProps {
	validationState?: ValidationState
	id: string
	size?: TextareaSize
	value?: string
	defaultValue?: string
	errorMessage?: string
}

type OmittedTypes = "cols" | "rows" | "readOnly" | "value" | "defaultValue"

type TextareaProps<T = HTMLTextAreaElement> = C1TextProps &
	Omit<React.TextareaHTMLAttributes<T>, OmittedTypes> &
	React.RefAttributes<T>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(p: TextareaProps, ref) {
	const {
		size = "md",
		validationState,
		errorMessage,
		maxLength,
		disabled,
		"aria-describedby": ariaDescribedby = "",
		...textareaProps
	} = p
	const success = validationState === "success"
	const error = validationState === "error"
	const charCountId = `${textareaProps.id}_charCount`
	let borderColor = "inputBorder"
	if (success) {
		borderColor = "success"
	} else if (error) {
		borderColor = "error"
	}

	return (
		<>
			<Box width={dimensions[size].width}>
				{/* @ts-ignore */}
				<ChakraTextarea
					{...textareaProps}
					ref={ref}
					resize="none"
					aria-describedby={`${charCountId} ${ariaDescribedby}`.trim()}
					color="text"
					display="inline-block"
					fontFamily="body"
					fontSize="base"
					borderStyle="solid"
					border={success || error ? 2 : 1}
					borderColor={borderColor}
					boxSizing="border-box"
					mt="8"
					p="12"
					isDisabled={disabled}
					outline="none"
					_disabled={{
						color: "disabledInputText",
						bg: "disabledBackground",
						borderColor: "disabledBorder",
					}}
					_focus={{
						borderWidth: "2",
						borderColor: "accent",
					}}
					{...dimensions[size]}
					transition="none"
				/>
				<Flex justifyContent={!disabled && error && errorMessage ? "space-between" : "flex-end"}>
					{!disabled && error && errorMessage && <ErrorMessage message={errorMessage} mr="24" />}
					<CharCount id={charCountId} maxLength={maxLength} value={textareaProps.defaultValue ?? textareaProps.value} />
				</Flex>
			</Box>
		</>
	)
})

interface CharCountProps {
	id: string
	maxLength?: number
	value?: string
}

const formatter = new Intl.NumberFormat("en-US")

const CharCount = (p: CharCountProps) => {
	const { id, maxLength, value } = p
	const length = formatter.format(value?.length ?? 0)
	const color = value && value.length > (maxLength ?? 0) ? "error" : "text"

	return (
		<>
			{maxLength && (
				<FinePrint id={id} display="inline" whiteSpace="nowrap" color={color}>{`${length} / ${formatter.format(
					maxLength
				)}`}</FinePrint>
			)}
		</>
	)
}
