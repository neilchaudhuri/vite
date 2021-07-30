import React from "react"
import { Box, Flex, ColorModeProvider, PseudoBox, Divider, LinkProps as ChakraLinkProps, useTheme } from "@chakra-ui/core"
import { ExtraFinePrint } from "./Typography"
import { Link } from "./Link"
import { Link as ChakraLink } from "@chakra-ui/core"
import { responsiveSpacing } from "./Grid"

export const Footer: React.FC = () => {
	const { zIndices } = useTheme()
	return (
		<Box
			id="footer"
			as="footer"
			pos="relative"
			zIndex={zIndices.docked}
			backgroundColor="primary"
			color="white"
			mt={{ base: 48, md: 72 }}>
			<ColorModeProvider value="dark">
				<Box
					boxSizing="border-box"
					paddingX={responsiveSpacing}
					paddingY={{ base: "32", md: "24" }}
					maxW={{ xl: "screenXl" }}
					m={{ xl: "auto" }}>
					<Box id="footer-navbar">
						<Flex
							fontWeight="h3"
							fontSize="footerLink"
							align={{ base: "flex-start", md: "baseline" }}
							direction={{ base: "column", md: "row" }}
							justify={{ base: "auto", md: "space-between" }}>
							<FooterLink href="https://www.state.gov/privacy-policy/">Privacy Policy</FooterLink>
							<Box marginTop={{ base: "20", md: "0" }}>
								<FooterLink href="https://travel.state.gov/content/travel/en/copyright-disclaimer.html">
									Copyright and Disclaimer
								</FooterLink>
							</Box>
							<Box marginTop={{ base: "20", md: "0" }}>
								<FooterLink href="https://foia.state.gov/">Freedom of Information Act (FOIA)</FooterLink>
							</Box>
							<Box marginTop={{ base: "20", md: "0" }}>
								<FooterLink href="https://www.state.gov/key-topics-office-of-civil-rights/eeo-no-fear-act-whistleblower-protection-acts/">
									No FEAR Act Data
								</FooterLink>
							</Box>
							<Box marginTop={{ base: "20", md: "0" }} display={{ base: "block", md: "none", xl: "block" }}>
								<FooterLink href="https://www.stateoig.gov/">Office of the Inspector General</FooterLink>
							</Box>
							<Box marginTop={{ base: "20", md: "0" }} display={{ base: "block", md: "none", xl: "block" }}>
								<FooterLink href="http://www.usa.gov/">USA.gov</FooterLink>
							</Box>
							<Box marginTop={{ base: "20", md: "0" }} display={{ base: "block", md: "none", xl: "block" }}>
								<FooterLink href="https://www.usa.gov/espanol/">GobiernoUSA</FooterLink>
							</Box>
						</Flex>
						<Flex
							fontWeight="h3"
							fontSize="footerLink"
							display={{ base: "none", md: "flex", xl: "none" }}
							align="baseline"
							justify={{ base: "center", md: "space-around" }}
							marginX={{ base: "0", md: "96", lg: "64" }}
							paddingTop="20">
							<FooterLink href="https://www.stateoig.gov/">Office of the Inspector General</FooterLink>
							<FooterLink href="http://www.usa.gov/">USA.gov</FooterLink>
							<FooterLink href="https://www.usa.gov/espanol/">GobiernoUSA</FooterLink>
						</Flex>
					</Box>
					<Divider borderColor="white" opacity={1} width="full" marginY="20" />
					<Flex display={{ base: "block", md: "flex" }} direction="row" justify="space-between" marginTop="24">
						<Box width={{ base: "auto", md: "55%", lg: "499px" }} id="disclaimer">
							<ExtraFinePrint color="white">
								This site is managed by the U.S. Department of State. External links to other sites should not be
								construed as an endorsement of the views or privacy policies therein. Please email{" "}
								<Link href="mailto:mytravelgov@state.gov">mytravelgov@state.gov</Link> if you are having trouble
								creating or accessing your account.
							</ExtraFinePrint>
						</Box>
						<Flex
							id="social-media"
							direction="row"
							justify={{ base: "space-between", md: "center", lg: "flex-end" }}
							align={{ base: "auto", md: "flex-start" }}
							paddingTop={{ base: "40", md: "0", lg: "0" }}
							paddingBottom={{ base: "0", lg: "40" }}
							width={{ base: "auto", xl: "50%" }}>
							<SocialMediaLink
								ariaLabel="Bureau of Consular Affairs Facebook"
								href="https://www.facebook.com/usdos/"
								label="Facebook"
								marginRight={{ base: "0", md: "36" }}>
								<SocialMediaIcon dataIcon="facebook-f" viewboxWidth={320}>
									<path
										fill="currentColor"
										d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
								</SocialMediaIcon>
							</SocialMediaLink>
							<SocialMediaLink
								ariaLabel="Bureau of Consular Affairs Twitter"
								href="https://twitter.com/travelgov/"
								label="Twitter"
								marginRight={{ base: "0", md: "36" }}>
								<SocialMediaIcon dataIcon="twitter">
									<path
										fill="currentColor"
										d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
								</SocialMediaIcon>
							</SocialMediaLink>
							<SocialMediaLink
								ariaLabel="Bureau of Consular Affairs Instagram"
								href="https://www.instagram.com/travelgov/"
								label="Instagram"
								marginRight={{ base: "0", md: "36" }}>
								<SocialMediaIcon dataIcon="instagram" viewboxWidth={448}>
									<path
										fill="currentColor"
										d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
								</SocialMediaIcon>
							</SocialMediaLink>
							<SocialMediaLink
								ariaLabel="Department of State Videos"
								href="http://www.youtube.com/user/statevideo"
								label="YouTube"
								marginRight={{ base: "0", md: "36" }}>
								<SocialMediaIcon dataIcon="youtube" viewboxWidth={576}>
									<path
										fill="currentColor"
										d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
								</SocialMediaIcon>
							</SocialMediaLink>
							<SocialMediaLink ariaLabel="Travel Advisory RSS Feed" href="https://blogs.state.gov/" label="Dipnote">
								<SocialMediaIcon dataIcon="blog" dataPrefix="fas">
									<path
										fill="currentColor"
										d="M172.2 226.8c-14.6-2.9-28.2 8.9-28.2 23.8V301c0 10.2 7.1 18.4 16.7 22 18.2 6.8 31.3 24.4 31.3 45 0 26.5-21.5 48-48 48s-48-21.5-48-48V120c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v248c0 89.5 82.1 160.2 175 140.7 54.4-11.4 98.3-55.4 109.7-109.7 17.4-82.9-37-157.2-112.5-172.2zM209 0c-9.2-.5-17 6.8-17 16v31.6c0 8.5 6.6 15.5 15 15.9 129.4 7 233.4 112 240.9 241.5.5 8.4 7.5 15 15.9 15h32.1c9.2 0 16.5-7.8 16-17C503.4 139.8 372.2 8.6 209 0zm.3 96c-9.3-.7-17.3 6.7-17.3 16.1v32.1c0 8.4 6.5 15.3 14.8 15.9 76.8 6.3 138 68.2 144.9 145.2.8 8.3 7.6 14.7 15.9 14.7h32.2c9.3 0 16.8-8 16.1-17.3-8.4-110.1-96.5-198.2-206.6-206.7z"></path>
								</SocialMediaIcon>
							</SocialMediaLink>
						</Flex>
					</Flex>
				</Box>
			</ColorModeProvider>
		</Box>
	)
}

const FooterLink: React.FC<ChakraLinkProps> = (p: ChakraLinkProps) => {
	return (
		<ChakraLink
			color="white"
			fontFamily="default"
			fontSize="footerLink"
			lineHeight="normal"
			fontWeight="normal"
			target="_blank"
			rel="noreferrer noopener"
			{...p}
		/>
	)
}

type SocialMediaLinkProps = {
	href: string
	label: string
	ariaLabel: string
} & ChakraLinkProps

const SocialMediaLink: React.FC<SocialMediaLinkProps> = p => {
	const { href, label, ariaLabel, children, ...linkProps } = p
	return (
		<FooterLink
			{...linkProps}
			href={href}
			aria-label={ariaLabel}
			display={{ base: "auto", xl: "flex" }}
			flexDirection="row"
			justifyContent="flex-end"
			alignItems="center"
			role="link">
			{children}
			<Box as="span" display={{ base: "none", xl: "inline" }} fontSize="finePrint" lineHeight="normal">
				{label}
			</Box>
		</FooterLink>
	)
}

interface SocialMediaIconProps {
	dataPrefix?: string
	dataIcon: string
	viewboxWidth?: number
	children: React.ReactElement
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = p => {
	const { dataPrefix = "fab", dataIcon, viewboxWidth = 512, children } = p
	return (
		<PseudoBox
			as="svg"
			paddingRight={{ base: "0", xl: "12" }}
			height="iconMd"
			display="inline"
			marginBottom={{ base: "4", xl: "0" }}
			aria-hidden="true"
			// @ts-ignore
			focusable="false"
			data-prefix={dataPrefix}
			data-icon={dataIcon}
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${viewboxWidth} 512`}
			_groupHover={{
				color: "accent",
			}}>
			{children}
		</PseudoBox>
	)
}
