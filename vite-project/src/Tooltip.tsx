import { BoxProps, Tooltip as ChakraToolTip } from "@chakra-ui/core"
import * as React from "react"
import { PopperProps } from "@chakra-ui/core/dist/Popper"
import { FC } from "react"

interface TooltipProps {
	text: string
	alignment?: "left" | "right" | "center"
	ariaLabel?: string
}

export const Tooltip: FC<TooltipProps> = p => {
	let alignment: PopperProps["placement"]
	if (p.alignment === "left") {
		alignment = "bottom-start"
	} else if (p.alignment === "right") {
		alignment = "bottom-end"
	} else {
		alignment = "bottom"
	}
	const style: BoxProps = {
		color: "white",
		fontSize: "tooltip",
		bg: "tooltipBackground",
		p: "8",
		border: "px",
		borderColor: "tooltipBorder",
		fontFamily: "default",
		lineHeight: "tooltip",
	}

	return (
		<ChakraToolTip
			hasArrow={true}
			showDelay={100}
			hideDelay={500}
			aria-label={p.ariaLabel ?? p.text}
			placement={alignment}
			label={p.text}
			{...style}>
			{p.children}
		</ChakraToolTip>
	)
}
