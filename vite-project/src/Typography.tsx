import React from "react"
import { Text, BoxProps } from "@chakra-ui/core"

type TypographyProps = BoxProps & {
	children?: React.ReactNode
	color?: string
}

const largeHeadingStyles = {
	fontFamily: "headingLarge",
	color: "headingLarge",
	margin: 0,
	lineHeight: "normal",
}

const smallHeadingStyles = {
	fontFamily: "headingSmall",
	color: "headingSmall",
	margin: 0,
	lineHeight: "normal",
}

export const H1: React.FC<TypographyProps> = (p: TypographyProps) => {
	const { color, children, gridColumn = "1 / -1", ...boxProps } = p

	return (
		<Text
			{...boxProps}
			{...largeHeadingStyles}
			gridColumn={gridColumn}
			fontSize={["32px", "32px", "32px", "40px"]}
			fontWeight="h1"
			color={color ? color : largeHeadingStyles.color}
			as="h1">
			{children}
		</Text>
	)
}

export const H2: React.FC<TypographyProps> = (p: TypographyProps) => {
	const { color, children, gridColumn = "1 / -1", ...boxProps } = p

	return (
		<Text
			{...boxProps}
			{...largeHeadingStyles}
			gridColumn={gridColumn}
			fontSize={["24px", "24px", "24px", "32px"]}
			fontWeight="h2"
			color={color ? color : largeHeadingStyles.color}
			as="h2">
			{children}
		</Text>
	)
}

export const H3: React.FC<TypographyProps> = (p: TypographyProps) => {
	const { color, children, gridColumn = "1 / -1", ...boxProps } = p
	return (
		<Text
			{...boxProps}
			{...smallHeadingStyles}
			gridColumn={gridColumn}
			fontSize={["16px", "16px", "16px", "18px"]}
			fontWeight="h3"
			color={color ? color : smallHeadingStyles.color}
			as="h3">
			{children}
		</Text>
	)
}

export const H4: React.FC<TypographyProps> = (p: TypographyProps) => {
	const { color, children, gridColumn = "1 / -1", ...boxProps } = p
	return (
		<Text
			{...boxProps}
			{...smallHeadingStyles}
			gridColumn={gridColumn}
			fontSize="h4"
			fontWeight="h4"
			color={color ? color : smallHeadingStyles.color}
			as="h4">
			{children}
		</Text>
	)
}

export const P: React.FC<TypographyProps> = (p: TypographyProps) => {
	const { color, children, gridColumn = "1 / -1", ...boxProps } = p

	return (
		<Text
			{...boxProps}
			gridColumn={gridColumn}
			fontFamily="default"
			color={color ? color : "text"}
			fontSize="base"
			fontWeight="normal"
			lineHeight="normal"
			margin={0}
			as="p">
			{children}
		</Text>
	)
}

export const BigText: React.FC<TypographyProps> = (p: TypographyProps) => {
	const { children, ...rest } = p
	return (
		<P {...rest} w="72%">
			{children}
		</P>
	)
}

export const FinePrint: React.FC<TypographyProps> = (p: TypographyProps) => {
	const { color, children, gridColumn = "1 / -1", ...boxProps } = p
	return (
		<Text
			{...boxProps}
			gridColumn={gridColumn}
			fontFamily="default"
			color={color ? color : "text"}
			fontSize="finePrint"
			fontWeight="normal"
			lineHeight="normal"
			margin={0}
			as="p">
			{children}
		</Text>
	)
}

export const ExtraFinePrint: React.FC<TypographyProps> = (p: TypographyProps) => {
	const { color, children, gridColumn = "1 / -1", ...boxProps } = p
	return (
		<Text
			{...boxProps}
			gridColumn={gridColumn}
			fontFamily="default"
			color={color ? color : "text"}
			fontSize="extraFinePrint"
			fontWeight="normal"
			lineHeight="normal"
			margin={0}
			as="p">
			{children}
		</Text>
	)
}

export const Label: React.FC<TypographyProps> = (p: TypographyProps) => {
	const { color, children, gridColumn = "1 / -1", ...boxProps } = p
	return (
		<Text
			{...boxProps}
			gridColumn={gridColumn}
			fontFamily="body"
			fontSize="label"
			fontWeight="normal"
			pb={0}
			color="label"
			display="block"
			lineHeight="label"
			as="label">
			{children}
		</Text>
	)
}
