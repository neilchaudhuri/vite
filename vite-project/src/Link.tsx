import { Link as ChakraLink, useColorMode } from "@chakra-ui/core"
import * as React from "react"
import { SpaceProps, FlexboxProps } from "styled-system"
import { Omit } from "@chakra-ui/core/dist/common-types"

interface C1LinkProps {
	as?: React.ElementType
	to?: string
	onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export type LinkProps = C1LinkProps & Omit<React.HTMLProps<HTMLAnchorElement>, "as"> & SpaceProps & FlexboxProps

export const linkStyle = {
	light: {
		default: {
			color: "clickable",
			fontFamily: "default",
			textDecoration: "underline",
			lineHeight: "normal",
		},
		hover: {
			color: "secondary",
		},
		focus: {
			color: "clickable",
			outlineWidth: "1px",
			outlineStyle: "solid",
			outlineColor: "accent",
			outlineOffset: 0,
		},
		visited: {
			color: "visitedLink",
		},
	},
	dark: {
		default: {
			color: "darkBackgroundLink",
			fontFamily: "default",
			textDecoration: "underline",
			lineHeight: "normal",
		},
		hover: {
			color: "white",
		},
		focus: {
			color: "darkBackgroundLink",
			outlineWidth: "1px",
			outlineStyle: "solid",
			outlineColor: "darkBackgroundLink",
			outlineOffset: 0,
		},
		visited: {
			color: "visitedLinkDarkBackground",
		},
	},
}

export const Link: React.FC<LinkProps> = (p: LinkProps) => {
	const { children, ref, as, ...props } = p
	const { colorMode } = useColorMode()

	return (
		<ChakraLink
			{...props}
			// @ts-ignore
			as={as}
			{...linkStyle[colorMode].default}
			_hover={linkStyle[colorMode].hover}
			_focus={linkStyle[colorMode].focus}
			_visited={linkStyle[colorMode].visited}
			transition="none">
			{children}
		</ChakraLink>
	)
}
