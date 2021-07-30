import * as React from "react"
import { P } from "../src/Typography"
import { Text } from "../src/Text"
import { FormInput } from "../src/FormInput"
import { Button } from "../src/Button"
import { CalendarToday } from "@material-ui/icons"
import { IconAlignment } from "../src/Icon"
import { Modal } from "../src/Modal"
import { Flex, ThemeProvider, useDisclosure } from "@chakra-ui/core"
import theme from "../theme.js"
import { Form } from "../src/SemanticHtml"

export default {
	title: "Modal",
}

export const defaultModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<ThemeProvider theme={theme}>
			<Button onClick={onOpen}>Open Modal</Button>
			<Modal isOpen={isOpen} title="Default Medium Modal" onCloseX={onClose}>
				<P>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.</P>
			</Modal>
		</ThemeProvider>
	)
}

export const smallModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const buttons = {
		secondaryButton: {
			text: "Cancel",
			onClick: () => {
				console.log("Bye!")
				onClose()
			},
		},
		primaryButton: {
			text: "Save",
			onClick: () => console.log("Clicked save"),
		},
	}
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={onOpen}>Open Modal</Button>
			<Modal isOpen={isOpen} title="Small Modal" footer={buttons} size="sm" onCloseX={onClose}>
				<P>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
					sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatib.
				</P>
			</Modal>
		</ThemeProvider>
	)
}

export const largeModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const buttons = {
		secondaryButton: {
			text: "Cancel",
			onClick: () => {
				console.log("Bye!")
				onClose()
			},
		},
		primaryButton: {
			text: "Save",
			onClick: () => console.log("Clicked save"),
		},
	}
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={onOpen}>Open Modal</Button>
			<Modal isOpen={isOpen} title="Large Modal" footer={buttons} size="lg" onCloseX={onClose}>
				<P>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
					sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatib.
				</P>
			</Modal>
		</ThemeProvider>
	)
}

export const formModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const buttons = {
		secondaryButton: {
			text: "Cancel",
			onClick: () => {
				console.log("Bye!")
				onClose()
			},
		},
		primaryButton: {
			text: "Save",
			onClick: () => console.log("Clicked save"),
		},
	}
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={onOpen}>Open Modal</Button>
			<Modal isOpen={isOpen} title="Large Form Modal" footer={buttons} size="lg" onCloseX={onClose}>
				<Form>
					<P>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida
						dolor sit amet lacus accumsan et viverra justo commodo.
					</P>
					<FormInput labelText="Text Label" labelId="label">
						<Text id="xsText" size="lg" onChange={() => console.log("Change")} />
					</FormInput>
					<FormInput labelText="Text Label" labelId="label">
						<Text id="xsText" size="lg" onChange={() => console.log("Change")} />
					</FormInput>
					<FormInput labelText="Text Label" labelId="label">
						<Text
							id="leadingText"
							placeholder="MM/DD/YYYY"
							textIcon={{ mdIcon: CalendarToday, color: "clickable", alignment: IconAlignment.LEFT }}
							onChange={() => console.log("date field changed")}
						/>
					</FormInput>
				</Form>
			</Modal>
		</ThemeProvider>
	)
}

export const customizedModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const buttons = {
		secondaryButton: {
			text: "Cancel",
			onClick: () => {
				console.log("Bye!")
				onClose()
			},
		},
		primaryButton: {
			text: "Save",
			onClick: () => console.log("Clicked save"),
		},
	}
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={onOpen}>Open Modal</Button>
			<Modal
				isOpen={isOpen}
				title="Customized Modal"
				footer={buttons}
				closeOnEsc={false}
				closeOnOverlayClick={false}
				onCloseX={buttons.secondaryButton.onClick}>
				<P>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
					sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatib.
				</P>
			</Modal>
		</ThemeProvider>
	)
}

export const modalWithBiggerButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const buttons = {
		secondaryButton: {
			text: "Cancel",
			onClick: () => {
				console.log("Bye!")
				onClose()
			},
		},
		primaryButton: {
			text: "Save",
			onClick: () => console.log("Clicked save"),
		},
	}
	return (
		<ThemeProvider theme={theme}>
			<Button onClick={onOpen}>Open Modal</Button>
			<Modal isOpen={isOpen} title="Modal with Bigger Button" footer={buttons} onCloseX={onClose}>
				<P>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
					sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatib.
				</P>
			</Modal>
		</ThemeProvider>
	)
}

export const modalWithYourOwnButtons = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<ThemeProvider theme={theme}>
			<Button onClick={onOpen}>Open Modal</Button>
			<Modal isOpen={isOpen} title="Modal with Your Own Buttons" size="lg" onCloseX={onClose}>
				<Form>
					<FormInput labelText="Date" labelId="label">
						<Text
							id="leadingText"
							placeholder="MM/DD/YYYY"
							textIcon={{ mdIcon: CalendarToday, color: "clickable", alignment: IconAlignment.LEFT }}
							onChange={() => console.log("date field changed")}
						/>
					</FormInput>
					<Flex px={0} py={0} display="inline-flex" align="center">
						<Button onClick={() => console.log("Clicked Save")}>Save</Button>
					</Flex>
				</Form>
			</Modal>
		</ThemeProvider>
	)
}
