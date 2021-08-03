import React, { FC } from "react"
import { screen } from "@testing-library/react"
import { Select, SelectProps } from "../src/Select"
import { renderWithTheme } from "./wrapperUtils"
import { FormInput } from "../src/FormInput"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

const options = [
	{
		value: "AA",
		label: "Armed Forces - AA"
	},
	{
		value: "AK",
		label: "Alaska"
	},
	{
		value: "CA",
		label: "California"
	},
	{
		value: "AL",
		label: "Alabama"
	},
	{
		value: "AP",
		label: "Armed Forces - AP"
	},
	{
		value: "AR",
		label: "Arkansas"
	},
	{
		value: "AS",
		label: "American Samoa"
	},
	{
		value: "AZ",
		label: "Arizona"
	}
]

describe("Basic Select functionality", () => {
	const SelectTest: FC<Partial<SelectProps>> = p => (
		<FormInput labelText="Test Select" labelId="defaultLabel">
			<Select
				id="select"
				name="select"
				options={options}
				{...p}
			/>
		</FormInput>
	)

	const setup = (selectElem: React.ReactElement<SelectProps>) => {
		renderWithTheme(selectElem)
		return screen.getByRole("button",
			{ name: `Test Select ${selectElem.props.placeholder !== undefined ? selectElem.props.placeholder : "Select an option"}`.trim() })
	}

	test("Select click selection works", async () => {
		const onChangeMock = jest.fn()
		const select = setup(<SelectTest onChange={onChangeMock} />)

		userEvent.click(select)
		const alaskaOpt = await screen.findByRole("option", { name: "Alaska", selected: false })
		userEvent.click(alaskaOpt)

		expect(screen.getByRole("option", { name: "Alaska", selected: true })).toBeInTheDocument()
		expect(onChangeMock).toHaveBeenCalledWith("AK")
	})

	test("Select keyboard selection works", async () => {
		const onChangeMock = jest.fn()
		const select = setup(<SelectTest onChange={onChangeMock} />)

		select.focus()
		userEvent.type(select, "{enter}", { skipClick: true })

		await screen.findByRole("option", { name: "Alaska", selected: false })
		userEvent.type(select, "Cal{enter}", { skipClick: true })

		expect(onChangeMock).toHaveBeenCalledWith("CA")
	})

	test("Select keyboard close works", () => {
		const onChangeMock = jest.fn()
		const select = setup(<SelectTest onChange={onChangeMock} />)
		expect(select).toHaveAttribute("aria-expanded", "false")

		select.focus()
		userEvent.type(select, "{enter}", { skipClick: true })
		expect(select).toHaveAttribute("aria-expanded", "true")

		userEvent.type(select, "{esc}", { skipClick: true })
		expect(select).toHaveAttribute("aria-expanded", "false")
	})

	test("Select basic style is correct", () => {
		const select = setup(<SelectTest />)

		expect(select).toHaveStyle({
			backgroundColor: "rgb(255, 255, 255)",
            borderColor: "#b2b2b2",
            color: "rgb(33, 33, 33)"
        })
	})

	test("Disabled select prevents selection", () => {
		const onChangeMock = jest.fn()
		const select = setup(<SelectTest disabled placeholder="" onChange={onChangeMock} />)
		
		userEvent.click(select)

		expect(select).toBeDisabled()
		expect(onChangeMock).not.toHaveBeenCalled()
	})

	test("Required select displays correctly", () => {
		renderWithTheme(
			<FormInput required labelText="Select input" labelId="requiredLabel">
				<Select
					id="selectInput"
					name="selectInput"
					options={options}
				/>
			</FormInput>)
		const selectInput = screen.getByRole("textbox",
			{ name: "* Select input" })

		expect(selectInput).toBeRequired()
	})

	test("Success select displays correctly", () => {
		const select = setup(<SelectTest validationState="success" />)

		expect(select).toHaveStyle({
            borderColor: "#00833e",
		})
	})

	test("Error select displays correctly", () => {
		const select = setup(<SelectTest validationState="error"
			errorMessage="Error message. Corrective action." />)

		expect(select).toHaveStyle({
            borderColor: "#c10230",
		})
		expect(screen.getByText("Error message. Corrective action.")).toBeInTheDocument()
	})

	test("Select clear works", () => {
		const onChangeMock = jest.fn()
		renderWithTheme(<SelectTest clearable value="AL" onChange={onChangeMock} />)

		expect(screen.getByRole("textbox", { name: "Test Select" })).toHaveValue("AL")
		
		const clearBtn = screen.getByRole("button", { name: "Clear" })
		userEvent.click(clearBtn)

		expect(onChangeMock).toHaveBeenCalledWith(undefined)
	})

	test("Nested select click selection works", async () => {
		const optGroup = [
			{ label: "Sub-option 1", value: "option21" },
			{ label: "Sub-option 2", value: "option22" },
			{ label: "Sub-option 3", value: "option23" },
			{ label: "Sub-option 4", value: "option24" },
			{ label: "Sub-option 5", value: "option25" },
		]

		const options = [
			{ label: "Option 1", value: "option1" },
			{ label: "Option 2", options: optGroup },
			{ label: "Option 3", value: "option3" },
			{ label: "Option 4", value: "option4" },
			{ label: "Option 5", value: "option5" },
		]

		const onChangeMock = jest.fn()
		renderWithTheme(
			<FormInput labelText="Nested Select input" labelId="nestedSelectLabel">
				<Select
					id="nestedSelectInput"
					name="nestedSelectInput"
					placeholder=""
					options={options}
					onChange={onChangeMock}
				/>
			</FormInput>)
		const select = screen.getByRole("button", { name: "Nested Select input" })

		userEvent.click(select)
		
		const opt2 = await screen.findByRole("option", { name: "Option 2", selected: false })
		userEvent.click(opt2)

		const subOpt3 = await screen.findByRole("option", { name: "Sub-option 3", selected: false })
		userEvent.click(subOpt3)

		expect(onChangeMock).toHaveBeenCalledWith("option23")
	})

	test("Nested select keyboard selection works", async () => {
		const optGroup = [
			{ label: "Sub-option A", value: "optionB1" },
			{ label: "Sub-option B", value: "optionB2" },
			{ label: "Sub-option C", value: "optionB3" },
		]

		const options = [
			{ label: "Option A", value: "optiona" },
			{ label: "Option B", options: optGroup },
			{ label: "Option C", value: "optionc" },
		]

		const onChangeMock = jest.fn()
		renderWithTheme(
			<FormInput labelText="Nested Select input" labelId="nestedSelectLabel">
				<Select
					id="nestedSelectInput"
					name="nestedSelectInput"
					placeholder=""
					options={options}
					onChange={onChangeMock}
				/>
			</FormInput>)
		const select = screen.getByRole("button", { name: "Nested Select input" })

		select.focus()
		userEvent.type(select, "{enter}", { skipClick: true })
		
		await screen.findByRole("option", { name: "Option B", selected: false })
		userEvent.type(select, "{arrowdown}{arrowdown}{enter}", { skipClick: true })

		await screen.findByRole("option", { name: "Sub-option A" })
		userEvent.type(select, "{arrowdown}{enter}", { skipClick: true })

		expect(onChangeMock).toHaveBeenCalledWith("optionB2")
	})
})
