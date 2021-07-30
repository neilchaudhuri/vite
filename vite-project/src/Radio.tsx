import { Box, BoxProps, ControlBox, VisuallyHidden, Flex, PseudoBox } from "@chakra-ui/core"
import * as React from "react"
import { Omit } from "@chakra-ui/core/dist/common-types"
import { ErrorMessage } from "./ErrorMessage"
import { elementValidator } from "./ElementValidator"
import { InputHTMLAttributes, useState } from "react"
import { ValidationState } from "./ValidationState"
import { P } from "./Typography"

interface C1RadioProps {
	id: string
	value?: string | number
	validationState?: ValidationState
}

type OmittedTypes = "size" | "readOnly" | "type" | "value" | "defaultValue"

type RadioProps<T = HTMLInputElement> = C1RadioProps & React.RefAttributes<T> & Omit<React.InputHTMLAttributes<T>, OmittedTypes>

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(p, ref) {
	const { value, validationState, disabled, ...inputProps } = p
	const error = validationState === "error"
	const borderColor = error ? "error" : "inputBorder"

	return (
		<Box as="label" display="inline-block" mb="4" cursor={disabled ? "default" : "pointer"}>
			<Flex align="center">
				<VisuallyHidden
					{...inputProps}
					ref={ref}
					as="input"
					// @ts-ignore
					type="radio"
					value={value}
					disabled={disabled}
				/>
				<ControlBox
					type="radio"
					mr="8"
					width="24px"
					height="24px"
					boxSizing="border-box"
					cursor="pointer"
					_focus={{
						// @ts-ignore
						outlineWidth: "1px",
						outlineStyle: "dashed",
						outlineColor: "accent",
					}}
					_child={{
						opacity: 1,
						borderColor: disabled ? "disabledBackground" : borderColor,
						color: "transparent",
					}}
					_checkedAndChild={{
						borderColor: disabled ? "disabledBackground" : "clickable",
						color: disabled ? "disabledBackground" : "clickable",
					}}
					_disabled={{ cursor: "default" }}
					transition="none">
					<Flex
						align="center"
						justify="center"
						width="20px"
						height="20px"
						boxSizing="border-box"
						borderWidth="2"
						borderStyle="solid"
						borderRadius="round">
						<Box borderRadius="round" size="10px" bg="currentColor" />
					</Flex>
				</ControlBox>

				{value && (
					<Flex display="inline-flex">
						<P color={disabled ? "disabledInputText" : undefined}>{value}</P>
					</Flex>
				)}
			</Flex>
		</Box>
	)
})

interface C1RadioGroupProps {
	id: C1RadioProps["id"]
	name?: InputHTMLAttributes<HTMLInputElement>["name"]
	value?: C1RadioProps["value"]
	defaultValue?: C1RadioProps["value"]
	required?: boolean
	disabled?: boolean
	validationState?: ValidationState
	errorMessage?: string
	children: React.ReactElement<RadioProps>[]
	onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: C1RadioProps["value"]) => void
}

type RadioGroupProps<T = HTMLInputElement> = C1RadioGroupProps &
	React.RefAttributes<T> &
	React.HTMLAttributes<T> &
	Omit<BoxProps, "onChange" | "size">

export const RadioGroup: React.FC<RadioGroupProps> = (p: RadioGroupProps) => {
	const { value, defaultValue, children, onChange, errorMessage, validationState, name, required, disabled, ...groupProps } = p
	const [groupValue, setValue] = useState(defaultValue)
	const radioGroupValue = value ?? groupValue
	const error = validationState === "error"

	const validChildren: React.ReactElement<RadioProps>[] = children.reduce(
		elementValidator,
		new Array<React.ReactElement<RadioProps>>(0)
	)

	return (
		<Box role="group" {...groupProps}>
			{validChildren.map(child => {
				const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
					child.props.value && setValue(child.props.value)
					onChange && onChange(e, child.props.value)
				}
				const isChecked = child.props.value === radioGroupValue

				return (
					<PseudoBox
						key={`${child.props.value as string}`}
						display="block"
						mb={{ base: "12", md: "20" }}
						_last={{ mb: "4" }}
						_first={{ mt: "12" }}>
						{React.cloneElement(child, {
							onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
								child.props.onChange && child.props.onChange(e)
								handleChange(e)
							},
							checked: isChecked,
							name,
							required,
							disabled,
							validationState,
						})}
					</PseudoBox>
				)
			})}
			{!disabled && error && errorMessage && <ErrorMessage message={errorMessage} />}
		</Box>
	)
}
