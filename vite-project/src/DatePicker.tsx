import React, { CSSProperties, useEffect, useRef } from "react"
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker"
import { startOfDay, getYear, format } from "date-fns"
import { Box, PseudoBox, Flex, Text as ChakraText, Input, InputGroup, InputLeftElement } from "@chakra-ui/core"
import { CalendarToday, ArrowLeftSharp, ArrowRightSharp } from "@material-ui/icons"
import { LinkButton } from "./LinkButton"
import { ErrorMessage } from "./ErrorMessage"
import { MutableRef, setMutableRef } from "./MutableRef"
import Cleave from "cleave.js"
import "react-datepicker/dist/react-datepicker.css"
import "./datepicker.css"
import { ValidationState } from "./ValidationState"
import { addYears, subYears, setMonth } from "date-fns"

export type InputStyle = { [I in InputState]: CSSProperties }
export type InputState = "default" | "error" | "disabled" | "mouseover"

export const C1_DATE_FORMAT = "MM/dd/yyyy"

interface C1DatePickerProps<T = HTMLInputElement> {
	id: string
	value?: Date
	/**
	 * Min selectable date (inclusive)
	 *
	 * @default 01/01/1900
	 */
	minDate?: Date
	/**
	 * Max selectable date (inclusive)
	 *
	 * @default 01/01/2020
	 */
	maxDate?: Date
	onChange: ReactDatePickerProps["onChange"]
	/**
	 * Controls display of error
	 */
	error?: boolean
	/**
	 * Message that displays when `error=true`
	 */
	errorMessage?: string
	inputRef?: MutableRef<T>
}

export type C1DatePickerElement = ReactDatePicker

type OmittedTypes =
	| "children"
	| "size"
	| "checked"
	| "readOnly"
	| "defaultChecked"
	| "defaultValue"
	| "type"
	| "value"
	| "onChange"
	| "onClick"
	| "min"
	| "max"

type DatePickerProps<T = HTMLInputElement> = C1DatePickerProps & Omit<React.InputHTMLAttributes<T>, OmittedTypes>

export const DatePicker = React.forwardRef<C1DatePickerElement, DatePickerProps>((p: DatePickerProps, datepickerRef) => {
	const {
		id,
		name,
		value,
		disabled,
		required,
		"aria-labelledby": ariaLabelledby,
		minDate = setMonth(subYears(new Date(), 50), 0),
		maxDate = setMonth(addYears(new Date(), 50), 0),
		onChange,
		onFocus,
		onBlur,
		onKeyDown,
		placeholder = "MM/DD/YYYY",
		error,
		errorMessage,
		inputRef,
		...inputProps
	} = p
	const datepicker = useRef<ReactDatePicker | null>(null)

	return (
		<>
			<Box width="datePicker">
				<ReactDatePicker
					ref={elem => {
						datepicker.current = elem
						setMutableRef(elem, datepickerRef)
					}}
					id={id}
					name={name}
					disabled={disabled}
					required={required}
					ariaLabelledBy={ariaLabelledby}
					onBlur={onBlur}
					onFocus={onFocus}
					minDate={minDate}
					maxDate={maxDate}
					selected={value}
					onChange={(date, e: React.ChangeEvent<HTMLInputElement>) => {
						// Apply masked date value
						onChange && onChange(e?.target.value ? new Date(e?.target.value) : date, e)
					}}
					onKeyDown={e => {
						onKeyDown && onKeyDown(e as React.KeyboardEvent<HTMLInputElement>)
					}}
					customInput={
						<CustomInput
							{...inputProps}
							minDate={minDate}
							maxDate={maxDate}
							validationState={error ? "error" : undefined}
							inputRef={inputRef}
							id={id}
						/>
					}
					placeholderText={placeholder}
					showPopperArrow={false}
					useWeekdaysShort
					fixedHeight
					popperModifiers={{
						flip: {
							enabled: false,
						},
						preventOverflow: {
							padding: 0,
						},
					}}
					renderCustomHeader={p => <Header minDate={minDate} maxDate={maxDate} {...p} />}>
					<Flex height="datePickerButton" align="center" paddingX={12}>
						<Box marginLeft={8} flexGrow={1}>
							<LinkButton
								className="datepicker__today-button"
								onClick={e => {
									const today = startOfDay(new Date())
									onChange && onChange(today, e)
									datepicker.current?.setState(() => ({
										preSelection: today,
									}))
								}}>
								Today
							</LinkButton>
						</Box>
						<Box marginRight={24}>
							<LinkButton
								className="datepicker__close-button"
								onClick={e => {
									onChange && onChange(null, e)
									datepicker.current?.setOpen(false)
								}}>
								Cancel
							</LinkButton>
						</Box>
						<Box marginRight={8}>
							<LinkButton
								className="datepicker__ok-button"
								onClick={() => {
									datepicker.current?.setOpen(false)
								}}>
								OK
							</LinkButton>
						</Box>
					</Flex>
				</ReactDatePicker>
			</Box>
			{!disabled && error && errorMessage && <ErrorMessage message={errorMessage} />}
		</>
	)
})

type CustomInputProps<T = HTMLInputElement> = {
	inputRef?: MutableRef<T>
	validationState: ValidationState | undefined
	/**
	 * Min selectable date (inclusive)
	 */
	minDate?: Date
	/**
	 * Max selectable date (inclusive)
	 */
	maxDate?: Date
} & React.ComponentProps<typeof Input> &
	Omit<React.InputHTMLAttributes<T>, OmittedTypes>

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>((p, dpInputRef) => {
	const { inputRef, disabled, required, size, minDate, maxDate, ...inputProps } = p
	const error = p.validationState === "error"
	const success = p.validationState === "success"
	let borderColor = "inputBorder"
	if (error) {
		borderColor = "error"
	} else if (success) {
		borderColor = "success"
	}
	useEffect(() => {
		const cleave = new Cleave(".dp-input", {
			date: true,
			datePattern: ["m", "d", "Y"],
			dateMin: minDate ? format(minDate, "yyyy-MM-dd") : undefined,
			dateMax: maxDate ? format(maxDate, "yyyy-MM-dd") : undefined,
			delimiter: "/",
		})

		return () => {
			cleave.destroy()
		}
	}, [minDate, maxDate])

	// @ts-ignore
	return (
		<>
			<InputGroup width="full" mt={8}>
				<InputLeftElement
					px="inputX"
					width="auto"
					height="input"
					children={
						<Box
							as={CalendarToday}
							color={error ? "error" : p.disabled ? "disabledInputText" : "clickable"}
							role="presentation"
							size="iconMd"
							cursor="default"
						/>
					}
				/>
				<Input
					{...inputProps}
					className="dp-input"
					// @ts-ignore
					size="inputMd" as Size
					ref={(elem: HTMLInputElement) => {
						setMutableRef(elem, dpInputRef)
						setMutableRef(elem, inputRef)
					}}
					isRequired={required}
					maxLength={10}
					color="text"
					height="input"
					display="inline-block"
					fontFamily="body"
					fontSize="base"
					borderStyle="solid"
					border={success || error ? 2 : 1}
					borderColor={borderColor}
					boxSizing="border-box"
					pl="2.5rem"
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
			</InputGroup>
		</>
	)
})

type renderCustomHeaderProps = Required<ReactDatePickerProps>["renderCustomHeader"]
type HeaderProps = {
	minDate: Date
	maxDate: Date
} & Parameters<renderCustomHeaderProps>[0]
const Header: React.FC<HeaderProps> = (p: HeaderProps) => {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const {
		date,
		changeYear,
		decreaseMonth,
		increaseMonth,
		prevMonthButtonDisabled,
		nextMonthButtonDisabled,
		minDate,
		maxDate,
	} = p

	const yearOpts = []
	for (let i = getYear(minDate); i <= getYear(maxDate); i++) {
		yearOpts.push(
			<option key={i} value={i}>
				{i}
			</option>
		)
	}

	return (
		<Flex justify="center" align="center" paddingTop={12} paddingLeft={4} paddingRight={12}>
			<PseudoBox
				as="button"
				// @ts-ignore
				type="button"
				aria-label="Previous Month"
				className="datepicker__navigation--previous"
				display="inline-flex"
				padding={0}
				border="none"
				background="none"
				onClick={decreaseMonth}
				disabled={prevMonthButtonDisabled}
				aria-disabled={prevMonthButtonDisabled}
				_focus={{ outline: "none" }}>
				<PseudoBox as={ArrowLeftSharp} />
			</PseudoBox>

			<ChakraText
				fontFamily="default"
				color="text"
				fontSize="base"
				fontWeight="normal"
				lineHeight="normal"
				flexGrow={1}
				margin={0}>
				{format(date, "LLLL")}
			</ChakraText>

			<PseudoBox
				as="button"
				// @ts-ignore
				type="button"
				aria-label="Next Month"
				className="datepicker__navigation--next"
				display="inline-flex"
				padding={0}
				marginRight={16}
				border="none"
				background="none"
				onClick={increaseMonth}
				disabled={nextMonthButtonDisabled}
				aria-disabled={nextMonthButtonDisabled}
				_focus={{ outline: "none" }}>
				<PseudoBox as={ArrowRightSharp} />
			</PseudoBox>

			<PseudoBox
				as="select"
				aria-label="Change Year"
				className="datepicker__select-year"
				// @ts-ignore
				value={getYear(date)}
				height="36px"
				paddingY="5px"
				paddingX="12px"
				color="text"
				fontFamily="default"
				fontWeight="normal"
				fontSize="base"
				lineHeight="normal"
				borderRadius={0}
				border="px"
				borderColor="inputBorder"
				_focus={{
					outline: "1px solid #65B2E8",
					borderWidth: "px",
					borderColor: "accent",
				}}
				onBlur={(e: React.FocusEvent<HTMLInputElement>) => changeYear(Number(e.target.value))}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeYear(Number(e.target.value))}>
				{yearOpts}
			</PseudoBox>
		</Flex>
	)
}
