import React, { useEffect, useState } from "react"
import { FormInput } from "../src/FormInput"
import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"
import { Text, ErrorIcon, SuccessIcon } from "../src/Text"
import { DateRangeSharp, Clear, Computer } from "@material-ui/icons"
import { IconAlignment } from "../src/Icon"

export default {
	title: "Text",
}

export const defaultMediumTextBox = () => {
	const [text, setText] = useState("Sample text")
	useEffect(() => {
		console.log(`You typed this: ${text}`)
	}, [text])
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value
		setText(text)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a default input" labelId="defaultLabel">
				<Text id="defaultText" value={text} onChange={onChange} />
			</FormInput>
		</ThemeProvider>
	)
}

export const extraSmallTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is XS" labelId="label">
			<Text id="xsText" value="Sample text" size="xs" onChange={() => console.log("Change")} />
		</FormInput>
	</ThemeProvider>
)

export const smallTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is SM" labelId="label">
			<Text id="smText" value="Sample text" size="sm" onChange={() => console.log("Change")} />
		</FormInput>
	</ThemeProvider>
)

export const largeTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is LG" labelId="label">
			<Text id="lgText" value="Sample text" size="lg" onChange={() => console.log("Change")} />
		</FormInput>
	</ThemeProvider>
)

export const extraLargeTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is XL" labelId="label">
			<Text id="xlText" value="Sample text" size="xl" onChange={() => console.log("Change")} />
		</FormInput>
	</ThemeProvider>
)

export const extraExtraLargeTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is XXL" labelId="label">
			<Text id="xxlText" value="Sample text" size="xxl" onChange={() => console.log("Change")} />
		</FormInput>
	</ThemeProvider>
)

export const fullTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is FULL" labelId="label">
			<Text id="fullText" value="Sample text" size="full" onChange={() => console.log("Change")} />
		</FormInput>
	</ThemeProvider>
)

export const disabledTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is a disabled input" labelId="disabledLabel" disabled>
			<Text id="disabledText" value="Sample text" onChange={() => console.log("Change")} />
		</FormInput>
	</ThemeProvider>
)

export const requiredTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput required labelText="This is a required input" labelId="requiredLabel">
			<Text id="requiredText" value="Sample text" onChange={() => console.log("Change")} />
		</FormInput>
	</ThemeProvider>
)

export const successTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is a success input" labelId="successLabel">
			<Text
				id="successText"
				value="Sample text"
				validationState="success"
				textIcon={SuccessIcon}
				onChange={() => console.log("Change")}
			/>
		</FormInput>
	</ThemeProvider>
)

export const errorTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is an error input" labelId="errorLabel">
			<Text
				id="errorText"
				value="Sample text"
				validationState="error"
				textIcon={ErrorIcon}
				errorMessage="Error message. Corrective action."
				onChange={() => console.log("Change")}
			/>
		</FormInput>
	</ThemeProvider>
)

export const leadingIconTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This input has a leading icon" labelId="leadingLabel">
			<Text
				id="leadingText"
				value="Sample text"
				textIcon={{ mdIcon: DateRangeSharp, color: "accent", alignment: IconAlignment.LEFT }}
				onChange={() => console.log("Change")}
			/>
		</FormInput>
	</ThemeProvider>
)

export const trailingIconTextBox = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This input has a trailing icon" labelId="trailingLabel">
			<Text
				id="trailingText"
				value="Sample text"
				textIcon={{
					mdIcon: Computer,
					color: "accent",
					alignment: IconAlignment.RIGHT,
				}}
				onChange={() => console.log("Change")}
			/>
		</FormInput>
	</ThemeProvider>
)

export const textBoxWithIconAction = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This input has a trailing icon" labelId="trailingLabel">
			<Text
				id="trailingText"
				value="Sample text"
				textIcon={{
					mdIcon: Clear,
					color: "doveGray",
					alignment: IconAlignment.RIGHT,
					ariaLabel: "Clear input",
					onClick: () => console.log("Clicked icon"),
				}}
				onChange={() => console.log("Change")}
			/>
		</FormInput>
	</ThemeProvider>
)
