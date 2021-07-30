import React from "react"
import { ThemeProvider, Box, Stack } from "@chakra-ui/core"
import { Section, SectionFlex, SectionGrid, Nav, NavFlex, NavGrid, Form } from "../src/SemanticHtml"
import theme from "../theme.js"
import { P } from "../src/Typography"
import { Checkbox, CheckboxGroup, FormInput, Radio, RadioGroup, Select } from "../src"

export default {
	title: "Semantic HTML Components",
}

export const defaultSection = () => (
	<ThemeProvider theme={theme}>
		<Section>
			<Stack spacing={24}>
				<Box h="40px" bg="primary" />
				<Box h="40px" bg="primary" />
				<Box h="40px" bg="primary" />
				<Box h="40px" bg="primary" />
			</Stack>
		</Section>
	</ThemeProvider>
)

export const sectionWithFlexbox = () => (
	<ThemeProvider theme={theme}>
		<SectionFlex align="center" justify="space-between">
			<Box w="100px" h="40px" bg="primary" />
			<Box w="100px" h="40px" bg="primary" />
			<Box w="100px" h="40px" bg="primary" />
			<Box w="100px" h="40px" bg="primary" />
		</SectionFlex>
	</ThemeProvider>
)

export const sectionWithResponsiveGrid = () => (
	<ThemeProvider theme={theme}>
		<SectionGrid border="1px solid red">
			<Box w="100%" h="40px" bg="primary" />
			<Box w="100%" h="40px" bg="primary" />
			<Box w="100%" h="40px" bg="primary" />
			<Box w="100%" h="40px" bg="primary" />
		</SectionGrid>
	</ThemeProvider>
)

export const defaultNav = () => (
	<ThemeProvider theme={theme}>
		<Nav>
			<Stack spacing={24}>
				<Box h="40px" bg="primary" />
				<Box h="40px" bg="primary" />
				<Box h="40px" bg="primary" />
				<Box h="40px" bg="primary" />
			</Stack>
		</Nav>
	</ThemeProvider>
)

export const navWithFlexbox = () => (
	<ThemeProvider theme={theme}>
		<NavFlex align="center" justify="space-between">
			<Box w="100px" h="40px" bg="primary" />
			<Box w="100px" h="40px" bg="primary" />
			<Box w="100px" h="40px" bg="primary" />
			<Box w="100px" h="40px" bg="primary" />
		</NavFlex>
	</ThemeProvider>
)

export const navWithResponsiveGrid = () => (
	<ThemeProvider theme={theme}>
		<NavGrid border="1px solid red">
			<Box w="100%" h="40px" bg="primary" />
			<Box w="100%" h="40px" bg="primary" />
			<Box w="100%" h="40px" bg="primary" />
			<Box w="100%" h="40px" bg="primary" />
		</NavGrid>
	</ThemeProvider>
)

export const form = () => {
	const options = [
		{ label: "Option 1", value: "option1" },
		{ label: "Option 2", value: "option2" },
		{ label: "Option 3", value: "option3" },
	]
	return (
		<ThemeProvider theme={theme}>
			<Form>
				<P>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
					make a type specimen book. It has survived not only five centuries, but also the leap into electronic
					typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
					sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum.
				</P>
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
				<FormInput labelText="Default Radio Buttons" labelId="simpleCheckboxLabel">
					<RadioGroup id="simpleRadio">
						<Radio id="simpleRadio1" aria-label="simpleRadio1" value="Option 1" />
						<Radio id="simpleRadio2" aria-label="simpleRadio2" value="Option 2" />
						<Radio id="simpleRadio3" aria-label="simpleRadio3" value="Option 3" />
					</RadioGroup>
				</FormInput>
			</Form>
		</ThemeProvider>
	)
}
