import React, { useEffect, useState } from "react"
import { FormInput } from "../src/FormInput"
import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"
import { Select, SelectChangeHandler, ClearIcon } from "../src/Select"

export default {
	title: "Select",
	component: Select,
}

export const defaultMediumSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const onChange: SelectChangeHandler = value => {
		setSelectedVal(value)
	}
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a default select" labelId="defaultLabel" required>
				<Select id="defaultSelect" options={options} value={selectedVal} onChange={onChange} />
			</FormInput>
		</ThemeProvider>
	)
}

export const mediumSelectWithInitialSelectedValue = () => {
	const [selectedVal, setSelectedVal] = useState("option1")
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const onChange: SelectChangeHandler = value => {
		setSelectedVal(value)
	}
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a medium select with initial value" labelId="selectLabel" required>
				<Select id="select" options={options} value={selectedVal} onChange={onChange} />
			</FormInput>
		</ThemeProvider>
	)
}

export const extraSmallSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const options = [
		{ label: "Opt 1", value: "option1" },
		{ label: "Opt 2", value: "option2" },
		{ label: "Opt 3", value: "option3" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is XS" labelId="xsSelectLabel">
				<Select
					id="xsSelect"
					size="xs"
					options={options}
					placeholder=""
					value={selectedVal}
					onChange={value => setSelectedVal(value)}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const smallSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is SM" labelId="smSelectLabel">
				<Select
					id="smSelect"
					size="sm"
					options={options}
					placeholder="Select"
					value={selectedVal}
					onChange={value => setSelectedVal(value)}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const largeSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
		{ label: "Option 4", value: "option4" },
		{ label: "Option 5", value: "option5" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is LG" labelId="lgSelectLabel">
				<Select id="lgSelect" size="lg" options={options} value={selectedVal} onChange={value => setSelectedVal(value)} />
			</FormInput>
		</ThemeProvider>
	)
}

export const extralargeSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
		{ label: "Option 4", value: "option4" },
		{ label: "Option 5", value: "option5" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is XL" labelId="xlSelectLabel">
				<Select id="xlSelect" size="xl" options={options} value={selectedVal} onChange={value => setSelectedVal(value)} />
			</FormInput>
		</ThemeProvider>
	)
}

export const fullSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
		{ label: "Option 4", value: "option4" },
		{ label: "Option 5", value: "option5" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is FULL" labelId="fullSelectLabel">
				<Select
					id="fullSelect"
					size="full"
					options={options}
					value={selectedVal}
					onChange={value => setSelectedVal(value)}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const disabledSelect = () => {
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput disabled labelText="This is a disabled select" labelId="disabledSelectLabel">
				<Select id="disabledSelect" options={options} value="option1" onChange={() => console.log("Change")} />
			</FormInput>
		</ThemeProvider>
	)
}

export const requiredSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput required labelText="This is a required select" labelId="requiredSelectLabel">
				<Select id="requiredSelect" options={options} value={selectedVal} onChange={value => setSelectedVal(value)} />
			</FormInput>
		</ThemeProvider>
	)
}

export const successSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a success select" labelId="successSelectLabel">
				<Select
					id="successSelect"
					options={options}
					validationState="success"
					value={selectedVal}
					onChange={value => setSelectedVal(value)}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const errorSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is an error select" labelId="errorSelectLabel">
				<Select
					id="errorSelect"
					options={options}
					validationState="error"
					errorMessage="Error message. Corrective action."
					value={selectedVal}
					onChange={value => setSelectedVal(value)}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const clearableSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This select is clearable" labelId="clearableSelectLabel">
				<Select
					id="clearableSelect"
					options={options}
					clearable={true}
					value={selectedVal}
					onChange={value => setSelectedVal(value)}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const nestedSelect = () => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const optGroup2 = [
		{ label: "Sub-option 1", value: "option21" },
		{ label: "Sub-option 2", value: "option22" },
		{ label: "Sub-option 3", value: "option23" },
		{ label: "Sub-option 4", value: "option24" },
		{ label: "Sub-option 5", value: "option25" },
	]

	const optGroup3 = [
		{ label: "Sub-option 1", value: "option31" },
		{ label: "Sub-option 2", value: "option32" },
		{ label: "Sub-option 3", value: "option33" },
		{ label: "Sub-option 4", value: "option34" },
		{ label: "Sub-option 5", value: "option35" },
	]

	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", options: optGroup2 },
		{ label: "Option 3", options: optGroup3 },
		{ label: "Option 4", value: "option4" },
		{ label: "Option 5", value: "option5" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This select has nested options" labelId="nestedSelectLabel">
				<Select id="nestedSelect" options={options} value={selectedVal} onChange={value => setSelectedVal(value)} />
			</FormInput>
		</ThemeProvider>
	)
}

export const tryItOut = args => {
	const [selectedVal, setSelectedVal] = useState(null)
	useEffect(() => {
		setSelectedVal(args.value)
	}, [args.value])

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a default select" labelId="defaultLabel" required>
				<Select
					{...args}
					value={selectedVal}
					onChange={value => {
						setSelectedVal(value)
						args.onChange && args.onChange(value)
					}}
				/>
			</FormInput>
		</ThemeProvider>
	)
}
tryItOut.argTypes = {
	onChange: { action: "changed" },
	id: { control: { disable: true } },
	icon: { control: { disable: true } },
}
tryItOut.args = {
	options: [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	],
	value: "option2",
}
