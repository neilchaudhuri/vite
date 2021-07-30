import React, { useEffect, useState } from "react"
import { FormInput } from "../src/FormInput"
import { ThemeProvider } from "@chakra-ui/core"
import C1theme from "../theme"
import { Switch } from "../src/Switch"

export default {
	title: "Switch",
}

export const defaultSwitch = () => {
	const [checked, setChecked] = useState(false)
	useEffect(() => {
		console.log(`The switch is ${checked ? "currently" : "not"} checked. Please click the switch to change its state.`)
	}, [checked])
	const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
		setChecked(!checked)
	}
	return (
		<ThemeProvider theme={C1theme}>
			<FormInput labelText="Default switch" labelId="simpleSwitchLabel">
				<Switch id="simpleSwitch1" onClick={onClick} />
			</FormInput>
		</ThemeProvider>
	)
}

export const disabledSwitch = () => (
	<ThemeProvider theme={C1theme}>
		<FormInput labelText="Disabled switch" labelId="disabledSwitchLabel" disabled>
			<Switch id="disabledSwitch1" />
		</FormInput>
	</ThemeProvider>
)
