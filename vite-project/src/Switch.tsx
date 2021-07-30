import { Box, ControlBox, VisuallyHidden } from "@chakra-ui/core"
import * as React from "react"
import { Omit } from "@chakra-ui/core/dist/common-types"

export type SwitchProps<T = HTMLInputElement> = {
	id: string
	value?: string | number
	errorMessage?: string
} & Omit<React.InputHTMLAttributes<T>, "size" | "children" | "readOnly" | "type" | "value" | "defaultValue">

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(p: SwitchProps, ref) {
	const { errorMessage, ...input } = p
	const stylesProps = {
		width: "48px",
		height: "24px",
		bg: "inputBorder",
		borderRadius: "12px",
		justifyContent: "flex-start",
		position: "relative" as const,
		_checked: {
			bg: "clickable",
		},
		_child: {
			transform: `translateX(0)`,
		},
		_checkedAndChild: {
			transform: `translateX(calc(26px))`,
		},
		_focus: {
			outlineWidth: "1px",
			outlineStyle: "dashed",
			outlineColor: "accent",
		},
		_hover: {
			cursor: "pointer",
		},
		_checkedAndHover: {
			cursor: "pointer",
		},
		_disabled: {
			bg: "disabledBackground",
			cursor: "default",
		},
		_checkedAndDisabled: {
			bg: "disabledBackground",
			cursor: "default",
		},
		transition: "none",
	}

	return (
		<Box as="label" display="inline-block" mt="12">
			<VisuallyHidden
				{...input}
				ref={ref}
				as="input"
				// @ts-ignore
				type="checkbox"
			/>
			<ControlBox {...stylesProps}>
				<Box bg="white" size="14px" position="absolute" left="5px" bottom="5px" transition="0.4s" borderRadius="12px" />
			</ControlBox>
		</Box>
	)
})
