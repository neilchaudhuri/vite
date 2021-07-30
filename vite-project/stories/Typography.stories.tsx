import React from "react"
import { ThemeProvider } from "@chakra-ui/core"
import { H1, H2, H3, H4, P, FinePrint, ExtraFinePrint, Label, BigText } from "../src/Typography"
import theme from "../theme.js"

export default {
	title: "Typography Components",
}

export const heading1 = () => (
	<ThemeProvider theme={theme}>
		<H1>Heading 1</H1>
	</ThemeProvider>
)

export const heading2 = () => (
	<ThemeProvider theme={theme}>
		<H2>Heading 2</H2>
	</ThemeProvider>
)

export const heading3 = () => (
	<ThemeProvider theme={theme}>
		<H3>Heading 3</H3>
	</ThemeProvider>
)

export const heading4 = () => (
	<ThemeProvider theme={theme}>
		<H4>Heading 4</H4>
	</ThemeProvider>
)

export const paragraph = () => (
	<ThemeProvider theme={theme}>
		<P>Paragraph</P>
	</ThemeProvider>
)

export const bigText = () => (
	<ThemeProvider theme={theme}>
		<BigText>
			Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
			standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
			type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
			essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
			passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
		</BigText>
	</ThemeProvider>
)

export const label = () => (
	<ThemeProvider theme={theme}>
		<Label>Label</Label>
	</ThemeProvider>
)

export const finePrint = () => (
	<ThemeProvider theme={theme}>
		<FinePrint>Contextual Fine Print</FinePrint>
	</ThemeProvider>
)

export const extraFinePrint = () => (
	<ThemeProvider theme={theme}>
		<ExtraFinePrint>Extra Fine Print</ExtraFinePrint>
	</ThemeProvider>
)
