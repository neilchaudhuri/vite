import React from "react"
import { Header } from "../src/Header"
import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"
import { Page } from "../src/Page"
import { Checkbox, CheckboxGroup, FormInput, P, Radio, RadioGroup, Select, H1, BigText } from "../src"
import { Form } from "../src/SemanticHtml"

export default {
	title: "Page",
}

const links = [
	{
		label: "U.S. Passport",
		href: "https://travel.state.gov/content/travel/en/passports.html",
	},
	{
		label: "Citizen Services",
		href: "#top",
	},
	{
		label: "Crisis Assistance",
		href: "#top",
	},
	{
		label: "U.S. Visa",
		href: "https://travel.state.gov/content/travel/en/us-visas.html",
	},
	{
		label: "Intercountry Adoption",
		href: "https://travel.state.gov/content/travel/en/Intercountry-Adoption.html",
	},
	{
		label: "International Child Abduction",
		href: "https://travel.state.gov/content/travel/en/International-Parental-Child-Abduction.html",
	},
]
const options = [
	{ label: "Option 1", value: "option1" },
	{ label: "Option 2", value: "option2" },
	{ label: "Option 3", value: "option3" },
]

const form = (
	<>
		<H1>This is a form on the page</H1>
		<Form>
			<BigText>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
				standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
				type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
				remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
				Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
				of Lorem Ipsum.
			</BigText>
			<FormInput labelText="Default Checkboxes" labelId="simpleCheckboxLabel">
				<CheckboxGroup id="defaultCheckbox">
					<Checkbox id="defaultCheckbox1" aria-label="defaultCheckboxLabel1" value="Option 1" />
					<Checkbox id="defaultCheckbox2" aria-label="defaultCheckboxLabel2" value="Option 2" />
					<Checkbox id="defaultCheckbox3" aria-label="defaultCheckboxLabel3" value="Option 3" />
					<Checkbox id="defaultCheckbox4" aria-label="defaultCheckboxLabel4" value="Option 4" />
				</CheckboxGroup>
			</FormInput>
			<FormInput labelText="Pick something" labelId="selectLabel" required>
				<Select id="defaultSelect" options={options} value="Option 1" onChange={() => console.log("changed")} />
			</FormInput>
			<FormInput labelText="Default Radio Buttons" labelId="simpleRadioLabel">
				<RadioGroup id="simpleRadio">
					<Radio id="simpleRadio1" aria-label="simpleRadio1" value="Option 1" />
					<Radio id="simpleRadio2" aria-label="simpleRadio2" value="Option 2" />
					<Radio id="simpleRadio3" aria-label="simpleRadio3" value="Option 3" />
				</RadioGroup>
			</FormInput>
		</Form>
	</>
)

export const pageWithUnauthenticatedUser = () => {
	const unauthenticatedUser = {
		createAccount: () => console.log("Create account clicked"),
		signIn: () => console.log("Sign in clicked"),
	}
	return (
		<ThemeProvider theme={theme}>
			<Page header={<Header navbarLinks={links} user={unauthenticatedUser} />}>{form}</Page>
		</ThemeProvider>
	)
}

export const pageWithAuthenticatedUser = () => {
	const authenticatedUser = {
		name: "John Smith",
		editAccount: () => console.log("Edit Account clicked"),
		updatePassword: () => console.log("Update Password clicked"),
		logout: () => console.log("Log Out clicked"),
	}
	return (
		<ThemeProvider theme={theme}>
			<Page header={<Header navbarLinks={links} user={authenticatedUser} />}>{form}</Page>
		</ThemeProvider>
	)
}
