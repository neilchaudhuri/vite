import React from "react"
import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"
import { Alerts, AlertMessage } from "../src/Alert"
import { Link as ReachLink } from "@reach/router"
import { Checkbox, CheckboxGroup, Form, FormInput, LinkProps, P, Page, Radio, RadioGroup, Select } from "../src"
import { Header } from "../src/Header"

export default {
	title: "Alerts",
	component: Alerts,
}

const readMore: LinkProps = { as: ReachLink, to: "/" }

export const singleWarningAlert = () => {
	const alerts: AlertMessage[] = [
		{
			status: "warning",
			message: "System Maintenance will occur today between 3:00 PM - 4:00 PM ET.",
		},
	]
	return (
		<ThemeProvider theme={theme}>
			<Alerts messages={alerts} readMore={readMore} />
		</ThemeProvider>
	)
}

export const multipleWarningAlerts = () => {
	const alerts: AlertMessage[] = [
		{
			status: "warning",
			message: "System Maintenance will occur today between 3:00 PM - 4:00 PM ET.",
		},
		{
			status: "warning",
			message: "System Maintenance will occur next Wednesday between 12:00 PM - 4:00 PM ET.",
		},
		{
			status: "warning",
			message: "System Maintenance will occur next Friday between 2:00 PM - 4:00 PM ET.",
		},
	]
	return (
		<ThemeProvider theme={theme}>
			<Alerts messages={alerts} readMore={readMore} />
		</ThemeProvider>
	)
}

export const singleErrorAlert = () => {
	const alerts: AlertMessage[] = [
		{
			status: "error",
			message: "Emergency evacuation of downtown in effect.",
		},
	]
	return (
		<ThemeProvider theme={theme}>
			<Alerts messages={alerts} readMore={readMore} />
		</ThemeProvider>
	)
}

export const multipleDifferentAlerts = () => {
	const alerts: AlertMessage[] = [
		{
			status: "warning",
			message: "System Maintenance will occur today between 3:00 PM - 4:00 PM ET.",
		},
		{
			status: "error",
			message: "Emergency evacuation of downtown in effect.",
		},
	]
	return (
		<ThemeProvider theme={theme}>
			<Alerts messages={alerts} readMore={readMore} />
		</ThemeProvider>
	)
}

export const alertOnPage = () => {
	const alertMessages: AlertMessage[] = [
		{
			status: "warning",
			message: "System Maintenance will occur today between 3:00 PM - 4:00 PM ET.",
		},
		{
			status: "error",
			message: "Emergency evacuation of downtown in effect.",
		},
	]
	const alerts = <Alerts messages={alertMessages} readMore={readMore} />
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
			label: "International Parental Child Abduction",
			href: "https://travel.state.gov/content/travel/en/International-Parental-Child-Abduction.html",
		},
	]
	const unauthenticatedUser = {
		createAccount: () => console.log("Create account clicked"),
		signIn: () => console.log("Sign in clicked"),
	}
	return (
		<ThemeProvider theme={theme}>
			<Page header={<Header navbarLinks={links} user={unauthenticatedUser} alerts={alerts} />}>
				<Form>
					<P>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
						industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
						scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
						electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
						of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
						like Aldus PageMaker including versions of Lorem Ipsum.
					</P>
					<FormInput labelText="Default Checkboxes" labelId="simpleCheckboxLabel">
						<CheckboxGroup id="defaultCheckbox">
							<Checkbox id="defaultCheckbox1" aria-label="defaultCheckboxLabel1" value="Option 1" />
							<Checkbox id="defaultCheckbox2" aria-label="defaultCheckboxLabel2" value="Option 2" />
							<Checkbox id="defaultCheckbox3" aria-label="defaultCheckboxLabel3" value="Option 3" />
							<Checkbox id="defaultCheckbox4" aria-label="defaultCheckboxLabel4" value="Option 4" />
						</CheckboxGroup>
					</FormInput>
					<FormInput labelText="Default Radio Buttons" labelId="simpleCheckboxLabel">
						<RadioGroup id="simpleRadio">
							<Radio id="simpleRadio1" aria-label="simpleRadio1" value="Option 1" />
							<Radio id="simpleRadio2" aria-label="simpleRadio2" value="Option 2" />
							<Radio id="simpleRadio3" aria-label="simpleRadio3" value="Option 3" />
						</RadioGroup>
					</FormInput>
				</Form>
			</Page>
		</ThemeProvider>
	)
}

export const tryItOut = args => {
	return (
		<ThemeProvider theme={theme}>
			<Alerts messages={args.messages ?? []} />
		</ThemeProvider>
	)
}
tryItOut.args = {
	messages: [
		{ status: "warning", message: "Try it out" },
		{ status: "error", message: "Try out an error" },
	],
}
