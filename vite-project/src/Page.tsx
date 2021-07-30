import React from "react"
import { HeaderProps } from "./Header"
import { Footer } from "./Footer"
import { Grid, responsiveSpacing } from "./Grid"
import { Box, Flex, useDisclosure } from "@chakra-ui/core"
import { UseDisclosureReturn } from "@chakra-ui/core/dist/useDisclosure"
import { Omit } from "@chakra-ui/core/dist/common-types"

type PageProps = { id?: string; header: React.FC<HeaderProps>; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>

export const PageContext = React.createContext<Omit<UseDisclosureReturn, "onToggle">>({
	isOpen: false,
	onOpen: () => console.log(),
	onClose: () => console.log(),
})

export const Page: React.FC<PageProps> = p => {
	const { header, children, ...rest } = p
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { isOpen: isUserDropdownOpen, onOpen: onUserDropdownOpen, onClose: onUserDropdownClose } = useDisclosure()

	return (
		<PageContext.Provider
			value={{
				isOpen: isUserDropdownOpen,
				onOpen: onUserDropdownOpen,
				onClose: onUserDropdownClose,
			}}>
			<Flex direction="column" minH="100vh" bg="pageBackground" onClickCapture={onUserDropdownClose}>
				{header}
				<Box
					as="main"
					{...rest}
					maxW={{ xl: "screenXl" }}
					m={{ xl: "auto" }}
					p={responsiveSpacing}
					flexGrow={1}
					boxSizing="border-box"
					lineHeight="normal"
					fontFamily="body"
					fontSize="base">
					<Grid>{children}</Grid>
				</Box>
				<Footer />
			</Flex>
		</PageContext.Provider>
	)
}
