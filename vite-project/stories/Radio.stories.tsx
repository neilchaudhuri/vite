import React, { useEffect, useState } from "react"
import { FormInput } from "../src/FormInput"
import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme"
import { Radio, RadioGroup } from "../src/Radio"

export default {
	title: "RadioGroup",
}

export const defaultRadio = () => {
	const [value, setValue] = useState("")
	useEffect(() => {
		console.log(`The radio value is now [${value}]. Please click another radio button to change its state.`)
	}, [value])
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="Default Radio Buttons" labelId="simpleRadioLabel">
				<RadioGroup id="simpleRadio" onChange={onChange}>
					<Radio id="simpleRadio1" aria-label="simpleRadio1" value="Option 1" />
					<Radio id="simpleRadio2" aria-label="simpleRadio2" value="Option 2" />
					<Radio id="simpleRadio3" aria-label="simpleRadio3" value="Option 3" />
				</RadioGroup>
			</FormInput>
		</ThemeProvider>
	)
}

export const radioDefaultChecked = () => {
	const defaultValue = "Option 2"
	const [value, setValue] = useState(defaultValue)
	useEffect(() => {
		console.log(`The radio value is now [${value}]. Please click another radio button to change its state.`)
	}, [value])
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="Second Button Default Selected" labelId="simpleRadioLabel">
				<RadioGroup id="simpleRadio" defaultValue={defaultValue} onChange={onChange}>
					<Radio id="simpleRadio1" aria-label="simpleRadio1" value="Option 1" />
					<Radio id="simpleRadio2" aria-label="simpleRadio2" value="Option 2" />
					<Radio id="simpleRadio3" aria-label="simpleRadio3" value="Option 3" />
				</RadioGroup>
			</FormInput>
		</ThemeProvider>
	)
}

export const disabledRadio = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="Disabled Radio Pair" labelId="disabledRadioLabel" disabled>
			<RadioGroup id="disabledRadio" defaultValue="Option 2">
				<Radio id="disabledRadio1" aria-label="disabledRadio1" value="Option 1" />
				<Radio id="disabledRadio2" aria-label="disabledRadio2" value="Option 2" />
			</RadioGroup>
		</FormInput>
	</ThemeProvider>
)

export const invalidRadio = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="Invalid Radio Pair" labelId="invalidRadioLabel">
			<RadioGroup id="invalidRadio" errorMessage="Error Message." validationState="error">
				<Radio id="invalidRadio1" aria-label="invalidRadio1" value="Option 1" />
				<Radio id="invalidRadio2" aria-label="invalidRadio2" value="Option 2" />
			</RadioGroup>
		</FormInput>
	</ThemeProvider>
)
