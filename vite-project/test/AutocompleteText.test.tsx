import React, { FC, useEffect, useState } from "react"
import { screen } from "@testing-library/react"
import { AutocompleteText } from "../src/AutocompleteText"
import { renderWithTheme } from "./wrapperUtils"
import { FormInput } from "../src/FormInput"
import { useForm, Controller } from "react-hook-form"
import { Form } from "../src/SemanticHtml"
import { AutocompleteChangeHandler } from "../src/Autocomplete"
import { Option } from "../src/Option"
import userEvent from "@testing-library/user-event"

const options = [
	{ label: "Alabama", value: "AL" },
	{ label: "Arkansas", value: "AR" },
	{ label: "California", value: "CA" },
]

interface TestProps {
	onChange: AutocompleteChangeHandler
}

describe("Basic AutocompleteText function", () => {
	const AutocompleteTextTest: FC<TestProps> = p => {
		// eslint-disable-next-line @typescript-eslint/unbound-method
		const { register, handleSubmit } = useForm()
		const onSubmit = () => console.log("Submitted")

		return (
			<Form onSubmit={handleSubmit(onSubmit)}>
				<FormInput labelText="Autocomplete" labelId="defaultLabel">
					<AutocompleteText
						id="autocomplete"
						options={options}
						onChange={p.onChange}
						name="autocomplete"
						ref={() => register({ name: "autocomplete" })}
					/>
				</FormInput>
			</Form>
		)
	}

	const setup = () => {
		const onChange = jest.fn()
		const view = renderWithTheme(<AutocompleteTextTest onChange={onChange} />)
		const autocomplete = view.getByRole("textbox", { name: "Autocomplete" })
		return {
			autocomplete,
			onChange,
		}
	}

	test("AutocompleteText basic selection works", () => {
		const { autocomplete, onChange } = setup()
		userEvent.type(autocomplete, "al{arrowdown}{arrowdown}{enter}")

		expect((autocomplete as HTMLInputElement).value).toBe("California")
		expect(onChange).toHaveBeenCalledWith("CA")
	})

	test("Typing in an entire item in the list selects it", () => {
		const { autocomplete, onChange } = setup()
		userEvent.type(autocomplete, "Arkansas")

		expect((autocomplete as HTMLInputElement).value).toBe("Arkansas")
		expect(onChange).toHaveBeenCalledWith("AR")
	})

	test("Erase unselected value on blur", () => {
		const { autocomplete, onChange } = setup()
		userEvent.type(autocomplete, "Arkansas")
		userEvent.clear(autocomplete)
		userEvent.type(autocomplete, "Maine")
		autocomplete.blur()

		expect(onChange).toHaveBeenCalledWith(undefined)
	})
})

describe("AutocompleteText with React Hook Form", () => {
	test("Form reset works", async () => {
		interface AutocompleteForm {
			autocomplete?: string
		}
		const defaultValues = {
			autocomplete: "",
		}
		const FormAutocompleteTextTest: FC = () => {
			// eslint-disable-next-line @typescript-eslint/unbound-method
			const { control, handleSubmit, setValue } = useForm<AutocompleteForm>({
				defaultValues: defaultValues,
			})

			const onSubmit = () => console.log("Submitted")

			return (
				<Form onSubmit={handleSubmit(onSubmit)}>
					<FormInput labelText="Reset Autocomplete" labelId="defaultLabel">
						<Controller
							control={control}
							name="autocomplete"
							render={({ onChange, value }) => {
								return (
									<AutocompleteText
										id="autocomplete"
										value={value} // eslint-disable-line @typescript-eslint/no-unsafe-assignment
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

					<button
						type="button"
						data-testid="reset-button"
						onClick={() => {
							setValue("autocomplete", "")
						}}
					/>
				</Form>
			)
		}
		renderWithTheme(<FormAutocompleteTextTest />)
		const reset = screen.getByTestId("reset-button")
		const autocomplete = screen.getByRole("textbox", { name: "Reset Autocomplete" })

		expect((autocomplete as HTMLInputElement).value).toBe("")
		userEvent.type(autocomplete, "Arkansas{arrowdown}{arrowdown}{enter}")
		expect((autocomplete as HTMLInputElement).value).toBe("Arkansas")
		userEvent.click(reset)
		await screen.findByRole("textbox", { name: "Reset Autocomplete" })
		expect((autocomplete as HTMLInputElement).value).toBe("")
	})
})

describe("Update props on AutocompleteText", () => {
	test("Change options", async () => {
		const onChange = jest.fn()
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
		const AutocompleteTextPropsTest: FC = () => {
			const [flag, setFlag] = useState<boolean>(true)
			const [options, setOptions] = useState<Option[]>(optionMap.default)
			useEffect(() => {
				setOptions(flag ? optionMap.default : optionMap.changed)
			}, [flag])
			return (
				<>
					<FormInput labelText="Change options" labelId="defaultLabel">
						<AutocompleteText
							id="autocomplete"
							value={undefined}
							options={options}
							name="autocomplete"
							onChange={onChange}
						/>
					</FormInput>

					<button
						type="button"
						data-testid="update-button"
						onClick={() => {
							setFlag(flag => !flag)
						}}
					/>
				</>
			)
		}
		renderWithTheme(<AutocompleteTextPropsTest />)
		const update = screen.getByTestId("update-button")
		let autocomplete = screen.getByRole("textbox", { name: "Change options" })

		userEvent.type(autocomplete, "al{arrowdown}{arrowdown}{enter}")

		expect((autocomplete as HTMLInputElement).value).toBe("California")
		expect(onChange).toHaveBeenCalledWith("CA")

		userEvent.click(update)
		autocomplete = await screen.findByRole("textbox", { name: "Change options" })
		userEvent.type(autocomplete, "ma{arrowdown}{enter}")

		//expect((autocomplete as HTMLInputElement).value).toBe("Maine")
		expect(onChange).toHaveBeenCalledWith("ME")
	})

	test("Change options where a different label maps to an existing value", async () => {
		const onChange = jest.fn()
		const optionMap = {
			default: [
				{ label: "Alabama", value: "AL" },
				{ label: "Arkansas", value: "AR" },
				{ label: "California", value: "CA" },
			],
			changed: [
				{ label: "Maine", value: "ME" },
				{ label: "Maryland", value: "MD" },
				{ label: "Minnesota", value: "CA" },
			],
		}
		const AutocompleteTextPropsTest: FC = () => {
			const [flag, setFlag] = useState<boolean>(true)
			const [options, setOptions] = useState<Option[]>(optionMap.default)
			useEffect(() => {
				setOptions(flag ? optionMap.default : optionMap.changed)
			}, [flag])
			return (
				<>
					<FormInput labelText="Change options" labelId="defaultLabel">
						<AutocompleteText
							id="autocomplete"
							value={undefined}
							options={options}
							name="autocomplete"
							onChange={onChange}
						/>
					</FormInput>

					<button
						type="button"
						data-testid="update-button"
						onClick={() => {
							setFlag(flag => !flag)
						}}
					/>
				</>
			)
		}
		renderWithTheme(<AutocompleteTextPropsTest />)
		const update = screen.getByTestId("update-button")
		let autocomplete = screen.getByRole("textbox", { name: "Change options" })

		userEvent.type(autocomplete, "al{arrowdown}{arrowdown}{enter}")

		expect((autocomplete as HTMLInputElement).value).toBe("California")
		expect(onChange).toHaveBeenCalledWith("CA")

		userEvent.click(update)
		autocomplete = await screen.findByRole("textbox", { name: "Change options" })
		userEvent.type(autocomplete, "mi{arrowdown}{enter}")

		//expect((autocomplete as HTMLInputElement).value).toBe("Maine")
		expect(onChange).toHaveBeenCalledWith("CA")
	})
})

describe("Add new option", () => {
	test("Add Virginia", async () => {
		const onChange = jest.fn()
		const optionMap = [
			{ label: "Alabama", value: "AL" },
			{ label: "Arkansas", value: "AR" },
			{ label: "California", value: "CA" },
		]

		const AutocompleteTextAddNewTest: FC = () => {
			const [options, setOptions] = useState(optionMap)
			const [selectedVal, setSelectedVal] = useState<string | undefined>(undefined)
			const [addNewClicked, setAddNewClicked] = useState<boolean>(false)
			const addNew = {
				text: "Add State",
				onClick: () => {
					setAddNewClicked(true)
				},
			}

			useEffect(() => {
				if (addNewClicked) {
					console.log("clicked for option")
					setOptions(prevOptions => [
						...prevOptions,
						{
							label: "Virginia",
							value: "VA",
						},
					])
				}
			}, [addNewClicked])

			useEffect(() => {
				if (addNewClicked) {
					console.log("clicked for va")
					setSelectedVal("VA")
				}
			}, [addNewClicked])

			return (
				<>
					<FormInput labelText="Add New" labelId="addNewLabel">
						<AutocompleteText
							id="addNewAutocomplete"
							data-testid="addNewAutocomplete"
							options={options}
							addNew={addNew}
							value={selectedVal}
							onChange={onChange}
						/>
					</FormInput>
				</>
			)
		}

		renderWithTheme(<AutocompleteTextAddNewTest />)
		const autocomplete = screen.getByRole("textbox", { name: "Add New" })
		userEvent.type(autocomplete, "{arrowdown}{enter}")

		expect((autocomplete as HTMLInputElement).value).toBe("Virginia")
		userEvent.type(autocomplete, "{arrowdown}{arrowdown}{arrowdown}{arrowdown}{arrowdown}{enter}")
		expect((autocomplete as HTMLInputElement).value).toBe("Virginia")
		await screen.findByText("Virginia")
	})
})
