import {
	PseudoBox,
	ModalOverlay,
	Modal as ChakraModal,
	ModalHeader,
	ModalContent as ChakraModalContent,
	ModalBody,
	ModalFooter,
	IModal,
	Flex,
	Box,
} from "@chakra-ui/core"
import * as React from "react"
import { CloseSharp } from "@material-ui/icons"
import { motion } from "framer-motion"
import { H4 } from "./Typography"
import { Button, ButtonSize } from "./Button"
import { LinkButton } from "./LinkButton"
import { Grid, responsiveSpacing } from "./Grid"

export type ModalSize = "sm" | "md" | "lg"

interface ResponsiveDimensions {
	base: string
	md: string
}

interface ModalDimensions {
	w: ResponsiveDimensions
	h?: ResponsiveDimensions
	maxHeight?: string
}

type ResponsiveModal = {
	[key in ModalSize]: ModalDimensions
}

const responsiveModal: ResponsiveModal = {
	sm: {
		w: { base: "300px", md: "360px" },
	},
	md: {
		w: { base: "300px", md: "420px" },
	},
	lg: {
		w: { base: "100vw", md: "480px" },
		h: { base: "100vh", md: "600px" },
	},
}

type OnClose = IModal["onClose"]

interface C1IModal {
	container?: React.RefObject<HTMLElement>
	initialFocusRef?: React.RefObject<HTMLElement>
	finalFocusRef?: React.RefObject<HTMLElement>
	isOpen?: boolean
	onCloseX: IModal["onClose"]
	children: React.ReactNode
	size?: ModalSize
	returnFocusOnClose?: boolean
	id?: string
	closeOnOverlayClick?: boolean
	closeOnEsc?: boolean
}

interface IModalContent {
	onClick?: React.KeyboardEventHandler<HTMLElement>
	children: React.ReactNode
}

type ModalContentProps = IModalContent & C1IModal

type OmittedMotionProps = "transition" | "style" | "onDrag"

interface Footer {
	secondaryButton: {
		text: string
		onClick: () => void
	}
	primaryButton: {
		text: string
		size?: ButtonSize
		onClick: () => void
	}
}

//@ts-ignore
const ModalMotion = motion.custom<Omit<ModalContentProps, OmittedMotionProps>>(ChakraModalContent)
type ModalMotionProps = React.ComponentProps<typeof ModalMotion> & { title: string } & { footer?: Footer }

export const Modal: React.FC<ModalMotionProps> = (p: ModalMotionProps) => {
	const size = p.size ?? "md"
	const closeOnEsc = p.closeOnEsc ?? true
	const closeOnOverlayClick = p.closeOnOverlayClick ?? true
	const modalProps = {
		container: p.container,
		initialFocusRef: p.initialFocusRef,
		finalFocusRef: p.finalFocusRef,
		isOpen: p.isOpen,
		returnFocusOnClose: p.returnFocusOnClose,
		id: p.id,
		closeOnEsc: closeOnEsc,
		closeOnOverlayClick: closeOnOverlayClick,
		isCentered: true,
	}

	const contentProps = {
		...responsiveModal[size],
		boxShadow: "0 0px 24px 0 rgba(0,0,0,0.3)",
		backgroundColor: "white",
		boxSizing: "border-box",
		m: "auto",
		p: responsiveSpacing,
		zIndex: "modal",
		overflow: "hidden",
		position: "relative",
		onClick: p.onClick,
	}
	const motionProps = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		transition: {
			duration: 0.2,
			ease: "easeInOut",
		},
	}

	const modalStyle = {
		fontFamily: "default",
		color: "text",
		fontSize: "base",
		fontWeight: "normal",
		lineHeight: "normal",
	}

	return (
		<ChakraModal {...modalProps}>
			<ModalOverlay backgroundColor="rgba(0,0,0,0.6)" />
			<ModalMotion
				{...contentProps}
				{...modalStyle}
				{...motionProps}
				// @ts-ignore
				marginY={0}>
				<ModalHeader mb={responsiveSpacing} px={0} py={0}>
					<Flex align="top" justify="space-between">
						<H4>{p.title}</H4>
						{p.onCloseX && <ModalCloseButton onClose={p.onCloseX} />}
					</Flex>
				</ModalHeader>
				<ModalBody mb={responsiveSpacing} px={0} py={0}>
					<Grid>{p.children}</Grid>
				</ModalBody>
				{p.footer && (
					<ModalFooter px={0} py={0}>
						<LinkButton onClick={p.footer.secondaryButton.onClick} mr={responsiveSpacing}>
							{p.footer.secondaryButton.text}
						</LinkButton>
						<Button size={p.footer.primaryButton.size ?? "sm"} onClick={p.footer?.primaryButton.onClick}>
							{p.footer.primaryButton.text}
						</Button>
					</ModalFooter>
				)}
			</ModalMotion>
		</ChakraModal>
	)
}

interface CloseButtonProps {
	onClose: OnClose
}

export const ModalCloseButton: React.FC<CloseButtonProps> = p => {
	const props = {
		as: "button" as const,
		display: "flex",
		bg: "white",
		border: "none",
		p: 0,
		verticalAlign: "middle" as const,
		onClick: p.onClose,
		cursor: "pointer",
		color: "label",
		_focus: {
			outline: "none",
		},
	}
	return (
		<PseudoBox {...props}>
			<Box as={CloseSharp} size="iconMd" transform="scale(1.15)" />
		</PseudoBox>
	)
}
