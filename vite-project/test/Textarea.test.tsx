import React, { FC, useState } from "react"
import { screen } from "@testing-library/react"
import { Textarea } from "../src/Textarea"
import { renderWithTheme } from "./wrapperUtils"
import { FormInput } from "../src/FormInput"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

describe("Basic Textarea functionality", () => {
	const TextareaTest: FC<Partial<React.ComponentProps<typeof Textarea>>> = p => {
		return (
			<FormInput labelText="Textarea input" labelId="defaultLabel">
				<Textarea
					id="defaultTextarea"
					name="defaultTextarea"
					{...p}
				/>
			</FormInput>
		)
	}

	const setup = (textareaElem: React.ReactElement<React.ComponentProps<typeof Textarea>>) => {
		renderWithTheme(textareaElem)
		return screen.getByRole("textbox", { name: "Textarea input" })
	}

	test("Textarea basic style is correct", () => {
		const textareaInput = setup(<TextareaTest aria-describedby="test" maxLength={20} />)

		expect(textareaInput).toHaveStyle({
			backgroundColor: "rgb(255, 255, 255)",
            borderColor: "#b2b2b2",
            color: "rgb(33, 33, 33)"
        })
		expect(screen.getByText("0 / 20")).toHaveStyle({
            color: "rgb(33, 33, 33)",
		})
	})

	test("Textarea character count works", () => {
		const TextareaCountTest: FC = () => {
			const [text, setText] = useState("")
			return (
				<FormInput labelText="Textarea input" labelId="charCountLabel">
					<Textarea
						id="charCountTextarea"
						name="charCountTextarea"
						onChange={e => setText(e.target.value)}
						maxLength={250}
						value={text}
					/>
				</FormInput>
			)
		}
		const textareaInput = setup(<TextareaCountTest />)

		expect(screen.getByText("0 / 250")).toBeInTheDocument()

		userEvent.type(textareaInput, "Test value")

		expect(screen.getByText("10 / 250")).toBeInTheDocument()
	})

	test("Textarea exceed character count works", () => {
		setup(
			<TextareaTest
				defaultValue="Test max chars"
				maxLength={4} />)

		const charCount = screen.getByText("14 / 4")
		expect(charCount).toHaveStyle({
            color: "rgb(193, 2, 48)",
		})
	})

	test("Disabled textarea works", () => {
		const onChangeMock = jest.fn()
		const textareaInput = setup(<TextareaTest disabled onChange={onChangeMock} />)
		userEvent.type(textareaInput, "Test value")

		expect((textareaInput as HTMLInputElement).value).toBe("")
		expect(textareaInput).toBeDisabled()
		expect(textareaInput).toHaveStyle({
			borderColor: "#666666",
			backgroundColor: "rgb(228, 229, 230)",
			color: "rgb(102, 102, 102)"
        })
	})

	test("Required textarea works", () => {
		renderWithTheme(
			<FormInput required labelText="Textarea input" labelId="defaultLabel">
				<Textarea
					id="defaultTextarea"
					name="defaultTextarea"
				/>
			</FormInput>)
		const textareaInput = screen.getByRole("textbox", { name: "* Textarea input" })

		expect(textareaInput).toBeRequired()
	})

	test("Success textarea works", () => {
		const textareaInput = setup(<TextareaTest validationState="success" value="test" />)

		expect(textareaInput).toHaveStyle({
            borderColor: "#00833e",
		})
	})

	test("Error textarea works", () => {
		const textareaInput = setup(<TextareaTest size="lg" validationState="error"
			errorMessage="Error message. Corrective action." />)

		expect(textareaInput).toHaveStyle({
            borderColor: "#c10230",
		})
		expect(screen.getByText("Error message. Corrective action.")).toBeInTheDocument()
	})
})
