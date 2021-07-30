import React, { useEffect, useState } from "react"
import { FormInput } from "../src/FormInput"
import { ThemeProvider } from "@chakra-ui/core"
import theme from "../theme.js"
import { Textarea } from "../src/Textarea"

export default {
	title: "Textarea",
	component: Textarea,
}

export const defaultTextarea = () => {
	const [text, setText] = useState("Sample text")
	useEffect(() => {
		console.log(`You typed this: ${text}`)
	}, [text])
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value
		setText(text)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a default textarea" labelId="defaultLabel">
				<Textarea id="defaultText" value={text} onChange={onChange} maxLength={300} />
			</FormInput>
		</ThemeProvider>
	)
}

export const smallTextarea = () => {
	const [text, setText] = useState("Sample text")
	useEffect(() => {
		console.log(`You typed this: ${text}`)
	}, [text])
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value
		setText(text)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a small textarea" labelId="smallLabel">
				<Textarea id="smallText" value={text} onChange={onChange} size="sm" maxLength={250} />
			</FormInput>
		</ThemeProvider>
	)
}

export const largeTextarea = () => {
	const [text, setText] = useState("Sample text")
	useEffect(() => {
		console.log(`You typed this: ${text}`)
	}, [text])
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value
		setText(text)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a large textarea" labelId="largeLabel">
				<Textarea id="largeText" value={text} onChange={onChange} size="lg" maxLength={500} />
			</FormInput>
		</ThemeProvider>
	)
}

export const extraLargeTextarea = () => {
	const [text, setText] = useState("Sample text")
	useEffect(() => {
		console.log(`You typed this: ${text}`)
	}, [text])
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value
		setText(text)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a XL textarea" labelId="extraLargeLabel">
				<Textarea id="extraLargeText" value={text} onChange={onChange} size="xl" maxLength={750} />
			</FormInput>
		</ThemeProvider>
	)
}

export const extraExtraLargeTextarea = () => {
	const [text, setText] = useState("Sample text")
	useEffect(() => {
		console.log(`You typed this: ${text}`)
	}, [text])
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value
		setText(text)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a XXL textarea" labelId="extraExtraLargeLabel">
				<Textarea id="extraExtraLargeText" value={text} onChange={onChange} size="xxl" maxLength={1000} />
			</FormInput>
		</ThemeProvider>
	)
}

export const fullTextarea = () => {
	const [text, setText] = useState("Sample text")
	useEffect(() => {
		console.log(`You typed this: ${text}`)
	}, [text])
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value
		setText(text)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="This is a full textarea" labelId="fullLabel">
				<Textarea id="fullText" value={text} onChange={onChange} size="full" maxLength={1000} />
			</FormInput>
		</ThemeProvider>
	)
}

export const disabledTextarea = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is a disabled textarea" labelId="disabledLabel" disabled>
			<Textarea id="disabledText" value="Sample text" onChange={() => console.log("Change")} maxLength={300} />
		</FormInput>
	</ThemeProvider>
)

export const requiredTextarea = () => (
	<ThemeProvider theme={theme}>
		<FormInput required labelText="This is a required textarea" labelId="requiredLabel">
			<Textarea id="requiredText" value="Sample text" onChange={() => console.log("Change")} maxLength={300} />
		</FormInput>
	</ThemeProvider>
)

export const successTextarea = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is a success textarea" labelId="successLabel">
			<Textarea
				id="successText"
				value="Sample text"
				validationState="success"
				onChange={() => console.log("Change")}
				maxLength={300}
			/>
		</FormInput>
	</ThemeProvider>
)

export const errorTextarea = () => (
	<ThemeProvider theme={theme}>
		<FormInput labelText="This is an error textarea" labelId="errorLabel">
			<Textarea
				id="errorText"
				value="Sample text"
				validationState="error"
				errorMessage="Error message. Corrective action."
				onChange={() => console.log("Change")}
				maxLength={300}
			/>
		</FormInput>
	</ThemeProvider>
)

export const tryItOut = args => {
	const [text, setText] = useState("Sample text")
	useEffect(() => {
		console.log(`You typed this: ${text}`)
	}, [text])
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const text = e.target.value
		setText(text)
	}
	return (
		<ThemeProvider theme={theme}>
			<FormInput labelText="Try it out" labelId="tryItOut">
				<Textarea {...args} />
			</FormInput>
		</ThemeProvider>
	)
}

tryItOut.argTypes = {
	onChange: { action: "changed" },
	id: { control: { disable: true } },
}
tryItOut.args = {
	maxLength: 100,
}
