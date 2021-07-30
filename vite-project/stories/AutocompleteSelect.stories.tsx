import React, { useCallback, useEffect, useState } from "react"
import { FormInput } from "../src/FormInput"
import { Box, ThemeProvider, useDisclosure } from "@chakra-ui/core"
import theme from "../theme.js"
import { AutocompleteSelect } from "../src/AutocompleteSelect"
import { AutocompleteChangeHandler } from "../src/Autocomplete"
import { useForm, Controller } from "react-hook-form"
import { Form } from "../src/SemanticHtml"
import { Button, Modal, Text } from "../src"
import { Option } from "../src/Option"

export default {
	title: "AutocompleteSelect",
	component: AutocompleteSelect,
}

export const defaultMediumAutocomplete = () => {
	const [selectedVal, setSelectedVal] = useState(undefined)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const onChange: AutocompleteChangeHandler = value => {
		setSelectedVal(value)
	}
	const options = [
		{ label: "Alabama", value: "AL" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a default autocomplete dropdown." labelId="defaultLabel" required>
				<AutocompleteSelect id="defaultAutocomplete" options={options} value={selectedVal} onChange={onChange} />
			</FormInput>
		</ThemeProvider>
	)
}

export const addNewOptions = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [options, setOptions] = useState([
		{ label: "Alabama", value: "AL" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
	])
	const [selectedVal, setSelectedVal] = useState(undefined)

	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const onChange: AutocompleteChangeHandler = value => {
		setSelectedVal(value)
	}

	const addNew = { text: "Add State", onClick: () => onOpen() }

	const defaultValues = {
		label: "",
		value: "",
	}
	const { control, handleSubmit, errors } = useForm<Option>({
		defaultValues: defaultValues,
	})

	const onSubmit = data => {
		setOptions(prevOptions => [
			...prevOptions,
			{
				label: data.label,
				value: data.value,
			},
		])
		setSelectedVal(data.value)
		onClose()
	}

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is an autocomplete with addNew options." labelId="addNewLabel" required>
				<AutocompleteSelect
					id="addNewAutocomplete"
					options={options}
					addNew={addNew}
					value={selectedVal}
					onChange={onChange}
				/>
			</FormInput>
			<Modal isOpen={isOpen} title="Add New State" size="sm" onCloseX={onClose}>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormInput labelText="State Name" labelId="addNewLabel" required>
						<Controller
							rules={{ required: "Please add label" }}
							control={control}
							name="label"
							render={({ onChange, value }) => {
								return (
									<Text
										id="addNewLabel"
										name="label"
										value={value}
										aria-labelledby="addNewLabel"
										validationState={errors?.label ? "error" : undefined}
										errorMessage={errors?.label?.message}
										onChange={e => {
											onChange(e.target.value)
										}}
									/>
								)
							}}
						/>
					</FormInput>
					<FormInput labelText="State Code" labelId="addNewValue" required>
						<Controller
							rules={{ required: "Please add value" }}
							control={control}
							name="value"
							render={({ onChange, value }) => {
								return (
									<Text
										id="addNewValue"
										name="value"
										value={value}
										aria-labelledby="addNewValue"
										validationState={errors?.value ? "error" : undefined}
										errorMessage={errors?.value?.message}
										onChange={e => {
											onChange(e.target.value)
										}}
									/>
								)
							}}
						/>
					</FormInput>
					<Button type="submit">Add New State</Button>
				</Form>
			</Modal>
		</ThemeProvider>
	)
}

export const clearableAutocomplete = () => {
	const [selectedVal, setSelectedVal] = useState("AR")
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const onChange: AutocompleteChangeHandler = value => {
		setSelectedVal(value)
	}
	const options = [
		{ label: "Alabama", value: "AL" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a default autocomplete dropdown." labelId="defaultLabel" required>
				<AutocompleteSelect
					id="clearableAutocomplete"
					options={options}
					value={selectedVal}
					onChange={onChange}
					clearable={true}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const customFilterAutocomplete = () => {
	const [selectedVal, setSelectedVal] = useState(undefined)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const onChange: AutocompleteChangeHandler = value => {
		setSelectedVal(value)
	}
	const options = [
		{ label: "Alabama", value: "AL" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
	]
	// useCallback likely not necessary but here for demonstration purposes
	const customFilter = useCallback((i: string) => options.filter(o => o.label.toLowerCase().startsWith(i.toLowerCase())), [])
	return (
		<ThemeProvider theme={theme}>
			<FormInput
				labelText="This is an autocomplete where you determine how to filter based on user input."
				labelId="customFilterLabel"
				required>
				<AutocompleteSelect
					id="customFilterAutocomplete"
					options={options}
					value={selectedVal}
					onChange={onChange}
					filter={customFilter}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const errorAutocomplete = () => {
	const [selectedVal, setSelectedVal] = useState(undefined)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const onChange: AutocompleteChangeHandler = value => {
		setSelectedVal(value)
	}
	const options = [
		{ label: "Alabama", value: "AL" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is an error autocomplete dropdown." labelId="errorLabel" required>
				<AutocompleteSelect
					id="errorAutocomplete"
					options={options}
					value={selectedVal}
					validationState="error"
					errorMessage="This is an error."
					onChange={onChange}
					clearable={true}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const disabledAutocomplete = () => {
	const [selectedVal, setSelectedVal] = useState(undefined)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const onChange: AutocompleteChangeHandler = value => {
		setSelectedVal(value)
	}
	const options = [
		{ label: "Alabama", value: "AL" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
	]

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a default autocomplete dropdown." labelId="defaultLabel" required>
				<AutocompleteSelect
					id="disabledAutocomplete"
					options={options}
					value={undefined}
					onChange={() => console.log()}
					disabled={true}
				/>
			</FormInput>
		</ThemeProvider>
	)
}

export const resetAutocomplete = () => {
	const options = [
		{ label: "Alabama", value: "AL" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
	]
	interface AutocompleteForm {
		autocomplete?: string
	}
	const defaultValues = {
		autocomplete: "",
	}
	const { control, handleSubmit, setValue } = useForm<AutocompleteForm>({
		defaultValues: defaultValues,
	})
	const onSubmit = () => console.log("Submitted")

	return (
		<ThemeProvider theme={theme}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormInput labelText="Reset Autocomplete" labelId="defaultLabel">
					<Controller
						control={control}
						name="autocomplete"
						render={({ onChange, value }) => {
							return (
								<AutocompleteSelect
									id="autocomplete"
									value={value}
									options={options}
									aria-labelledby="defaultLabel"
									onChange={(value: string | undefined) => {
										onChange(value)
									}}
									name="autocomplete"
								/>
							)
						}}
					/>
				</FormInput>

				<Button
					onClick={() => {
						setValue("autocomplete", "")
					}}>
					Reset
				</Button>
			</Form>
		</ThemeProvider>
	)
}

export const changeOptions = () => {
	const [selectedVal, setSelectedVal] = useState(undefined)
	useEffect(() => {
		console.log(`You selected this: ${selectedVal}`)
	}, [selectedVal])
	const onChange: AutocompleteChangeHandler = value => {
		setSelectedVal(value)
	}
	const optionMap = {
		default: [
			{ label: "Alabama", value: "AL" },
			{ label: "Arkansas", value: "AR" },
			{ label: "California", value: "CA" },
		],
		changed: [
			{ label: "Maine", value: "ME" },
			{ label: "Maryland", value: "MD" },
			{ label: "Minnesota", value: "MN" },
		],
	}
	const [flag, setFlag] = useState<boolean>(true)
	const [options, setOptions] = useState<Option[]>(optionMap.default)
	useEffect(() => {
		setOptions(flag ? optionMap.default : optionMap.changed)
	}, [flag])

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="Change options" labelId="defaultLabel">
				<AutocompleteSelect
					id="autocomplete"
					value={undefined}
					options={options}
					name="autocomplete"
					onChange={onChange}
				/>
			</FormInput>
			<Box mt={12}>
				<Button
					onClick={() => {
						setFlag(flag => !flag)
					}}>
					Change Options
				</Button>
			</Box>
		</ThemeProvider>
	)
}

export const tryItOut = args => {
	const [selectedVal, setSelectedVal] = useState(undefined)
	useEffect(() => {
		setSelectedVal(args.value)
	}, [args.value])

	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="Try it out" labelId="tryItOut" required>
				<AutocompleteSelect
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
}
tryItOut.args = {
	options: [
		{ label: "Alabama", value: "AL" },
		{ label: "Arkansas", value: "AR" },
		{ label: "California", value: "CA" },
	],
}
