import React, { useEffect, useState } from "react"
import { FormInput } from "../src/FormInput"
import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme"
import { Checkbox, CheckboxGroup } from "../src/Checkbox"

export default {
	title: "CheckboxGroup",
}

export const checkboxDefault = () => {
	const [values, setValue] = useState([])
	useEffect(() => {
		console.log(`The values of selected checkbox value are [${values}]. Please select another checkbox to change the state.`)
	}, [values])
	const onChange = (values: string[]) => {
		setValue(values)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="Default" labelId="simpleCheckboxLabel">
				<CheckboxGroup id="defaultCheckbox" onChange={onChange}>
					<Checkbox id="defaultCheckbox1" value="Selection 1" />
					<Checkbox id="defaultCheckbox2" value="Selection 2" />
					<Checkbox id="defaultCheckbox3" value="Selection 3" />
				</CheckboxGroup>
			</FormInput>
		</ThemeProvider>
	)
}

export const checkboxDefaultChecked = () => {
	const [values, setValue] = useState([])
	useEffect(() => {
		console.log(`The values of selected checkbox value are [${values}]. Please select another checkbox to change the state.`)
	}, [values])
	const onChange = (values: string[]) => {
		setValue(values)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="Checkboxes 1 and 3 Default Checked" labelId="simpleCheckboxLabel">
				<CheckboxGroup id="defaultCheckbox" defaultValue={["Selection 1", "Selection 3"]} onChange={onChange}>
					<Checkbox id="defaultCheckbox1" value="Selection 1" />
					<Checkbox id="defaultCheckbox2" value="Selection 2" />
					<Checkbox id="defaultCheckbox3" value="Selection 3" />
				</CheckboxGroup>
			</FormInput>
		</ThemeProvider>
	)
}

export const disabledCheckbox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="Disabled Checkbox" labelId="disabledCheckboxLabel" disabled>
			<CheckboxGroup id="disabledCheckbox" defaultValue={["Selection 1"]}>
				<Checkbox id="disabledCheckbox1" value="Selection 1" />
				<Checkbox id="disabledCheckbox2" value="Selection 2" />
			</CheckboxGroup>
		</FormInput>
	</ThemeProvider>
)

export const invalidCheckbox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="Invalid Checkbox" labelId="invalidCheckboxLabel">
			<CheckboxGroup id="invalidCheckbox" validationState="error" errorMessage="Error Message.">
				<Checkbox id="invalidCheckbox1" value="Selection 1" />
				<Checkbox id="invalidCheckbox2" value="Selection 2" />
			</CheckboxGroup>
		</FormInput>
	</ThemeProvider>
)
