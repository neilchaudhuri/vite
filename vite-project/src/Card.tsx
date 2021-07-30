import { PseudoBox, Box, PseudoBoxProps } from "@chakra-ui/core"
import React, { useContext } from "react"
import { responsiveGridColumns, responsiveGridEdges, responsiveSpacing } from "./Grid"

const CardContext = React.createContext({
	bodyId: "card-body",
	headerId: "card-header",
})

interface CardProps {
	id: string
	maxWidth?: string
	children: React.ReactNode
}

const c1CardProps: PseudoBoxProps = {
	fontFamily: "default",
	position: "relative" as const,
	display: "grid",
	p: responsiveSpacing,
	gridGap: responsiveGridEdges,
	gridTemplateColumns: responsiveGridColumns,
	boxShadow: "2px 2px 2px 0 rgba(0,0,0,0.2)",
	borderWidth: "px",
	borderStyle: "solid",
	borderColor: "cardBorder",
}

export const Card: React.FC<CardProps> = (p: CardProps) => {
	return (
		<CardContext.Provider
			value={{
				bodyId: `card-${p.id}-body`,
				headerId: `card-${p.id}-header`,
			}}>
			<PseudoBox as="section" {...c1CardProps} maxWidth={p.maxWidth ?? "full"}>
				<Box
					id={`card-${p.id}`}
					as="section"
					top="0"
					w="full"
					pos="relative"
					d="flex"
					flexDir="column"
					aria-describedby={`card-${p.id}-body`}
					aria-labelledby={`card-${p.id}-header`}
					gridColumn={{ base: "span 4", md: "span 8", lg: "span 12" }}>
					{p.children}
				</Box>
			</PseudoBox>
		</CardContext.Provider>
	)
}

interface CardDataProps {
	children: React.ReactNode
	width?: string
}

export const CardHeader: React.FC<CardDataProps> = (p: CardDataProps) => {
	const { headerId } = useContext(CardContext)
	return (
		<Box id={headerId} w="full" maxWidth={p.width ?? "full"} pb={responsiveSpacing} as="header">
			{p.children}
		</Box>
	)
}

export const CardBody: React.FC<CardDataProps> = (p: CardDataProps) => {
	const { bodyId } = useContext(CardContext)
	return (
		<Box id={bodyId} w="full" maxWidth={p.width ?? "full"} flex="1">
			{p.children}
		</Box>
	)
}
