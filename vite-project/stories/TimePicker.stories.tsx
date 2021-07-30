import React, { useEffect, useState } from "react"
import { TimePicker } from "../src/TimePicker"
import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"

export default {
	title: "TimePicker",
	component: TimePicker,
}

export const defaultTimePicker = () => {
	const [timePickerValue, setTimePickerValue] = useState<Date>(undefined)
	useEffect(() => {
		console.log(`You set the date to ${timePickerValue}`)
	}, [timePickerValue])
	return (
		<ThemeProvider theme={theme}>
			<TimePicker labelText="TimePicker" id="timePickerId" value={timePickerValue} onChange={setTimePickerValue} />
		</ThemeProvider>
	)
}

export const timePickerWithTimeSet = () => {
	const [timePickerValue, setTimePickerValue] = useState<Date>(new Date("11/19/2020 12:11:19 -0500"))
	useEffect(() => {
		console.log(`You set the date to ${timePickerValue}`)
	}, [timePickerValue])
	return (
		<ThemeProvider theme={theme}>
			<TimePicker labelText="TimePicker" id="timePickerId" value={timePickerValue} onChange={setTimePickerValue} />
		</ThemeProvider>
	)
}

export const disabledTimePicker = () => {
	return (
		<ThemeProvider theme={theme}>
			<TimePicker disabled={true} labelText="Disabled" id="timePickerId" value={undefined} onChange={() => console.log()} />
		</ThemeProvider>
	)
}

export const errorTimePicker = () => {
	return (
		<ThemeProvider theme={theme}>
			<TimePicker
				validationState="error"
				errorMessage="TimePicker error"
				labelText="Error"
				id="timePickerId"
				value={undefined}
				onChange={() => console.log()}
			/>
		</ThemeProvider>
	)
}
