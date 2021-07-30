import { Box, BoxProps, ControlBox, VisuallyHidden, Flex, PseudoBox } from "@chakra-ui/core"
import * as React from "react"
import { Omit } from "@chakra-ui/core/dist/common-types"
import { ErrorMessage } from "./ErrorMessage"
import { elementValidator } from "./ElementValidator"
import { InputHTMLAttributes, useState } from "react"
import { ValidationState } from "./ValidationState"
import { P } from "./Typography"

interface C1CheckboxProps {
	id: string
	value: string | number
	errorMessage?: string
	validationState?: ValidationState
}

type OmittedTypes = "size" | "readOnly" | "type" | "value" | "defaultValue"

type CheckboxProps<T = HTMLInputElement> = C1CheckboxProps & React.RefAttributes<T> & Omit<InputHTMLAttributes<T>, OmittedTypes>

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(p, ref) {
	const { value, errorMessage, validationState, disabled, ...inputProps } = p
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
					type="checkbox"
					value={value}
					disabled={disabled}
				/>
				<ControlBox
					mr="8"
					width="24px"
					height="24px"
					boxSizing="border-box"
					type="checkbox"
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
						bg: disabled ? "disabledBackground" : "clickable",
						borderColor: disabled ? "disabledBackground" : "clickable",
						color: "white",
					}}
					_disabled={{ cursor: "default" }}
					transition="none">
					<Box width="18px" height="18px" boxSizing="border-box" borderWidth="2" borderStyle="solid">
						<Box
							position="relative"
							bottom="1px"
							left="4px"
							w="5px"
							h="10px"
							borderStyle="solid"
							borderColor="currentColor"
							borderWidth="0 2px 2px 0"
							transform="rotate(45deg)"
						/>
					</Box>
				</ControlBox>
				{value && (
					<Flex display="inline-flex">
						<P color={disabled ? "disabledInputText" : undefined}>{value}</P>
					</Flex>
				)}
			</Flex>
			{!disabled && error && errorMessage && <ErrorMessage message={errorMessage} />}
		</Box>
	)
})

interface C1CheckboxGroupProps {
	id: C1CheckboxProps["id"]
	name?: InputHTMLAttributes<HTMLInputElement>["name"]
	value?: Array<C1CheckboxProps["value"]>
	defaultValue?: Array<C1CheckboxProps["value"]>
	required?: boolean
	disabled?: boolean
	validationState?: ValidationState
	errorMessage?: string
	children: React.ReactElement<CheckboxProps>[]
	onChange?: (value: Array<C1CheckboxProps["value"]>) => void
}

type CheckboxGroupProps = C1CheckboxGroupProps & Omit<BoxProps, "onChange" | "size">

export const CheckboxGroup: React.FC<CheckboxGroupProps> = (p: CheckboxGroupProps) => {
	const { value, defaultValue, children, onChange, errorMessage, validationState, name, required, disabled, ...groupProps } = p
	const [values, setValues] = useState(defaultValue || Array<C1CheckboxProps["value"]>(0))
	const selectedValues = value ?? values
	const error = validationState === "error"
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked, value } = event.target
		const newValues = checked ? [...selectedValues, value] : selectedValues.filter(selected_value => selected_value !== value)
		setValues(newValues)
		onChange && onChange(newValues)
	}
	const validChildren: React.ReactElement<CheckboxProps>[] = children.reduce(
		elementValidator,
		new Array<React.ReactElement<CheckboxProps>>(0)
	)
	return (
		<Box role="group" {...groupProps}>
			{validChildren.map(child => {
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
							checked: selectedValues?.includes(child.props.value),
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
