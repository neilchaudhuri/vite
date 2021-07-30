import React from "react"
import { Grid as ChakraGrid } from "@chakra-ui/core"

interface GridProps {
	children: React.ReactNode
}

export const Grid: React.FC<GridProps> = p => {
	return (
		<ChakraGrid gap={responsiveGridEdges} templateColumns={responsiveGridColumns}>
			{p.children}
		</ChakraGrid>
	)
}

export const responsiveGridColumns = { base: "repeat(4, 1fr)", md: "repeat(8, 1fr)", lg: "repeat(12, 1fr)" }
export const responsiveGridEdges = { base: 16, md: 24 }
export const responsiveSpacing = { base: 16, md: 24 }
