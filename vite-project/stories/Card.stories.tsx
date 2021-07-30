import React from "react"
import { H1, H2, H3, Label, P } from "../src/Typography"
import { Card, CardBody, CardHeader } from "../src/Card"
import { FormInput } from "../src/FormInput"
import { Checkbox, CheckboxGroup } from "../src/Checkbox"
import { Radio, RadioGroup } from "../src/Radio"
import { Box, Grid, SimpleGrid, Stack, ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { Form } from "../src/SemanticHtml"

export default {
	title: "Card",
}

export const defaultCard = () => (
	<ThemeProvider theme={theme}>
		<Card id="defaultCard">
			<CardHeader>
				<H2>Card Title</H2>
			</CardHeader>
			<CardBody>
				<P>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
					sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatib.
				</P>
			</CardBody>
		</Card>
	</ThemeProvider>
)

export const exampleCard = () => (
	<ThemeProvider theme={theme}>
		<Card maxWidth="288px" id="exampleCard">
			<CardHeader>
				<H2>Card Title</H2>
			</CardHeader>
			<CardBody>
				<P>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
					sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatib.
				</P>
			</CardBody>
		</Card>
	</ThemeProvider>
)

export const exampleFormCard = () => (
	<ThemeProvider theme={theme}>
		<Card id="exampleFormCard">
			<CardHeader>
				<H1>Card Header</H1>
			</CardHeader>
			<CardBody>
				<Form>
					<H1>Header 1</H1>
					<H2>Header 2</H2>
					<H3>Header 3</H3>
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
					<FormInput labelText="Default Radio Buttons" labelId="simpleRadioLabel">
						<RadioGroup id="simpleRadio">
							<Radio id="simpleRadio1" aria-label="simpleRadio1" value="Option 1" />
							<Radio id="simpleRadio2" aria-label="simpleRadio2" value="Option 2" />
							<Radio id="simpleRadio3" aria-label="simpleRadio3" value="Option 3" />
						</RadioGroup>
					</FormInput>
				</Form>
			</CardBody>
		</Card>
	</ThemeProvider>
)

export const exampleECRBACard = () => (
	<ThemeProvider theme={theme}>
		<Stack spacing={24} shouldWrapChildren={true}>
			<Card id="exampleECRBACard">
				<Box
					position="absolute"
					d="flex"
					flexDir="column"
					alignItems="stretch"
					w="140px"
					top={["-16px", "-16px", "-24px", "-24px", "-24px"]}
					right={["-16px", "-16px", "-24px", "-24px", "-24px"]}>
					<Box
						bg="secondary"
						color="white"
						w="140px"
						textAlign="center"
						fontSize={["12px", "12px", "16px", "16px", "16px"]}
						h={["16px", "16px", "24px", "24px", "24px"]}>
						eCRBA
					</Box>
					<Box w="140px" height="100px" d="flex" alignContent="center" justifyContent="center">
						<Stack isInline my="40%" mx="25%" color="clickable">
							<EditIcon />
							<DeleteIcon />
						</Stack>
					</Box>
				</Box>
				<CardHeader>
					<H3>Andrew James Smith</H3>
					<P>ID: 1-12345</P>
				</CardHeader>
				<CardBody>
					<SimpleGrid columns={3}>
						<Label>Submit Date</Label>
						<Label>Estimated Completion Date</Label>
						<Label>Status</Label>
						<P>02/05/2020 3:36PM EST</P>
						<P>04/01/2020</P>
						<P color="success">Case assigned</P>
					</SimpleGrid>
				</CardBody>
			</Card>
			<Card id="exampleECRBACard2">
				<Box
					position="absolute"
					d="flex"
					flexDir="column"
					alignItems="stretch"
					w="140px"
					top={["-16px", "-16px", "-24px", "-24px", "-24px"]}
					right={["-16px", "-16px", "-24px", "-24px", "-24px"]}>
					<Box
						bg="#002d74"
						color="white"
						w="140px"
						textAlign="center"
						fontSize={["12px", "12px", "16px", "16px", "16px"]}
						h={["16px", "16px", "24px", "24px", "24px"]}>
						eCRBA
					</Box>
					<Box w="140px" height="100px" d="flex" alignContent="center" justifyContent="center">
						<Stack isInline my="40%" mx="25%" color="clickable">
							<EditIcon />
							<DeleteIcon />
						</Stack>
					</Box>
				</Box>
				<CardHeader>
					<H3>Rebecca Jane Smith</H3>
					<P>ID: 1-12345</P>
				</CardHeader>
				<CardBody>
					<Grid templateColumns="repeat(3, 1fr)">
						<Label>Submit Date</Label>
						<Label>Estimated Completion Date</Label>
						<Label>Status</Label>
						<P>02/05/2020 3:36PM EST</P>
						<P>04/01/2020</P>
						<P color="success">Case assigned</P>
					</Grid>
				</CardBody>
			</Card>
		</Stack>
	</ThemeProvider>
)
