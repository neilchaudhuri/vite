import React from "react"
import { Badge as ChakraBadge, Box } from "@chakra-ui/core"
import { NotificationsSharp } from "@material-ui/icons"
import { Icon } from "./Icon"

interface BadgeProps {
	count?: number
	icon?: Icon
	color?: string
}

const BadgeMax = 99

export const Badge: React.FC<BadgeProps> = (props: BadgeProps) => {
	const count = props.count && props.count > 0 ? props.count : 0
	const { mdIcon: iconType = NotificationsSharp, color: iconColor = "badgeIcon" } = props.icon ?? {}

	const badgeProps = {
		m: "0",
		p: "0",
		bg: props.color ?? "badge",
		w: count === 0 ? "8px" : count < 10 ? "16px" : count <= BadgeMax ? "22px" : "28px",
		h: count === 0 ? "8px" : "16px",
		textAlign: "center" as const,
		verticalAlign: "middle",
		color: "white",
		borderRadius: count < 10 ? "round" : "10px",
		fontFamily: "Open Sans",
		fontSize: "12px",
		fontWeight: "400",
		lineHeight: "badge",
		position: "absolute" as const,
		top: 0,
		right: 0,
		transform: count === 0 ? "" : `scale(1) translate(${count <= 99 ? (count < 10 ? "4px" : "10px") : "16px"}, -4px)`,
	}

	const iconProps = {
		size: "iconMd",
		color: iconColor,
		p: "0px",
		m: "0px",
	}

	return (
		<Box w="iconMd" pos="relative" display="inline-flex">
			<Box as={iconType} {...iconProps} />
			<ChakraBadge {...badgeProps}>{count === 0 ? "" : count > BadgeMax ? `${BadgeMax}+` : count}</ChakraBadge>
		</Box>
	)
}

export default Badge
