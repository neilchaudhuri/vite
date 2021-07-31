import React, { FC } from "react"
import { screen } from "@testing-library/react"
import { Text, SuccessIcon, ErrorIcon } from "../src/Text"
import { renderWithTheme } from "./wrapperUtils"
import { FormInput } from "../src/FormInput"
import { Clear } from "@material-ui/icons"
import { IconAlignment } from "../src/Icon"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

describe("Basic Text functionality", () => {
	const TextTest: FC<Partial<React.ComponentProps<typeof Text>>> = p => {
		return (
			<FormInput labelText="Text input" labelId="defaultLabel">
				<Text
					id="defaultText"
					name="defaultText"
					{...p}
				/>
			</FormInput>
		)
	}

	const setup = (textElem: React.ReactElement<React.ComponentProps<typeof Text>>) => {
		renderWithTheme(textElem)
		return screen.getByRole("textbox", { name: "Text input" })
	}

	test("Text basic entry works", () => {
		const onChangeMock = jest.fn()
		const textInput = setup(<TextTest onChange={onChangeMock} />)
		userEvent.type(textInput, "Test value")

		expect(textInput).toHaveValue("Test value")
		expect(onChangeMock).toHaveBeenCalled()
	})

	test("Text basic style is correct", () => {
		const textInput = setup(<TextTest />)

		expect(textInput).toHaveStyle({
			backgroundColor: "rgb(255, 255, 255)",
            borderColor: "#b2b2b2",
            color: "rgb(33, 33, 33)"
        })
	})

	test("Disabled text prevents selection", () => {
		const onChangeMock = jest.fn()
		const textInput = setup(<TextTest disabled onChange={onChangeMock} />)
		userEvent.type(textInput, "Test value")

		expect(textInput).toHaveValue("")
		expect(textInput).toBeDisabled()
		expect(onChangeMock).not.toHaveBeenCalled()
		expect(textInput).toHaveStyle({
			borderColor: "#666666",
			backgroundColor: "rgb(228, 229, 230)",
			color: "rgb(102, 102, 102)"
        })
	})

	test("Required text displays correctly", () => {
		renderWithTheme(
			<FormInput required labelText="Text input" labelId="defaultLabel">
				<Text
					id="defaultText"
					name="defaultText"
				/>
			</FormInput>)
		const textInput = screen.getByRole("textbox", { name: "* Text input" })

		expect(textInput).toBeRequired()
	})

	test("Success text displays correctly", () => {
		const textInput = setup(<TextTest validationState="success"
			textIcon={SuccessIcon} />)

		expect(textInput).toHaveStyle({
            borderColor: "#00833e",
		})
		expect(textInput.nextSibling?.firstChild?.nodeName).toBe("svg")
	})

	test("Error text displays correctly", () => {
		const textInput = setup(<TextTest validationState="error"
			textIcon={ErrorIcon}
			errorMessage="Error message. Corrective action." />)

		expect(textInput).toHaveStyle({
            borderColor: "#c10230",
		})
		expect(textInput.nextSibling?.firstChild?.nodeName).toBe("svg")
		expect(screen.getByText("Error message. Corrective action.")).toBeInTheDocument()
	})

	test("Action icon works", () => {
		const onClickMock = jest.fn()
		setup(<TextTest
			size="lg"
			textIcon={{
				mdIcon: Clear,
				color: "doveGray",
				alignment: IconAlignment.LEFT,
				ariaLabel: "Clear input",
				onClick: onClickMock,
			}} />)

		const clearButton = screen.getByRole("button", { name: "Clear input" })
		userEvent.click(clearButton)
		expect(onClickMock).toHaveBeenCalledTimes(1)
	})
})
