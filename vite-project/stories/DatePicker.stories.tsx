import React, { useEffect, useState } from "react"
import { DatePicker } from "../src/DatePicker"
import { ThemeProvider } from "@chakra-ui/core"
import { addDays, subDays } from "date-fns"
import theme from "../theme.js"
import { FormInput } from "../src/FormInput"

export default {
	title: "DatePicker",
	component: DatePicker,
}

export const defaultDatePicker = () => {
	const [date, setDate] = useState(null)
	useEffect(() => {
		console.log(`You set the date to ${date}`)
	}, [date])
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a default DatePicker" labelId="defaultLabel">
				<DatePicker id="defaultDatePicker" value={date} onChange={(date: Date) => setDate(date)} />
			</FormInput>
		</ThemeProvider>
	)
}

export const todayDatePicker = () => {
	const [date, setDate] = useState(new Date())
	useEffect(() => {
		console.log(`You set the date to ${date}`)
	}, [date])
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a DatePicker initialized to today" labelId="defaultLabel">
				<DatePicker id="todayDatePicker" value={date} onChange={(date: Date) => setDate(date)} />
			</FormInput>
		</ThemeProvider>
	)
}
export const datePickerWithPresetDate = () => {
	const [date, setDate] = useState(new Date(2000, 0))
	useEffect(() => {
		console.log(`You set the date to ${date}`)
	}, [date])
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This DatePicker is initialized to Jan 1, 2000" labelId="presetLabel">
				<DatePicker id="datePickerPreset" value={date} onChange={(date: Date) => setDate(date)} />
			</FormInput>
		</ThemeProvider>
	)
}

export const datePickerWithMinDate = () => {
	const [date, setDate] = useState(null)
	useEffect(() => {
		console.log(`You set the date to ${date}`)
	}, [date])
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This DatePicker has a minimum date 14 days before today" labelId="minimumLabel">
				<DatePicker
					id="datePickerMinimum"
					value={date}
					onChange={(date: Date) => setDate(date)}
					minDate={subDays(new Date(), 14)}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const datePickerWithMaxDate = () => {
	const [date, setDate] = useState(null)
	useEffect(() => {
		console.log(`You set the date to ${date}`)
	}, [date])
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This DatePicker has a maximum date 14 days after today" labelId="maximumLabel">
				<DatePicker
					id="datePickerMaximum"
					value={date}
					onChange={(date: Date) => setDate(date)}
					maxDate={addDays(new Date(), 14)}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const disabledDatePicker = () => {
	return (
		<ThemeProvider theme={theme}>
			<FormInput disabled labelText="This DatePicker is disabled" labelId="disabledLabel">
				<DatePicker id="datePickerDisabled" onChange={() => {}} />
			</FormInput>
		</ThemeProvider>
	)
}

export const requiredDatePicker = () => {
	const [date, setDate] = useState(null)
	useEffect(() => {
		console.log(`You set the date to ${date}`)
	}, [date])
	return (
		<ThemeProvider theme={theme}>
			<FormInput required labelText="This DatePicker is required" labelId="requiredLabel">
				<DatePicker id="datePickerRequired" value={date} onChange={(date: Date) => setDate(date)} />
			</FormInput>
		</ThemeProvider>
	)
}

export const errorDatePicker = () => {
	const [date, setDate] = useState(null)
	useEffect(() => {
		console.log(`You set the date to ${date}`)
	}, [date])
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This DatePicker is invalid" labelId="invalidLabel">
				<DatePicker
					id="datePickerInvalid"
					error
					errorMessage="Error message. Corrective action."
					value={date}
					onChange={(date: Date) => setDate(date)}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const tryItOut = args => {
	const [date, setDate] = useState(args.value)
	useEffect(() => {
		setDate(args.value)
	}, [args.value])
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="Try it out" labelId="tryItOutLabel">
				<DatePicker
					{...args}
					value={date}
					onChange={(date: Date) => {
						setDate(date)
						args.onChange && args.onChange(date)
					}}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

tryItOut.argTypes = {
	id: { control: { disable: true } },
	value: { control: "date" },
	minDate: { control: "date" },
	maxDate: { control: "date" },
	inputRef: { control: { disable: true } },
	onChange: { action: "changed" },
}

tryItOut.args = {
	id: "tryItOut",
	value: new Date(),
	minDate: new Date(1900, 0),
	maxDate: new Date(2100, 0),
}
