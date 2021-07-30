import React, { MouseEventHandler } from "react"
import { Tag, TagLabel, useTheme, Box, PseudoBox } from "@chakra-ui/core"
import SvgIcon from "@material-ui/core/SvgIcon"
import { Cancel } from "@material-ui/icons"

interface ChipAction {
	onClick: MouseEventHandler<SVGElement>
	isFilter?: boolean
}

interface ChipProps {
	children: React.ReactText
	leadingIcon?: typeof SvgIcon
	action?: ChipAction
	disabled?: boolean
}

export const Chip: React.FC<ChipProps> = (p: ChipProps) => {
	const theme = useTheme()
	const disabled = p.disabled ?? false
	const isAction = (p.action && !p.action.isFilter) ?? false
	const isFilter = p.action?.isFilter ?? false
	const styles = {
		default: {
			color: "clickable",
			bg: "white",
			border: "none",
			// @ts-ignore
			boxShadow: `0 0 0 1px ${theme.colors.chipBorder as string}`,
		},
		hoverFocus: {
			// @ts-ignore
			boxShadow: `0 0 0 2px ${theme.colors.accent as string}`,
		},
		active: { color: "white", bg: "clickable" },
		disabled: {
			color: "disabledChipText",
			bg: "disabledBackground",
			border: "none",
			// @ts-ignore
			boxShadow: `0 0 0 1px ${theme.colors.disabledBorder as string}`,
		},
	}
	const actionProps = {
		"as": "button",
		"type": "button",
		"cursor": disabled ? "default" : "pointer",
		"onClick": p.action?.onClick,
		"disabled": disabled,
		"aria-disabled": disabled ? disabled : undefined,
		"_hover": disabled ? undefined : styles.hoverFocus,
		"_focus": disabled ? undefined : { outline: "none", ...styles.hoverFocus },
		"_active": disabled ? undefined : styles.active,
	}
	const currentStyle = disabled ? styles.disabled : styles.default
	const iconOutline = {
		// @ts-ignore
		outline: `1px dashed ${theme.colors.accent as string}`,
	}

	return (
		// @ts-ignore
		<Tag
			{...currentStyle}
			{...(isAction ? actionProps : undefined)}
			borderRadius="chip"
			fontFamily="default"
			h="chip"
			fontSize="finePrint"
			px={8}>
			{p.leadingIcon && <Box as={p.leadingIcon} size="iconMd" ml={4} mr={4} />}
			<TagLabel ml={p.leadingIcon ? 4 : 12} mr={isFilter ? 4 : 12}>
				{p.children}
			</TagLabel>
			{isFilter && (
				<PseudoBox
					color="inherit"
					as="button"
					// @ts-ignore
					type="button"
					display="inline-flex"
					alignItems="center"
					bg="inherit"
					border="none"
					p={0}
					ml={4}
					mr={4}
					cursor={disabled ? "default" : "pointer"}
					aria-label="Remove filter"
					onClick={disabled ? undefined : p.action?.onClick}
					_focus={disabled ? { outline: "none" } : iconOutline}
					_hover={disabled ? undefined : iconOutline}
					_active={disabled ? undefined : iconOutline}>
					<Box as={Cancel} size="iconMd" />
				</PseudoBox>
			)}
		</Tag>
	)
}

export default Chip
