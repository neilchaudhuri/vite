import * as React from "react"
import { Box, BoxProps, Flex, FlexProps as ChakraFlexProps } from "@chakra-ui/core"
import { Grid } from "./Grid"

type CommonProps = { id?: string; gridColumn?: string; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement> &
	React.RefAttributes<HTMLDivElement>

type DivProps = CommonProps & BoxProps

type FlexProps = CommonProps & ChakraFlexProps

export const Section = React.forwardRef<HTMLDivElement, DivProps>(function Section(p, ref) {
	const { children, gridColumn = "1 / -1", ...rest } = p
	return (
		<Box as="section" {...rest} fontFamily="default" gridColumn={gridColumn} ref={ref}>
			{children}
		</Box>
	)
})

export const SectionFlex = React.forwardRef<HTMLDivElement, FlexProps>(function Section(p, ref) {
	const { children, gridColumn = "1 / -1", ...rest } = p
	return (
		<Flex as="section" {...rest} fontFamily="default" gridColumn={gridColumn} ref={ref}>
			{children}
		</Flex>
	)
})

export const SectionGrid = React.forwardRef<HTMLDivElement, DivProps>(function Section(p, ref) {
	const { children, gridColumn = "1 / -1", ...rest } = p
	return (
		<Box as="section" {...rest} gridColumn={gridColumn} ref={ref}>
			<Grid>{children}</Grid>
		</Box>
	)
})

export const Nav = React.forwardRef<HTMLDivElement, DivProps>(function Nav(p, ref) {
	const { children, gridColumn = "1 / -1", ...rest } = p
	return (
		<Box as="nav" {...rest} fontFamily="default" gridColumn={gridColumn} ref={ref}>
			{children}
		</Box>
	)
})

export const NavFlex = React.forwardRef<HTMLDivElement, FlexProps>(function Nav(p, ref) {
	const { children, gridColumn = "1 / -1", ...rest } = p
	return (
		<Flex as="nav" {...rest} fontFamily="default" gridColumn={gridColumn} ref={ref}>
			{children}
		</Flex>
	)
})

export const NavGrid = React.forwardRef<HTMLDivElement, FlexProps>(function Section(p, ref) {
	const { children, gridColumn = "1 / -1", ...rest } = p
	return (
		<Box as="nav" {...rest} gridColumn={gridColumn} ref={ref}>
			<Grid>{children}</Grid>
		</Box>
	)
})

type FormProps = { id?: string; gridColumn?: string; children: React.ReactNode } & BoxProps &
	React.HTMLAttributes<HTMLFormElement> &
	React.RefAttributes<HTMLFormElement>

export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(p, ref) {
	const { children, gridColumn = "1 / -1", ...rest } = p
	return (
		<Box as="form" {...rest} fontFamily="default" gridColumn={gridColumn} ref={ref}>
			<Grid>{children}</Grid>
		</Box>
	)
})
