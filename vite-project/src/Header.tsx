import React, { useContext, ComponentProps, MouseEventHandler } from "react"
import { Omit } from "@chakra-ui/core/dist/common-types"
import {
	Box,
	Flex,
	ColorModeProvider,
	Grid,
	PseudoBox,
	Divider,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	useDisclosure,
	useTheme,
	Link as ChakraLink,
	PseudoBoxProps,
	BoxProps,
} from "@chakra-ui/core"
import { MenuSharp, AccountCircleSharp, CloseSharp, ArrowDropDownSharp } from "@material-ui/icons"
import { motion, AnimatePresence } from "framer-motion"
import { H2, H3, P } from "./Typography"
import DosSeal from "../assets/dos_seal.svg"
import ReactSvgComponent from "*.svg"
import { Nav } from "./SemanticHtml"
import { Alerts } from "./Alert"
import { responsiveSpacing } from "./Grid"
import { PageContext } from "./Page"

type OmittedMotionProps = "transition" | "style"

type DrawerContentProps = ComponentProps<typeof DrawerContent>
const MotionDrawerContent = motion.custom<Omit<DrawerContentProps, OmittedMotionProps>>(DrawerContent)

interface NavbarLink {
	label: string
	href?: string
	onClick?: MouseEventHandler
}

/**
 * Link that contains sub-links in the mobile menu.
 *
 * `onClick` and `href` will not be processed in the mobile menu
 * as clicking only triggers display of sub-links.
 * Instead, only sub-links will be
 */
interface NavbarLinkGroup {
	label: string
	href?: string
	onClick?: MouseEventHandler
	subLinks: NavbarLink[]
}

interface AuthenticatedUser {
	name: string
	changePassword: React.MouseEventHandler<HTMLAnchorElement>
	editAccount: React.MouseEventHandler<HTMLAnchorElement>
	signOut: React.MouseEventHandler<HTMLAnchorElement>
}

interface UnauthenticatedUser {
	createAccount: React.MouseEventHandler<HTMLAnchorElement>
	signIn: React.MouseEventHandler<HTMLAnchorElement>
}

function isAuthenticated(user: UnauthenticatedUser | AuthenticatedUser): user is AuthenticatedUser {
	return (user as AuthenticatedUser).name !== undefined
}

const UnauthenticatedUserDisplay: React.FC<UnauthenticatedUser> = p => {
	const { createAccount, signIn } = p
	return (
		<Flex gridColumn="4 / span 2" justify="flex-end" align="center">
			<HeaderLink onClick={signIn}>
				<Flex align="center">
					<Box as={AccountCircleSharp} marginRight="8" />
					Sign In
				</Flex>
			</HeaderLink>
			<Divider orientation="vertical" borderColor="white" marginX="12" marginY={0} opacity={1} height="21px" />
			<HeaderLink onClick={createAccount}>Create Account</HeaderLink>
		</Flex>
	)
}

const BoxMotion = motion.custom<Omit<BoxProps, "transition" | "style">>(Box)

const AuthenticatedUserDisplay: React.FC<AuthenticatedUser> = p => {
	const { isOpen, onOpen, onClose } = useContext(PageContext)
	const { name, editAccount, changePassword, signOut } = p
	const userLinkStyles: PseudoBoxProps = {
		display: "flex",
		alignItems: "center",
		m: 0,
		px: 12,
		h: 48,
		_hover: {
			bg: "clickable",
			color: "white",
		},
	}

	const zIndexDisplay = 1

	const openedPosition = "translateY(0%)"
	const closedPosition = "translateY(-100%)"

	const menuContainerMotion = {
		hidden: {
			opacity: 0,
			zIndex: -1,
			transition: {
				when: "afterChildren",
			},
		},
		visible: {
			opacity: 1,
			zIndex: zIndexDisplay,
			transition: {
				when: "beforeChildren",
			},
		},
	}

	const menuMotion = {
		hidden: {
			transform: closedPosition,
			transition: {
				type: "tween",
				duration: 0.25,
				ease: "easeInOut",
			},
		},
		visible: {
			transform: openedPosition,
			transition: {
				type: "tween",
				duration: 0.25,
				ease: "easeInOut",
			},
		},
	}

	return (
		<Box gridColumn="4 / span 2" pos="relative">
			<Flex justify="flex-end" align="center">
				<PseudoBox
					as="button"
					// @ts-ignore
					type="button"
					aria-label={`Open account menu for ${name}`}
					background="none"
					border="none"
					margin={0}
					padding={0}
					color="inherit"
					cursor="pointer"
					display="flex"
					alignItems="center"
					fontFamily="default"
					onClick={isOpen ? onClose : onOpen}
					_hover={{ textDecoration: "underline" }}
					_focus={{
						// @ts-ignore
						outline: "none",
					}}>
					<Box as={AccountCircleSharp} marginRight="8" />
					{name}
					<Box as={ArrowDropDownSharp} transform="scale(1.3)" />
				</PseudoBox>
			</Flex>
			<BoxMotion
				position="absolute"
				right="5px"
				overflowY="hidden"
				variants={menuContainerMotion}
				initial={false}
				animate={isOpen ? "visible" : "hidden"}>
				{
					<BoxMotion
						m={0}
						bg="white"
						color="text"
						fontFamily="default"
						fontSize="base"
						border="px"
						borderColor="inputBorder"
						boxSizing="border-box"
						variants={menuMotion}>
						<PseudoBox {...userLinkStyles}>
							<P color="inherit" onClick={editAccount}>
								Edit Account
							</P>
						</PseudoBox>
						<PseudoBox {...userLinkStyles}>
							<P color="inherit" onClick={changePassword}>
								Change Password
							</P>
						</PseudoBox>
						<Divider borderColor="headerDivider" margin={0} opacity={1} />
						<PseudoBox {...userLinkStyles}>
							<P color="inherit" onClick={signOut}>
								Sign Out
							</P>
						</PseudoBox>
					</BoxMotion>
				}
			</BoxMotion>
		</Box>
	)
}

const MobileUnauthenticatedUserDisplay: React.FC<UnauthenticatedUser> = p => {
	const { createAccount, signIn } = p
	return (
		<Flex flexDirection="column">
			<MobileLink onClick={signIn}>
				<Box as={AccountCircleSharp} marginRight="8" />
				Sign In
			</MobileLink>
			<MobileLink onClick={createAccount}>Create Account</MobileLink>
		</Flex>
	)
}

const MobileAuthenticatedUserDisplay: React.FC<AuthenticatedUser> = p => {
	const { name, editAccount, changePassword, signOut } = p
	return (
		<>
			<Flex flexDirection="column">
				<Flex align="center" paddingX={responsiveSpacing} height="headerMobileMenu">
					<Box as={AccountCircleSharp} marginRight="8" />
					<P>{name}</P>
				</Flex>
			</Flex>
			<MobileLink onClick={editAccount}>Edit Account</MobileLink>
			<MobileLink onClick={changePassword}>Change Password</MobileLink>
			<MobileLink onClick={signOut}>Sign Out</MobileLink>
		</>
	)
}

export interface HeaderProps {
	/**
	 * Displayed link name
	 */
	siteName?: string
	/**
	 * List of header links.
	 *
	 * Use {@interface NavbarLinkGroup} for links that
	 * have sub-links in the mobile menu
	 */
	navbarLinks?: (NavbarLink | NavbarLinkGroup)[]
	logo?: typeof ReactSvgComponent
	user: AuthenticatedUser | UnauthenticatedUser
	alerts?: typeof Alerts
}

export const Header: React.FC<HeaderProps> = p => {
	const { siteName = "MyTravelGov", navbarLinks, user, logo = DosSeal, alerts } = p
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { isOpen: isMobileMenuOpen, onOpen: onMobileMenuOpen, onClose: onMobileMenuClose } = useDisclosure()
	const { zIndices, colors } = useTheme()
	const userDisplay = isAuthenticated(user) ? <AuthenticatedUserDisplay {...user} /> : <UnauthenticatedUserDisplay {...user} />

	return (
		<Box as="header" pos="relative" zIndex={zIndices.docked} backgroundColor="primary" id="header" fontFamily="default">
			{alerts}
			<ColorModeProvider value="dark">
				<Flex
					justify={{ lg: "space-between" }}
					color="white"
					maxW={{ xl: "screenXl" }}
					m={{ xl: "auto" }}
					boxShadow={{ base: "0px 4px 4px rgba(0, 0, 0, 0.3)", lg: "none" }}>
					<Flex alignSelf="center" display={{ base: "flex", lg: "none" }} paddingLeft={responsiveSpacing}>
						<PseudoBox
							as="button"
							// @ts-ignore
							type="button"
							aria-label="Open menu"
							background="none"
							border="none"
							margin={0}
							padding={0}
							color="inherit"
							cursor="pointer"
							display="inline-flex"
							onClick={onMobileMenuOpen}
							_hover={{
								textDecoration: "underline",
							}}
							_focus={{
								// @ts-ignore
								outline: `1px solid ${colors.accent as string}`,
							}}>
							<Box as={MenuSharp} size="iconMenu" />
						</PseudoBox>
					</Flex>
					<Flex align="center">
						<Box
							padding={responsiveSpacing}
							as={logo}
							role="presentation"
							size={{ base: "iconSealSm", md: "iconSealLg" }}
						/>
						<H2 color="white" display={{ base: "none", md: "block" }}>
							{siteName}
						</H2>
					</Flex>
					<Grid
						id="header-navbar"
						as="nav"
						aria-label="primary"
						display={{ base: "none", lg: "grid" }}
						alignSelf="flex-end"
						templateColumns="repeat(5,auto)"
						autoRows="min-content"
						columnGap="24"
						rowGap="28"
						paddingRight="24"
						paddingBottom="24"
						fontSize="headerLink">
						<HeaderLink href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html">
							Travel Advisories
						</HeaderLink>
						<HeaderLink href="https://travel.state.gov/content/travel/en/News/newsroom.html">Newsroom</HeaderLink>
						<HeaderLink href="https://travel.state.gov/content/travel/en/about-us.html">About Us</HeaderLink>
						<Box gridColumn="auto / span 2">
							<HeaderLink href="http://www.usembassy.gov/">Find U.S. Embassies &amp; Consulates</HeaderLink>
						</Box>
						{userDisplay}
					</Grid>
				</Flex>
			</ColorModeProvider>
			<Nav
				id="navbar"
				aria-label="secondary"
				display={{ base: "none", lg: "block" }}
				backgroundColor="white"
				boxShadow="0px 4px 4px rgba(0, 0, 0, 0.3)">
				<Flex
					boxSizing="border-box"
					justify="space-between"
					align="center"
					textTransform="uppercase"
					paddingX="24"
					paddingY="12"
					maxW={{ xl: "screenXl" }}
					m={{ xl: "auto" }}>
					{navbarLinks && <NavbarLinks links={navbarLinks} />}
				</Flex>
			</Nav>
			<MobileMenu
				siteName={siteName}
				isOpen={isMobileMenuOpen}
				links={navbarLinks}
				onClose={onMobileMenuClose}
				logo={logo}
				user={user}
			/>
		</Box>
	)
}

interface MobileMenuProps {
	siteName: string
	user: AuthenticatedUser | UnauthenticatedUser
	isOpen: boolean
	links: HeaderProps["navbarLinks"]
	logo: typeof ReactSvgComponent
	onClose: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = (p: MobileMenuProps) => {
	const { links, siteName, isOpen, logo, user, onClose } = p
	const { colors } = useTheme()
	const userDisplay = isAuthenticated(user) ? (
		<MobileAuthenticatedUserDisplay {...user} />
	) : (
		<MobileUnauthenticatedUserDisplay {...user} />
	)

	const drawerMotionProps = {
		initial: { transform: `translateX(${isOpen ? "-100%" : "100%"})` },
		animate: { transform: `translateX(${isOpen ? "0%" : "-100%"})` },
		exit: { transform: "translateX(100%)" },
		transition: {
			type: "tween",
			duration: 0.3,
			ease: "easeInOut",
		},
	}
	return (
		<Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full" blockScrollOnMount={false} scrollBehavior="inside">
			<DrawerOverlay backgroundColor="rgba(0, 0, 0, 0.6)" />
			<AnimatePresence>
				<MotionDrawerContent width={{ md: "372px" }} {...drawerMotionProps}>
					<ColorModeProvider value="dark">
						<Box backgroundColor="primary" color="white" padding={responsiveSpacing} fontFamily="default">
							<Flex>
								<Box
									as={logo}
									role="presentation"
									paddingRight={responsiveSpacing}
									size={{ base: "iconSealSm", md: "iconSealLg" }}
								/>
								<Box alignSelf="center" flexGrow={1}>
									<H2 color="white">{siteName}</H2>
								</Box>
								<PseudoBox
									as="button"
									// @ts-ignore
									type="button"
									aria-label="Close menu"
									background="none"
									border="none"
									margin={0}
									marginRight={-8}
									marginTop={-8}
									padding={0}
									color="inherit"
									cursor="pointer"
									display="inline-flex"
									onClick={() => p.onClose()}
									_hover={{
										textDecoration: "underline",
									}}
									_focus={{
										// @ts-ignore
										outline: `1px solid ${colors.accent as string}`,
									}}
									alignSelf="flex-start">
									<Box as={CloseSharp} size="iconMenu" />
								</PseudoBox>
							</Flex>
						</Box>
					</ColorModeProvider>
					<Box backgroundColor="white" fontFamily="default">
						<Flex align="center" paddingX={responsiveSpacing} height="input">
							<H3>Welcome</H3>
						</Flex>
						{userDisplay}
						<Divider borderColor="headerDivider" marginX={0} marginTop={12} opacity={1} />
						<Flex align="center" paddingX={responsiveSpacing} height="input">
							<H3>{siteName}</H3>
						</Flex>
						{links &&
							links.map((link, index) => {
								return (
									<MobileLink key={`${link.label}.${index}`} href={link.href} onClick={link.onClick}>
										{link.label}
									</MobileLink>
								)
							})}

						<Divider borderColor="headerDivider" marginX={0} marginTop={12} opacity={1} />

						<Flex align="center" paddingX={responsiveSpacing} height="input">
							<H3>Popular Links</H3>
						</Flex>
						<MobileLink href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html">
							Travel Advisories
						</MobileLink>
						<MobileLink href="https://travel.state.gov/content/travel/en/News/newsroom.html">Newsroom</MobileLink>
						<MobileLink href="https://travel.state.gov/content/travel/en/about-us.html">About Us</MobileLink>
						<MobileLink href="http://www.usembassy.gov/">Find U.S. Embassies &amp; Consulates</MobileLink>
					</Box>
				</MotionDrawerContent>
			</AnimatePresence>
		</Drawer>
	)
}

// Link styles

interface HeaderLinkProps {
	href?: string
	onClick?: MouseEventHandler
	children: React.ReactNode
}

const HeaderLink: React.FC<HeaderLinkProps> = (p: HeaderLinkProps) => {
	const { children, ...linkProps } = p

	return (
		<ChakraLink color="white" target="_blank" rel="noreferrer noopener" {...linkProps}>
			{children}
		</ChakraLink>
	)
}

interface NavbarLinksProps {
	links: (NavbarLink | NavbarLinkGroup)[]
}

const NavbarLinks: React.FC<NavbarLinksProps> = p => {
	const { children, ...linkProps } = p
	const { colors } = useTheme()

	return (
		<>
			{p.links.map((link, index) => {
				return (
					<ChakraLink
						key={`${link.label}.${index}`}
						href={link.href}
						onClick={link.onClick}
						fontSize="navbarLink"
						fontWeight="h3"
						lineHeight="normal"
						textTransform="uppercase"
						textDecor="none"
						color="primary"
						paddingY="4"
						borderBottomWidth="3"
						borderColor="transparent"
						borderBottomStyle="solid"
						marginBottom="-3px"
						_hover={{
							borderBottomColor: "accent",
						}}
						_focus={{
							// @ts-ignore
							outline: `1px solid ${colors.accent as string}`,
						}}
						// @ts-ignore
						target="_blank"
						rel="noreferrer noopener"
						{...linkProps}>
						{link.label}
					</ChakraLink>
				)
			})}
		</>
	)
}

interface MobileLinkProps {
	href?: string
	onClick?: MouseEventHandler
	children: React.ReactNode
}

const MobileLink: React.FC<MobileLinkProps> = p => {
	const { children, ...linkProps } = p

	return (
		<ChakraLink
			color="clickable"
			lineHeight="normal"
			display="flex"
			height="input"
			alignItems="center"
			paddingX={responsiveSpacing}
			_hover={{
				textDecoration: "none",
				backgroundColor: "clickable",
				color: "white",
			}}
			_focus={{
				textDecoration: "none",
			}}
			_active={{
				backgroundColor: "clickable",
				color: "white",
			}}
			transition="none"
			{...linkProps}>
			{children}
		</ChakraLink>
	)
}
